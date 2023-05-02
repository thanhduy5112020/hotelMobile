import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import COLORS from '../../conts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../context/AuthContext';
import { CheckBox } from '@rneui/base';
import Reserve from '../components/Reserve';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';

const DetailsScreen = ({ navigation, route }) => {
  const { guests, destination, numberOfDays } = React.useContext(SearchContext);
  console.log("searchData ", guests, destination, numberOfDays)
  //Total, NumOfDate
  const { user } = React.useContext(AuthContext);
  const item = route.params;
  const [visible, setVisible] = React.useState(false);

  const toggleVisibility = () => {
    console.log(visible)
    setVisible(!visible);
  };

  const confirmBooking = () => {
    console.log("Booking")
  }

  const linkRoom = `api/hotels/room/${item?._id}`
  const { data: roomByHotel, loading: roomLoading, error: roomError } = useFetch(linkRoom);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground style={style.headerImage} source={{ uri: item?.photos[0] }}>
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
          <Icon name="bookmark-border" size={28} color={COLORS.white} />
        </View>
      </ImageBackground>
      <View>
        <View style={style.iconContainer}>
          <Icon name="place" color={COLORS.white} size={28} />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item?.name}</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: COLORS.grey,
              marginTop: 5,
            }}>
            {item?.city}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.grey} />
              </View>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 5 }}>
                4.0
              </Text>
            </View>
            <Text style={{ fontSize: 13, color: COLORS.grey }}>365reviews</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ lineHeight: 20, color: COLORS.grey }}>
              {item?.desc}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Price per night
          </Text>
          <View style={style.priceTag}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.grey,
                marginLeft: 5,
              }}>
              ${item?.cheapestPrice}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.grey,
                marginLeft: 5,
              }}>
              +breakfast
            </Text>
          </View>
        </View>


        <TouchableOpacity onPress={toggleVisibility}>
          <View style={style.btn} >
            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
              Book Now
            </Text>
          </View>
        </TouchableOpacity>

        {visible &&
          <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={toggleVisibility}
          >
            <View style={style.modalContainer}>
              <View style={style.modalBox}>
                <TouchableOpacity onPress={toggleVisibility} style={style.closeButton}>
                  <Icon name="close" size={24} color={COLORS.grey} />
                </TouchableOpacity>
                <Text style={style.modalTitle}>Select your rooms:</Text>
                <ScrollView style={style.modalContentContainer}>
                  <View style={style.roomContainer}>
                    {roomByHotel.map(item => (
                      <View key={item._id}>
                        <Reserve item={item} />

                      </View>)
                    )
                    }
                  </View>



                  <TouchableOpacity style={style.confirmButton} onPress={confirmBooking}>
                    <Text style={style.confirmButtonText}>Confirm</Text>
                  </TouchableOpacity>
                </ScrollView>

              </View>
            </View>
          </Modal>
        }


      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  component: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContentContainer: {
    flexGrow: 2,
  },
  roomContainer: {
    marginTop: 10,
  },
  roomItem: {
    marginBottom: 20,
  },
  roomType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomDetails: {
    fontSize: 14,
    marginBottom: 5,
  },
  roomMaxPeople: {
    fontSize: 14,
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    marginRight: 100, // Adjust this value as needed
  },
  checkboxLabel: {
    fontSize: 14,
  },
  confirmButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 20,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },

});

export default DetailsScreen;