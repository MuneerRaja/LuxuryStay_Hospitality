import { useState } from 'react';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import HotelDropdown from './HotelDropdown';
import RoomDropdown from './RoomDropdown';
import GuestInput from './GuestInput';
import { Calendar, Building, DoorOpen, Users, Search } from 'lucide-react';

// ======================
// Main BookForm Component
// ======================
const BookForm = ({ handleCheck, handleReservation }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [guests, setGuests] = useState(1);
  const [maxGuests, setMaxGuests] = useState(10);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkInDate) return alert('Please select a check-in date');
    if (!checkOutDate) return alert('Please select a check-out date');
    if (checkOutDate <= checkInDate)
      return alert('Check-out date must be after check-in date');
    if (!selectedHotel) return alert('Please select a hotel');
    if (selectedRooms.length === 0)
      return alert('Please select at least one room');
    if (guests <= 0) return alert('Please enter at least 1 guest');
    if (guests > maxGuests)
      return alert(`Guests cannot exceed ${maxGuests} based on selected rooms`);

    const bookingData = {
      checkInDate,
      checkOutDate,
      hotel: selectedHotel,
      rooms: selectedRooms,
      guests,
    };

    try {
      // Use handleReservation if provided (for actual booking), otherwise handleCheck (for availability)
      if (handleReservation) {
        const result = await handleReservation(bookingData);
        alert('Reservation submitted successfully!');
      } else if (handleCheck) {
        // For availability check
        await handleCheck(e, bookingData);
      } else {
        alert('No action function provided');
      }
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || error.message || 'An error occurred'));
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden space-y-4">
        {/* Check-in */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-xs font-tertiary uppercase tracking-[2px] text-gray-500">Check In</span>
          </div>
          <CheckIn selectedDate={checkInDate} onDateChange={setCheckInDate} />
        </div>

        {/* Check-out */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-xs font-tertiary uppercase tracking-[2px] text-gray-500">Check Out</span>
          </div>
          <CheckOut
            selectedDate={checkOutDate}
            onDateChange={setCheckOutDate}
            startDate={checkInDate}
          />
        </div>

        {/* Hotel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Building className="w-4 h-4 text-accent" />
            <span className="text-xs font-tertiary uppercase tracking-[2px] text-gray-500">Select Hotel</span>
          </div>
          <HotelDropdown
            value={selectedHotel}
            onChange={(e) => {
              setSelectedHotel(e.target.value);
              setSelectedRooms([]);
              setGuests(1);
            }}
          />
        </div>

        {/* Rooms */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <DoorOpen className="w-4 h-4 text-accent" />
            <span className="text-xs font-tertiary uppercase tracking-[2px] text-gray-500">Select Rooms</span>
          </div>
          <RoomDropdown
            value={selectedRooms}
            onChange={setSelectedRooms}
            hotelId={selectedHotel}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            onMaxGuestsChange={setMaxGuests}
          />
        </div>

        {/* Guests */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-xs font-tertiary uppercase tracking-[2px] text-gray-500">Guests</span>
          </div>
          <GuestInput value={guests} onChange={setGuests} max={maxGuests} />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-lg btn-primary w-full rounded-lg shadow-luxury">
          <Search className="w-4 h-4" />
          Book Now
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-row w-full">
        {/* Check-in */}
        <div className="flex-1 border-r border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="p-4 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-xs font-tertiary uppercase tracking-[2px] text-gray-500">Check In</span>
            </div>
            <CheckIn selectedDate={checkInDate} onDateChange={setCheckInDate} />
          </div>
        </div>

        {/* Check-out */}
        <div className="flex-1 border-r border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="p-4 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-xs font-tertiary uppercase tracking-[2px] text-gray-500">Check Out</span>
            </div>
            <CheckOut
              selectedDate={checkOutDate}
              onDateChange={setCheckOutDate}
              startDate={checkInDate}
            />
          </div>
        </div>

        {/* Hotel */}
        <div className="flex-1 border-r border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="p-4 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 text-accent" />
              <span className="text-xs font-tertiary uppercase tracking-[2px] text-gray-500">Hotel</span>
            </div>
            <HotelDropdown
              value={selectedHotel}
              onChange={(e) => {
                setSelectedHotel(e.target.value);
                setSelectedRooms([]);
                setGuests(1);
              }}
            />
          </div>
        </div>

        {/* Rooms */}
        <div className="flex-1 border-r border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="p-4 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <DoorOpen className="w-4 h-4 text-accent" />
              <span className="text-xs font-tertiary uppercase tracking-[2px] text-gray-500">Rooms</span>
            </div>
            <RoomDropdown
              value={selectedRooms}
              onChange={setSelectedRooms}
              hotelId={selectedHotel}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onMaxGuestsChange={setMaxGuests}
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1 border-r border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="p-4 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-xs font-tertiary uppercase tracking-[2px] text-gray-500">Guests</span>
            </div>
            <GuestInput value={guests} onChange={setGuests} max={maxGuests} />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary min-w-[140px] rounded-none">
          <Search className="w-4 h-4" />
          Book Now
        </button>
      </div>
    </form>
  );
};

export default BookForm;