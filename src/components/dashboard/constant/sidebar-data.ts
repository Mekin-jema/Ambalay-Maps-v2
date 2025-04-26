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
    LucideIcon,
  } from "lucide-react";
  
//    Define interface for user data
  interface User {
    name: string;
    email: string;
    avatar: string;
  }
  
  // Define interface for navigation items
  interface NavItem {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
  }
  
  // Define interface for navigation groups
  interface NavGroup {
    title: string;
    items: NavItem[];
  }
  
  // Define main sidebar data interface
  interface SidebarData {
    user: User;
    navMain: NavGroup[];
  }
  
  export const sidebarData: SidebarData = {
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
          },
          { title: "API Keys", url: "/dashboard/product", icon: KeyRound },
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
  