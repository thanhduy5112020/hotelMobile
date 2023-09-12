import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert
} from 'react-native';

import COLORS from '../../conts/colors';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const HotelScreen = ({ navigation }) => {
  const { data: hotelData, loading: hotelLoading, error: hotelError } = useFetch('api/hotels');
  const { user } = React.useContext(AuthContext);
  console.log(navigation)
  const handleDeleteHotel = (hotelId) => {
    // Implement your delete logic here
    // You can show an alert or confirmation dialog before deleting the hotel
    Alert.alert('Delete Hotel', 'Are you sure you want to delete this hotel?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          // Perform the delete operation
          axios.delete(`http://192.168.43.237:3000/api/hotels/${hotelId}`)
          navigation.navigate("AdminScreen")
          console.log('Deleting hotel with id:', hotelId);
        },
      },
    ]);
  };

  // const iplink = "http://10.3.54.108:3000/";

  const handleEditHotel = (hotelId) => {

    console.log('Editing hotel with id:', hotelId);
  };

  const handleAddHotel = () => {
    // Xử lý sự kiện khi nhấn vào nút "Thêm khách sạn"
    console.log('Add hotel clicked');
    navigation.navigate("AddRoomScreen")
    
  };

  const renderHotelItem = ({ item }) => (
    <View style={styles.hotelItem}>
      <Image source={{ uri: item.photos[0] }} style={styles.hotelImage} />
      <Text style={styles.hotelName}>{item.name}</Text>
      <Text style={styles.hotelRating}>
        Rating: {item.rating.toFixed(1)} ({item.totalReviews} reviews)
      </Text>
      <Text style={styles.hotelTotal}>Total: ${item.total}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDeleteHotel(item._id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonEdit}
          onPress={() => handleEditHotel(item._id)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View style={{ paddingBottom: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.blue }}>
              Duy's Booking
            </Text>
          </View>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            Hotel Page
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddHotel}>
            <Text style={styles.addButtonText}>Add Hotel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <Image source={{ uri: user?.img }} style={styles.userImage} />
          <Text style={styles.username}>Admin</Text>
        </View>
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <FlatList
          data={hotelData}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderHotelItem}
        />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  hotelItem: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    elevation: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
  },
  hotelImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hotelRating: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  hotelTotal: {
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'lightcoral',
    borderRadius: 5,
  },
  buttonEdit: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'limegreen',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'relative',
  },
  userInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'dodgerblue',
    borderRadius: 5,
    marginRight: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default HotelScreen;
