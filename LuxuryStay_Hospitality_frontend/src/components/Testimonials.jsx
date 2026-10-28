import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { usePublicPagesContext } from '../context/PublicPagesContext';

const Testimonials = () => {
  const { testimonials, fetchTestimonials, loading } = usePublicPagesContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) {
      fetchTestimonials();
    }
  }, [fetchTestimonials]);
  
  const testimonialsLoading = loading?.testimonials || false;

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotate testimonials every 7 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 7000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 sm:w-5 sm:h-5 ${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (testimonialsLoading || testimonials.length === 0) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-luxury-cream/30">
        <div className="container mx-auto px-4 text-center">
          <p className="font-tertiary uppercase text-[13px] sm:text-[15px] tracking-[4px] sm:tracking-[6px] text-accent mb-2">
            Testimonials
          </p>
          <h2 className="h2 mb-6">What Our Guests Say</h2>
          <p className="text-gray-500">
            {testimonialsLoading ? 'Loading testimonials...' : 'No testimonials available'}
          </p>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-luxury-cream/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="font-tertiary uppercase text-[13px] sm:text-[15px] tracking-[4px] sm:tracking-[6px] text-accent mb-2">
            Testimonials
          </p>
          <h2 className="h2">What Our Guests Say</h2>
          <div className="divider-gold mt-4" />
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-2xl shadow-luxury p-6 sm:p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute -top-4 left-6 sm:left-8">
              <div className="bg-accent p-3 rounded-full shadow-luxury">
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6 pt-2">
              {renderStars(currentTestimonial.rating || 5)}
            </div>

            {/* Quote */}
            <blockquote className="text-base sm:text-lg md:text-xl italic text-gray-700 text-center mb-8 leading-relaxed">
              "{currentTestimonial.comment || 'This was an amazing experience! Highly recommended.'}"
            </blockquote>

            {/* Author */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="font-primary text-xl sm:text-2xl text-accent">
                  {(currentTestimonial.guest?.username || currentTestimonial.guestName || 'A')[0].toUpperCase()}
                </span>
              </div>
              <p className="font-semibold text-gray-900 text-lg">
                {currentTestimonial.guest?.username || currentTestimonial.guestName || 'Anonymous Guest'}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {currentTestimonial.createdAt 
                  ? new Date(currentTestimonial.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'Verified Guest'}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute -left-2 sm:-left-4 lg:-left-12 top-1/2 -translate-y-1/2 bg-white hover:bg-accent text-primary hover:text-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-luxury transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute -right-2 sm:-right-4 lg:-right-12 top-1/2 -translate-y-1/2 bg-white hover:bg-accent text-primary hover:text-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-luxury transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Indicators */}
          {testimonials.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-8 bg-accent' 
                      : 'w-2 bg-accent/30 hover:bg-accent/50'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;