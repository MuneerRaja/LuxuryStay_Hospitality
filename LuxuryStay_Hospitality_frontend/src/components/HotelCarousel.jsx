import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePublicPagesContext } from '../context/PublicPagesContext';

const HotelCarousel = () => {
  const { hotels, fetchHotelsWithFilters, loading } = usePublicPagesContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchHotelsWithFilters();
  }, [fetchHotelsWithFilters]);
  
  const hotelsLoading = loading?.hotels || false;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === hotels.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? hotels.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotate the carousel every 6 seconds
  useEffect(() => {
    if (hotels.length <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [hotels.length]);

  if (hotelsLoading || hotels.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading hotels...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="font-tertiary uppercase text-[13px] sm:text-[15px] tracking-[4px] sm:tracking-[6px] text-accent mb-2">
            Discover
          </p>
          <h2 className="h2">Featured Hotels</h2>
          <div className="divider-gold mt-4" />
        </div>
        
        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {hotels.map((hotel, index) => (
              <div 
                key={hotel._id} 
                className="w-full flex-shrink-0 px-2 sm:px-4"
              >
                <div className="bg-white rounded-xl shadow-card hover:shadow-luxury-lg transition-all duration-500 overflow-hidden border border-gray-100 group">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/2 relative overflow-hidden">
                      <img 
                        src={hotel.image || 'https://placehold.co/600x400?text=Hotel+Image'} 
                        alt={hotel.name} 
                        className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/600x400?text=Hotel+Image';
                        }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    {/* Content Section */}
                    <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                      <h3 className="font-primary text-2xl sm:text-3xl mb-3 group-hover:text-accent transition-colors duration-300">
                        {hotel.name}
                      </h3>
                      
                      {/* Location */}
                      <div className="flex items-center gap-2 text-gray-500 mb-4">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="text-sm">
                          {hotel.location && typeof hotel.location === 'object' 
                            ? `${hotel.location.address || ''} ${hotel.location.city || ''}`
                            : hotel.location || 'LuxuryStay Property'}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                        {hotel.description || 'Experience luxury and comfort at our exquisite hotel.'}
                      </p>
                      
                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {hotel.amenities?.slice(0, 3).map((amenity, idx) => (
                          <span 
                            key={idx} 
                            className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                          >
                            {amenity}
                          </span>
                        ))}
                        {hotel.amenities?.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs sm:text-sm">
                            +{hotel.amenities.length - 3}
                          </span>
                        )}
                      </div>
                      
                      {/* CTA Button */}
                      <Link 
                        to={`/hotels/${hotel._id}`}
                        className="btn btn-secondary btn-sm w-full sm:w-auto sm:self-start rounded-lg"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          {hotels.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary hover:text-accent rounded-full p-2 sm:p-3 shadow-lg hover:shadow-luxury z-10 transition-all duration-300"
                aria-label="Previous hotel"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary hover:text-accent rounded-full p-2 sm:p-3 shadow-lg hover:shadow-luxury z-10 transition-all duration-300"
                aria-label="Next hotel"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}
          
          {/* Indicators */}
          {hotels.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
              {hotels.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-8 bg-accent' 
                      : 'w-2 bg-accent/30 hover:bg-accent/50'
                  }`}
                  aria-label={`Go to hotel ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotelCarousel;