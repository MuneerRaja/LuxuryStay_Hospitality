import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookForm,
  HeroSlider,
  RoomPackage,
  ScrollToTop,
} from "../../components";
import { useRoomPackageContext } from "../../context";
import { usePublicPagesContext } from "../../context/PublicPagesContext";
import { useAuth } from "../../context/AuthContext";
import HotelCarousel from "../../components/HotelCarousel";
import Testimonials from "../../components/Testimonials";

const HomePage = () => {
  const { roomPackages } = useRoomPackageContext();
  const {
    rooms,
    loading,
    submitReservation,
    fetchAvailableRooms,
    checkInDate,
    checkOutDate,
    selectedHotel,
    selectedRooms,
    guests,
    specialRequests,
    bookingAlert,
    bookingLoading,
    setBookingCheckInDate,
    setBookingCheckOutDate,
    setBookingHotel,
    setBookingRooms,
    setBookingGuests,
    setBookingSpecialRequests,
    updateBookingAlert,
    handleBookingSubmission,
  } = usePublicPagesContext();
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheck = async (e, bookingData) => {
    e.preventDefault();
    try {
      await fetchAvailableRooms(
        bookingData.hotel,
        bookingData.checkInDate,
        bookingData.checkOutDate
      );
    } catch (error) {
      updateBookingAlert({
        type: "error",
        message: "Error checking room availability",
      });
    }
  };

  const handleReservationWithAuth = async (bookingData) => {
    if (!isAuthenticated()) {
      updateBookingAlert({
        type: "error",
        message:
          "You must be logged in to make a reservation. Redirecting to login...",
      });
      navigate("/login");
      return;
    }

    return await submitReservation(bookingData);
  };

  return (
    <div>
      <ScrollToTop />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Booking Form Section */}
      <div className="relative -mt-16 sm:-mt-20 z-30 px-4 sm:px-0">
        <div className="container mx-auto">
          <div className="bg-white/95 backdrop-blur-luxury rounded-xl shadow-luxury-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
            <div className="mb-4 sm:mb-6">
              <h3 className="font-primary text-lg sm:text-xl text-primary mb-1">
                Book Your Stay
              </h3>
              <p className="text-gray-500 text-sm">
                Find the perfect room for your luxury experience
              </p>
            </div>
            <BookForm
              handleCheck={handleCheck}
              handleReservation={handleReservationWithAuth}
            />
          </div>
        </div>
      </div>

      {/* Featured Hotels Carousel */}
      <HotelCarousel />

      {/* Room Packages */}
      <RoomPackage
        roomPackages={roomPackages}
        loading={false}
      />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default HomePage;