import React from 'react';
import BookingConfirmation from '../components/BookingConfirmation';


const BookingConfirmationScreen = ({ navigation, route }) => {
  console.log(route.params.confirm)
  const { dateRange, user, nameHotel,totalMount, selectedRoomDetails} = route.params.confirm;
  console.log("selectedRoomDetails BookingConfirmationScreen", selectedRoomDetails[0])
  // const user = "Yue"
  const hotel = nameHotel;
  const roomType = selectedRoomDetails[0].type;
  const numberOfRooms = selectedRoomDetails[0].number;
  const checkInDate = dateRange[0];
  const checkOutDate = dateRange[dateRange.length - 1];
  const totalPrice = totalMount;

  return (
    <BookingConfirmation
      navigation = {navigation}
      user={user?.username}
      hotel={hotel}
      roomType={roomType}
      numberOfRooms={numberOfRooms}
      checkInDate={checkInDate}
      checkOutDate={checkOutDate}
      totalPrice={totalPrice}
    />
  );
};

export default BookingConfirmationScreen;
