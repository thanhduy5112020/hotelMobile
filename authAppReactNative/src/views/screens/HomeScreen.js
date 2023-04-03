import axios from 'axios';
import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from 'react-native';

import { format, addMonths } from 'date-fns';
import { BottomSheet } from '@rneui/themed';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../conts/colors';
import hotels from '../../conts/hotels';
import useFetch from '../../hooks/useFetch';
// import DatePicker from 'react-native-date-picker';
// import { Calendar } from 'react-native-date-range';
// import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// import CalendarRangePicker from "react-native-calendar-range-picker";
import DatePicker from 'react-native-datepicker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const HomeScreen = ({ navigation }) => {
  const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const { data, loading, error } = useFetch("api/hotels")

  const { data: hotelsCount, loading: hotelsCountLoading, error: hotelsCountError } = useFetch("api/hotels/countByHotel");
  const currentDate = new Date();
  const [openDate, setOpenDate] = React.useState(false);
  const [dates, setDates] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);



  const [options, setOptions] = React.useState({
    adult: 1,
    children: 0,
    room: 1
  });
  const typeMapping = {
    'One Star': 1,
    'Two Star': 2,
    'Three Star': 3,
    'Four Star': 4,
    'Five Star': 5,
  };

  const types = data.map((hotel) => typeMapping[hotel.type]);

  //Booking calendar
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [markedDates, setMarkedDates] = React.useState({});

  const handleDayPress = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
      setMarkedDates({ [day.dateString]: { selected: true, startingDay: true, color: '#3366CC' } });
    } else if (startDate && !endDate && day.dateString > startDate) {
      const range = getRangeOfDates(startDate, day.dateString);
      const markedRange = {};
      range.forEach((date) => {
        if (date != startDate) {
          markedRange[date] = { selected: true, color: '#3366FF' };
        }

      });
      setEndDate(day.dateString);
      setMarkedDates({ ...markedDates, ...markedRange, [day.dateString]: { selected: true, endingDay: true, color: '#3366CC' } });
    } else {
      handleReset();
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setMarkedDates({});
  };

  const getRangeOfDates = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const range = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      range.push(new Date(date).toISOString().slice(0, 10));
    }
    return range;
  };

  const CategoryList = ({ navigation }) => {
    return (
      <View style={style.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              <Text style={{ ...style.categoryListText, color: selectedCategoryIndex == index ? COLORS.blue : COLORS.grey, }}>
                {item}
              </Text>
              {selectedCategoryIndex == index && (
                <View style={{ height: 3, width: 30, backgroundColor: COLORS.blue, marginTop: 2, }} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const Card = ({ hotel, index, data }) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });


    let start_num = types[index]
    let start_arr = []
    for (let i = 0; i < 5; i++) {
      if (i < start_num) {
        start_arr.push('orange')
      } else {
        start_arr.push('grey')
      }
    }
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate('DetailsScreen', hotel)
        }
      >
        <Animated.View style={{ ...style.card, transform: [{ scale }] }}>
          <Animated.View style={{ ...style.cardOverLay, opacity }} />
          <View style={style.priceTag}>
            <Text
              style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>
              ${hotel.cheapestPrice}
            </Text>
          </View>
          <Image source={{ uri: hotel.photos[0] }} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                  {hotel.name}
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                  {hotel.city}
                </Text>
              </View>
              <Icon name="bookmark-border" size={26} color={COLORS.blue} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{ flexDirection: 'row' }}>
                {
                  start_arr.map((star, index) => (
                    star === "orange" ? <Icon name="star" size={15} color={COLORS.orange} /> : <Icon name="star" size={15} color={COLORS.grey} />
                  ))
                }
              </View>
              <Text style={{ fontSize: 10, color: COLORS.grey }}>365reviews</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const TopHotelCard = ({ hotel, index }) => {
    return (
      <View style={style.topHotelCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <Icon name="star" size={15} color={COLORS.orange} />
          <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 15 }}>
            {types[index]} star
            {/* 5.0 */}
          </Text>
        </View>
        <Image style={style.topHotelCardImage} source={{ uri: hotel.photos[0] }} />
        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{hotel.name}</Text>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: COLORS.grey }}>
            {hotel.location}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View style={{ paddingBottom: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.blue }}>
              Duy's Booking
            </Text>
          </View>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            Find your hotel
          </Text>
        </View>
        <Icon name="person-outline" size={38} color={COLORS.grey} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.searchInputContainer}>
          <Icon name="search" size={30} style={{ marginLeft: 20 }} />
          <TextInput
            placeholder="Where are you going?"
            style={{ fontSize: 20, paddingLeft: 10 }}
          />
        </View>
        <TouchableOpacity onPress={() => setOpenDate(!openDate)}>
          <View style={style.headerSearch}>
            <View style={style.headerSearchItem}>
              <Icon name="today" size={30} style={{ marginLeft: 20 }} />

              {startDate && endDate ? (
                <Text style={{ fontSize: 20, paddingLeft: 10 }}>
                  {`${format(new Date(startDate), "dd/MM/yyyy")} to ${format(new Date(endDate), "dd/MM/yyyy")}`}
                </Text>
              ) : (
                <Text style={{ fontSize: 20, paddingLeft: 10 }}>
                  {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>

        {openDate && (
          <View style={{ flex: 1 }}>
            <Calendar markingType={'period'} markedDates={markedDates} onDayPress={handleDayPress} minDate={new Date()} />
            {startDate && endDate && (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ marginTop: 20, fontSize: 18 }}>
                  Selected dates: {startDate} - {endDate}
                </Text>
                <TouchableOpacity onPress={handleReset} style={{ marginTop: 20 }}>
                  <Text style={{ color: 'blue', fontSize: 16 }}>Reset</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity onPress={() => console.log('Pressed!')}>
          <View style={style.headerSearch}>
            <View style={style.headerSearchItem}>
              <Icon name="people" size={30} style={{ marginLeft: 20 }} />
              <Text style={{ fontSize: 20, paddingLeft: 10 }}>{`${options.adult} adult - ${options.children} children - ${options.room} room`}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <CategoryList />
        <View>
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true },
            )}
            horizontal
            data={data}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => <Card hotel={item} index={index} />}
            snapToInterval={cardWidth}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{ fontWeight: 'bold', color: COLORS.grey }}>
            Top hotels
          </Text>
          <Text style={{ color: COLORS.grey }}>Show all</Text>
        </View>
        <FlatList data={data} horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({ item, index }) => <TopHotelCard hotel={item} index={index} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'relative',
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.blue,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topHotelCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  headerSearchItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  headerSearch: {
    height: 50,
    backgroundColor: COLORS.light,
    // borderWidth: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,

  },
  date: {
    position: 'absolute',
    top: 50,
    zIndex: 2
  }

});

export default HomeScreen;