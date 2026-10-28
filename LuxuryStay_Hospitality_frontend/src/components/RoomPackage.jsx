import { SpinnerDotted } from 'spinners-react';
import RoomPackageItem from './RoomPackageItem';

const RoomPackage = ({ roomPackages, loading }) => {
  return (
    <section className='py-16 sm:py-20 lg:py-24 relative overflow-hidden'>
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-x-1/2" />
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className='h-screen w-full fixed bottom-0 top-0 bg-black/80 z-50 grid place-items-center'>
          <div className="text-center">
            <SpinnerDotted color="#a37d4c" />
            <p className="text-white mt-4 text-sm">Loading packages...</p>
          </div>
        </div>
      )}

      <div className='container mx-auto px-4 relative z-10'>
        {/* Section Header */}
        <div className='text-center mb-10 sm:mb-12 lg:mb-16'>
          <p className='font-tertiary uppercase text-[13px] sm:text-[15px] tracking-[4px] sm:tracking-[6px] text-accent mb-2'>
            LuxuryStay Hospitality
          </p>
          <h2 className='h2'>Room Package & Suites</h2>
          <div className="divider-gold mt-4" />
        </div>

        {/* Room Packages Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10'>
          {roomPackages.map(roomPackage => (
            <RoomPackageItem key={roomPackage.id} roomPackage={roomPackage} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomPackage;