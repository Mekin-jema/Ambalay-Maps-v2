import { create } from 'zustand';
import { SignUpFormValues } from '@/lib/schema/signupSchema';
import api from '@/lib/axios';
import { toast } from 'sonner'; // ✅ using sonner

type User = {
  id: string;
  email: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
};



type AuthStore = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (data:{
    email:string,
    password:string
  }) => Promise<void>;
  signup: (data: SignUpFormValues) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/login',{
        email:data.email,
        password:data.password
      });
      const { token, user } = res.data;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ user, token, loading: false });
      toast.success('Logged in successfully');
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Login failed',
        loading: false,
      });
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    }
  },

  signup: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/signup', {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      const { user, token } = res.data;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ user, token, loading: false });
      toast.success('Account created successfully');
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Signup failed',
        loading: false,
      });
      toast.error(err.response?.data?.message || 'Signup failed');
      throw err;
    }
  },
   verifyEmail: async (verificationCode: string) => {
  set({ loading: true, error: null });
  try {
    const res = await api.post('/verify-email', { verificationCode });

    const { success, message, user, token } = res.data;

    if (success) {
      toast.success(message || 'Email verified successfully');
      // Optionally store token if backend returns it
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        set({ user, token });
      } else {
        set({ user });
      }
    } else {
      toast.error(message || 'Email verification failed');
    }
  } catch (err: any) {
    const errorMsg = err.response?.data?.message || 'Verification failed';
    set({ error: errorMsg });
    toast.error(errorMsg);
    throw err;
  } finally {
    set({ loading: false });
  }
},
  forgotPassword: async (email:string) => {
    set({ loading: true, error: null });
    try {
      await api.post('/forgot-password', { email });
      set({ loading: false });
      toast.success('Password reset email sent');
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to send email',
        loading: false,
      });
      toast.error(err.response?.data?.message || 'Failed to send email');
      throw err;
    }
  },

  resetPassword: async (token, password) => {
    set({ loading: true, error: null });
    try {
      await api.post('/reset-password', { token, password });
      set({ loading: false });
      toast.success('Password reset successfully');
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Reset failed',
        loading: false,
      });
      toast.error(err.response?.data?.message || 'Reset failed');
      throw err;
    }
  },

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/me');
      set({ user: res.data, loading: false });
    } catch (err) {
      set({ loading: false });
      // optional: toast.error('Failed to fetch user');
    }
  },

  logout: () => {
    delete api.defaults.headers.common['Authorization'];
    set({ user: null, token: null });
    toast.success('Logged out');
  },
}));
