import { Maximize, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoomPackageItem = ({ roomPackage }) => {
  const { id, name, image, size, maxPerson, description, price } = roomPackage ?? {};

  return (
    <div className='group bg-white shadow-card hover:shadow-luxury-lg transition-all duration-500 min-h-[480px] sm:min-h-[520px] flex flex-col overflow-hidden rounded-lg'>
      {/* Image Container */}
      <div className='relative overflow-hidden h-56 sm:h-64'>
        <img 
          src={image} 
          alt={name} 
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' 
        />
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
        
        {/* Price Badge */}
        {price && (
          <div className='absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg'>
            <span className='text-accent font-primary text-lg'>${price}</span>
            <span className='text-gray-500 text-xs block text-center'>/night</span>
          </div>
        )}
      </div>

      {/* Info Bar */}
      <div className='bg-white shadow-md mx-4 sm:mx-6 -mt-8 relative z-10 h-14 sm:h-16 flex items-center justify-center rounded-lg border border-gray-100'>
        <div className='flex justify-between w-[85%] sm:w-[80%]'>
          {/* Size */}
          <div className='flex items-center gap-2'>
            <div className='text-accent'>
              <Maximize className='w-4 h-4' />
            </div>
            <div className='flex items-center gap-1 text-xs sm:text-sm text-gray-600'>
              <span>Size</span>
              <span className='font-medium text-primary'>{size}m²</span>
            </div>
          </div>

          {/* Divider */}
          <div className='w-px h-6 bg-gray-200' />

          {/* Max People */}
          <div className='flex items-center gap-2'>
            <div className='text-accent'>
              <Users className='w-4 h-4' />
            </div>
            <div className='flex items-center gap-1 text-xs sm:text-sm text-gray-600'>
              <span>Max</span>
              <span className='font-medium text-primary'>{maxPerson}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 flex flex-col p-4 sm:p-6 text-center'>
        {/* Name */}
        <Link to={`/roompackage/${id}`} className='block'>
          <h3 className="font-primary text-xl sm:text-2xl mb-2 group-hover:text-accent transition-colors duration-300">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className='text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3'>
          {description?.slice(0, 100)}...
        </p>

        {/* Button */}
        <Link
          to={`/roompackage/${id}`}
          className="btn btn-secondary btn-sm w-full sm:w-auto sm:min-w-[200px] mx-auto rounded-lg"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default RoomPackageItem;