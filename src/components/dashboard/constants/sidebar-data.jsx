import {
  LayoutGrid,
  MapPinned,
  KeyRound,
  Sliders,
  CreditCard,
  Gift,
  Map,
  Route,
  Navigation,
  MoveHorizontal,
  Users,
  BookOpen,
  MapPinnedIcon,
} from "lucide-react";


export const sidebarData = {
  user: {
    name: "Mekin Jemal",
    email: "mekinjemal999@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutGrid,
          // isActive: true,
        },
        { title: "API Keys", url: "/dashboard/api-keys", icon: KeyRound },
        { title: "Analytics & Logs", url: "/dashboard/analytics-logs", icon: Sliders },
        { title: "Billing & Subscription", url: "/dashboard/billing-subscription", icon: CreditCard },
        { title: "Map", url: "/dashboard/map", icon: MapPinnedIcon },
        { title: "Geocoding", url: "/dashboard/geocoding", icon: Map },
        // { title: "Route Optimization", url: "/dashboard/route-optimization", icon: Route },
        // { title: "Directions API", url: "/dashboard/directions-api", icon: Navigation },
        // { title: "Matrix API", url: "/dashboard/matrix-api", icon: MoveHorizontal },
        { title: "Team Management", url: "/dashboard/users", icon: Users },
        { title: "Support & Docs", url: "/dashboard/support-docs", icon: BookOpen },

      ],
    },
  ],
};
