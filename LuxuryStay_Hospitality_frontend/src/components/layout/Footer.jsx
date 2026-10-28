import { Link } from "react-router-dom";
import { Building } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-4 sm:py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Building className="w-4 h-4 text-accent" />
            </div>
            <div className="font-primary text-primary">
              <span className="block text-sm sm:text-base tracking-wider">LuxuryStay</span>
            </div>
          </Link>

          {/* Copyright */}
          <p className="text-gray-500 text-xs sm:text-sm text-center">
            © {currentYear} LuxuryStay Hospitality. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/FAQ"
              className="text-gray-500 hover:text-accent text-xs sm:text-sm transition-colors"
            >
              FAQ
            </Link>
            <Link
              to="/privacy-policy"
              className="text-gray-500 hover:text-accent text-xs sm:text-sm transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/contact-us"
              className="text-gray-500 hover:text-accent text-xs sm:text-sm transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;