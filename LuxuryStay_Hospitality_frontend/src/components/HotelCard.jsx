import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const HotelCard = ({ hotel }) => (
  <div className="group bg-white rounded-xl shadow-card hover:shadow-luxury-lg transition-all duration-500 overflow-hidden border border-gray-100">
    {/* Image Container */}
    <div className="relative h-48 sm:h-56 overflow-hidden">
      <img
        src={hotel.image || "/src/assets/img/room.jpg"}
        alt={hotel.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Featured Badge */}
      {hotel.featured && (
        <div className="absolute top-4 left-4">
          <span className="bg-accent text-white text-xs font-tertiary uppercase tracking-[1px] px-3 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-5 sm:p-6">
      {/* Title */}
      <h3 className="font-primary text-xl sm:text-2xl mb-2 group-hover:text-accent transition-colors duration-300">
        {hotel.name}
      </h3>

      {/* Location */}
      {hotel.location && (
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="line-clamp-1">
            {typeof hotel.location === 'object' 
              ? `${hotel.location.city || ''}${hotel.location.state ? `, ${hotel.location.state}` : ''}`
              : hotel.location}
          </span>
        </div>
      )}

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
        {hotel.description}
      </p>

      {/* Amenities */}
      <div className="flex flex-wrap gap-2 mb-5">
        {hotel.amenities?.slice(0, 3).map((amenity, idx) => (
          <span
            key={idx}
            className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium"
          >
            {amenity}
          </span>
        ))}
        {hotel.amenities?.length > 3 && (
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
            +{hotel.amenities.length - 3} more
          </span>
        )}
      </div>

      {/* Action Button */}
      <Link
        to={`/hotels/${hotel._id}`}
        className="inline-flex items-center gap-2 text-accent font-tertiary uppercase tracking-[2px] text-sm group/btn hover:text-accent-dark transition-colors"
      >
        View Details
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </Link>
    </div>
  </div>
);

export default HotelCard;