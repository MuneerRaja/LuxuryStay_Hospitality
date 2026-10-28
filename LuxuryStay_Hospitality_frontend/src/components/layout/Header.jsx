import { Link, useNavigate } from 'react-router-dom';
import { DoorOpen, LogOut, Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onToggleSidebar, logout }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { username, role } = user || {};

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 w-full shadow-sm">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={onToggleSidebar}
              className="p-2 text-gray-500 hover:text-accent hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Public Site Link */}
            <Link
              to="/"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-accent font-secondary text-sm transition-colors rounded-lg hover:bg-gray-50"
            >
              <DoorOpen className="w-4 h-4" />
              <span className="hidden lg:inline">Public Site</span>
            </Link>

            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-accent hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-primary truncate max-w-[120px]">
                  {username || 'User'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {role || 'Guest'}
                </p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-white font-primary text-sm sm:text-base">
                  {(username || "U")[0].toUpperCase()}
                </span>
              </div>
              
              {/* Mobile Logout */}
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="sm:hidden p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Logout */}
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 font-secondary text-sm transition-colors rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;