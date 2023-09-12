import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import COLORS from '../../conts/colors';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import usePost from '../../hooks/usePost';

const BookingConfirmation = ({ navigation, user, hotel, roomType, numberOfRooms, checkInDate, checkOutDate, totalPrice, dataHotel }) => {
  const [rating, setRating] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState('');
  const handleRatingChange = (value) => {
    setRating(value);
  };
  const { data: cleanerData, loading: cleanerLoading, error: cleanerError } = useFetch('api/cleaners/getCleanerByHotelName');
  const { loading: loadingUser, error, postData } = usePost();
  console.log("cleanerData ", cleanerData)
  const handleSubmitRating = (value) => {

    if (rating >= 0 && rating <= 10) {
      const updatedTotalReviews = dataHotel.totalReviews + 1;
      const updatedTotal = dataHotel.total + totalPrice;
      const updatedRating = ((parseFloat(dataHotel.rating) * parseFloat(dataHotel.totalReviews) + parseFloat(rating)) / parseFloat(updatedTotalReviews)).toFixed(1);
      // Tạo đối tượng dữ liệu để gửi đi
      const updatedData = {
        totalReviews: updatedTotalReviews,
        total: updatedTotal,
        rating: updatedRating,
      };

      const jobData = {
        nameCleaner: cleanerData?.name,
        roomNumber: numberOfRooms,
        nameHotel: hotel,
        scheduledTime: checkOutDate
      }
      console.log("jobData ", jobData)
      const totalWorkUpdate = cleanerData?.totalwork + 1
      console.log("totalWorkUpdate ", totalWorkUpdate)
      // console.log("dataHotel ", typeof dataHotel._id )
      const hotelid = dataHotel._id
      const cleanerid = cleanerData?._id
      try {
        console.log("dataHotel 2", hotelid )
        
        const res = axios.put(`http://192.168.43.237:3000/api/hotels/${hotelid}`, updatedData)
        postData('api/job/', jobData);
        // const res1 = axios.put(`http://192.168.43.237:3000/api/cleaners/${cleanerid}`, totalWorkUpdate)
        // const res1 = axios.put(`http://192.168.43.237:3000/api/cleaners/6454de7fcac5091025cff522`, totalWorkUpdate)
        // console.log("cleanerData?._id ", cleanerData?._id)
        Alert.alert('My love !', 'Thank you for choosing our hotel!');
        navigation.navigate('HomeScreen');
      } catch (err) {
        Alert.alert('My love !', err);
      }
    } else {
      Alert.alert('My love !', 'Rating from 0 to 10 !!!');
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Booking Confirmation</Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.boldLabel}>User:</Text>
        <Text style={styles.label}> {user}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.boldLabel}>Hotel:</Text>
        <Text style={styles.label}> {hotel}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.boldLabel}>Room Type:</Text>
        <Text style={styles.label}> {roomType}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.boldLabel}>Room Number:</Text>
        <Text style={styles.label}> {numberOfRooms}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.boldLabel}>Check-In Date:</Text>
        <Text style={styles.label}> {checkInDate}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.boldLabel}>Check-Out Date:</Text>
        <Text style={styles.label}> {checkOutDate}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.boldLabel}>Total Price:</Text>
        <Text style={styles.label}> {totalPrice} $</Text>
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.boldLabel}>Payment Method:</Text>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'direct' && styles.selectedPaymentOption]}
          onPress={() => handlePaymentMethodChange('direct')}
        >
          <Text style={styles.paymentOptionText}>Direct Payment Method</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'creditCard' && styles.selectedPaymentOption]}
          onPress={() => handlePaymentMethodChange('creditCard')}
        >
          <Text style={styles.paymentOptionText}>Credit/Debit Card Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'paypal' && styles.selectedPaymentOption]}
          onPress={() => handlePaymentMethodChange('paypal')}
        >
          <Text style={styles.paymentOptionText}>PayPal</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.boldLabel}>Rating:</Text>
        <TextInput
          style={styles.ratingInput}
          value={rating.toString()}
          onChangeText={handleRatingChange}
          keyboardType="numeric"
          maxLength={2}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitRating}>
          <Text style={styles.submitButtonText}>Submit Rating</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.thankYou}>Thank you for choosing our hotel!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  boldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingLeft: 30
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginRight: 30,
  },

  thankYou: {
    fontSize: 18,
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  ratingContainer: {
    marginTop: 20,
  },
  ratingInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentOptionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  selectedPaymentOption: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
});

export default BookingConfirmation;
