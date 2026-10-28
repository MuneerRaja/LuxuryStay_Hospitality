import React, { useState } from "react";
import { Alert } from "../../components";
import { usePublicPagesContext } from "../../context/PublicPagesContext";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, User, AtSign } from "lucide-react";

const ContactUsPage = () => {
  const { submitContactForm, loading } = usePublicPagesContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitContactForm(formData);
      setAlert({
        type: "success",
        message:
          response.message ||
          "Thank you for contacting us! We will get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setAlert({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to send message. Please try again.",
      });
    }
  };

  const closeAlert = () => setAlert(null);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Luxury Street", "City Center, New York, NY 10001"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (234) 567-8900", "+1 (234) 567-8901"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@luxurystay.com", "support@luxurystay.com"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"],
    },
  ];

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
            Get In Touch
          </p>
          <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl text-white tracking-wide">
            Contact Us
          </h1>
          <div className="w-16 sm:w-20 h-0.5 bg-accent mx-auto mt-4" />
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-luxury-cream/30 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12 lg:mb-16">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-card hover:shadow-luxury transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors duration-300">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-primary text-lg mb-2">{item.title}</h3>
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-500 text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-luxury overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Left Side - Info */}
                <div className="bg-primary p-6 sm:p-8 lg:p-10 lg:w-2/5 text-white">
                  <div className="h-full flex flex-col">
                    <div className="mb-6 sm:mb-8">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                      </div>
                      <h2 className="font-primary text-2xl sm:text-3xl mb-3">
                        Let's Talk
                      </h2>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                        Have questions about our hotels or services? We'd love to hear from you. 
                        Send us a message and we'll respond as soon as possible.
                      </p>
                    </div>

                    {/* Decorative */}
                    <div className="mt-auto hidden lg:block">
                      <div className="w-20 h-0.5 bg-accent mb-4" />
                      <p className="text-gray-500 text-sm">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-6 sm:p-8 lg:p-10 lg:w-3/5">
                  {alert && (
                    <Alert
                      type={alert.type}
                      message={alert.message}
                      onClose={closeAlert}
                      autoClose={alert.type === "success"}
                    />
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="label-luxury" htmlFor="name">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="input-premium pl-12"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label-luxury" htmlFor="email">
                          Email Address
                        </label>
                        <div className="relative">
                          <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input-premium pl-12"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone & Subject Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="label-luxury" htmlFor="phone">
                          Phone (Optional)
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input-premium pl-12"
                            placeholder="+1 234 567 8900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label-luxury" htmlFor="subject">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="input-premium"
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="label-luxury" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="input-premium resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary w-full sm:w-auto rounded-lg"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;