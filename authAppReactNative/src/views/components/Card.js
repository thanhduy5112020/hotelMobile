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
    },
    btn: {
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      backgroundColor: COLORS.blue,
      marginHorizontal: 20,
      borderRadius: 10,
    },
    userInfo: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    username: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
  
  });