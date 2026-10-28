import { useAuth } from "../context";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, LogIn } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [header, setHeader] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    { name: "Contact", path: "/contact-us" },
  ];

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed z-50 w-full transition-all duration-500 ${
          header
            ? "bg-white/95 backdrop-blur-luxury py-3 sm:py-4 shadow-luxury"
            : "bg-transparent py-4 sm:py-6 lg:py-8"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div
              className={`font-primary transition-colors duration-300 ${
                header ? "text-primary" : "text-white"
              }`}
            >
              <span className="block text-lg sm:text-xl lg:text-2xl tracking-[0.2em] font-medium">
                LuxuryStay
              </span>
              <span className="block text-xs sm:text-sm lg:text-base tracking-[0.15em] mt-[-2px] opacity-80">
                Hospitality
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`hidden lg:flex items-center gap-6 xl:gap-8 ${
              header ? "text-primary" : "text-white"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                to={link.path}
                className={`nav-link relative group ${
                  isActive(link.path)
                    ? "text-accent"
                    : header
                    ? "text-primary hover:text-accent"
                    : "text-white hover:text-accent"
                }`}
                key={link.name}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}

            {/* Auth Links - Desktop */}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-current/20">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`nav-link flex items-center gap-2 ${
                      header
                        ? "text-primary hover:text-accent"
                        : "text-white hover:text-accent"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`btn btn-sm btn-primary px-4 sm:px-6`}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-sm btn-primary px-6 sm:px-8"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              header
                ? "text-primary hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay lg:hidden ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`mobile-menu lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="font-primary text-primary">
              <span className="block text-lg tracking-[0.2em]">LuxuryStay</span>
              <span className="block text-xs tracking-[0.15em] opacity-70">
                Hospitality
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            {/* Navigation Links */}
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  to={link.path}
                  className={`block py-3 px-4 rounded-lg font-tertiary tracking-[2px] uppercase text-sm transition-colors ${
                    isActive(link.path)
                      ? "bg-accent/10 text-accent"
                      : "text-primary hover:bg-gray-50"
                  }`}
                  key={link.name}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100" />

            {/* Auth Section */}
            {user ? (
              <div className="space-y-1">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-primary hover:bg-gray-50 transition-colors"
                >
                  <User className="w-5 h-5 text-accent" />
                  <span className="font-tertiary tracking-[2px] uppercase text-sm">
                    Dashboard
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 py-3 px-4 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-tertiary tracking-[2px] uppercase text-sm">
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="btn btn-primary btn-lg w-full rounded-lg"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-outline btn-lg w-full rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} LuxuryStay Hospitality
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;