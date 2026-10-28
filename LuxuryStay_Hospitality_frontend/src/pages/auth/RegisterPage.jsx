// RegisterPage.jsx
import React, { useState } from "react";
import { useAuth } from "../../context";
import { Alert } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";

const RegisterPage = () => {
  const { register, loading, error, setError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await register({ 
      username: formData.username, 
      email: formData.email, 
      password: formData.password 
    });

    if (result.success) {
      setFormData({
        username: "",
        email: "",
        password: ""
      });
      navigate('/');
    }
  };

  const closeAlert = () => setError(null);

  return (
    <section>
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] flex justify-center items-center bg-cover bg-center overflow-hidden">
        <div className="absolute inset-0 bg-room opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4">
          <p className="font-tertiary uppercase text-[13px] sm:text-[15px] tracking-[4px] sm:tracking-[6px] text-accent mb-2">
            Get Started
          </p>
          <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl text-white tracking-wide">
            Register
          </h1>
          <div className="w-16 sm:w-20 h-0.5 bg-accent mx-auto mt-4" />
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-luxury-cream/30 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              {error && (
                <Alert
                  type="error"
                  message={error}
                  onClose={closeAlert}
                />
              )}
              
              <div className="form-container">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-7 h-7 text-accent" />
                  </div>
                  <h2 className="font-primary text-2xl sm:text-3xl text-primary mb-2">
                    Create Account
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Join us for exclusive deals and offers
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Username Field */}
                  <div>
                    <label className="label-luxury" htmlFor="username">
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="input-premium pl-12"
                        placeholder="Choose a username"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="label-luxury" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-premium pl-12"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="label-luxury" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="input-premium pl-12"
                        placeholder="Create a password"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-full rounded-lg"
                  >
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or</span>
                  </div>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-accent hover:text-accent-dark font-medium transition-colors"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;