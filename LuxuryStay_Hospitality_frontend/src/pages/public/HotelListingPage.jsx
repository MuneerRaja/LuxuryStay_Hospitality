import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollToTop, HotelCard } from "../../components";
import { usePublicPagesContext } from "../../context/PublicPagesContext";
import { Search, MapPin, Filter } from "lucide-react";

const HotelListingPage = () => {
  const [localHotels, setLocalHotels] = useState([]);
  const { hotels, fetchHotelsWithFilters, loading } = usePublicPagesContext();

  useEffect(() => {
    fetchHotelsWithFilters();
  }, []);

  const hotelsToDisplay = hotels.length > 0 ? hotels : localHotels;
  const hotelsLoading = loading?.hotels || false;

  return (
    <section>
      <ScrollToTop />

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
            Discover
          </p>
          <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl text-white tracking-wide">
            Our Hotels
          </h1>
          <div className="w-16 sm:w-20 h-0.5 bg-accent mx-auto mt-4" />
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-luxury-cream/30 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="h2 mb-4">Discover LuxuryStay Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our collection of premium hotels worldwide, each offering
              exceptional service and luxurious accommodations tailored to your needs.
            </p>
            <div className="divider-gold mt-6" />
          </div>

          {/* Search/Filter Bar */}
          <div className="bg-white rounded-xl shadow-card p-4 sm:p-6 mb-8 sm:mb-10 border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hotels..."
                  className="input-premium pl-12"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select className="input-premium pl-12 appearance-none">
                  <option value="">All Locations</option>
                  <option value="new-york">New York</option>
                  <option value="los-angeles">Los Angeles</option>
                  <option value="miami">Miami</option>
                </select>
              </div>
              <button className="btn btn-primary btn-lg rounded-lg sm:w-auto">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Hotels Grid */}
          {hotelsLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Loading hotels...</p>
              </div>
            </div>
          ) : hotelsToDisplay.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="font-primary text-xl text-primary mb-2">No hotels found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
              <button className="btn btn-primary btn-sm rounded-lg">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
              {hotelsToDisplay.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-xl p-6 sm:p-8 border border-accent/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="font-primary text-xl sm:text-2xl text-primary mb-2">
                  Ready to book your stay?
                </h3>
                <p className="text-gray-600 max-w-lg">
                  Find the perfect hotel for your stay and reserve your room today
                  with our easy booking process.
                </p>
              </div>
              <Link
                to="/book"
                className="btn btn-lg btn-primary rounded-lg shadow-luxury flex-shrink-0"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelListingPage;