import {
  Home,
  Layers,
  Users,
  CheckSquare,
  MessageCircle,
} from "lucide-react";

export const navItems = [
  { id: "home", icon: Home, path: "/dashboard" },
  { id: "courses", icon: Layers, path: "/courses" },
  { id: "community", icon: Users, path: "/dashboard" },
  { id: "tasks", icon: CheckSquare, path: "/file" },
  { id: "chat", icon: MessageCircle, path: "/message", badge: 3 },
];