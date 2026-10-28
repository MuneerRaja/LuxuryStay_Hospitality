import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  TrendingUp,
  DoorOpen,
  LogOut,
  Users,
  Building,
  Home,
  Calendar,
  FileText,
  Star,
  Bell,
  CreditCard,
  UserPlus,
  UserCheck,
  Clock,
  Wrench,
  Mail,
  User,
  X,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { role, username } = user || {};

  const roleLinks = {
    admin: [
      { path: "/dashboard", label: "Dashboard", icon: TrendingUp },
      { path: "/admin/users", label: "User Management", icon: Users },
      { path: "/admin/hotels", label: "Hotel Management", icon: Building },
      { path: "/admin/rooms", label: "Rooms Management", icon: Home },
      { path: "/admin/contact", label: "Contact Messages", icon: Mail },
    ],
    manager: [
      { path: "/dashboard", label: "Dashboard", icon: TrendingUp },
      {
        path: "/manager/feedback-management",
        label: "Feedback Management",
        icon: Star,
      },
    ],
    receptionist: [
      { path: "/dashboard", label: "Dashboard", icon: TrendingUp },
      {
        path: "/receptionist/create-guest",
        label: "Create Guest Account",
        icon: UserPlus,
      },
      {
        path: "/receptionist/walk-in",
        label: "Walk-in Booking",
        icon: UserCheck,
      },
      {
        path: "/receptionist/room-availability",
        label: "Room Availability",
        icon: Home,
      },
    ],
    housekeeping: [
      { path: "/dashboard", label: "Dashboard", icon: TrendingUp },
      { path: "/housekeeping/tasks", label: "My Tasks", icon: Clock },
    ],
    maintenance: [
      { path: "/dashboard", label: "Dashboard", icon: TrendingUp },
      { path: "/maintenance/issues", label: "My Issues", icon: Wrench },
    ],
    guest: [
      { path: "/dashboard", label: "Dashboard", icon: TrendingUp },
      { path: "/guest/my-bookings", label: "My Bookings", icon: Calendar },
      {
        path: "/guest/booking-history",
        label: "Booking History",
        icon: FileText,
      },
      {
        path: "/guest/service-requests",
        label: "Service Requests",
        icon: Bell,
      },
      {
        path: "/guest/room-service",
        label: "In-Room Services",
        icon: CreditCard,
      },
      { path: "/guest/feedback", label: "Feedback", icon: Star },
    ],
  };

  const links = role && roleLinks[role] ? roleLinks[role] : [];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white shadow-luxury-lg transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-72 sm:w-80" : "w-0 lg:w-72 overflow-hidden lg:overflow-visible"
        }`}
      >
        <div className="h-full flex flex-col w-72 sm:w-80 lg:w-72">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Building className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="font-primary text-base sm:text-lg text-primary leading-tight">
                  LuxuryStay
                </h2>
                <span className="text-xs text-gray-500">Dashboard</span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent flex items-center justify-center">
                <span className="text-white font-primary text-lg">
                  {(username || "U")[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-primary truncate">
                  {username || "User"}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {role || "Guest"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-lg transition-all duration-200 group ${
                      isActive(link.path)
                        ? "bg-accent text-white shadow-luxury"
                        : "text-gray-600 hover:bg-accent/10 hover:text-accent"
                    }`}
                  >
                    <link.icon className={`w-5 h-5 flex-shrink-0 ${
                      isActive(link.path) ? "text-white" : "text-accent"
                    }`} />
                    <span className="font-secondary text-sm">{link.label}</span>
                    {isActive(link.path) && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-4 border-t border-gray-100" />

            {/* Common Links */}
            <ul className="space-y-1">
              <li>
                <Link
                  to="/account"
                  className={`flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-lg transition-all duration-200 ${
                    isActive("/account")
                      ? "bg-accent text-white shadow-luxury"
                      : "text-gray-600 hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  <User className={`w-5 h-5 flex-shrink-0 ${
                    isActive("/account") ? "text-white" : "text-accent"
                  }`} />
                  <span className="font-secondary text-sm">My Account</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0 text-red-400" />
                  <span className="font-secondary text-sm">Logout</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs text-gray-400 text-center">
              © {new Date().getFullYear()} LuxuryStay
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;