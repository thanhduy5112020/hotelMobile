import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SearchItem = ({ item, navigation}) => {
  return (
    <View style={styles.searchItem}>
      <Image source={{ uri: item?.photos[0] }} style={styles.siImg} />
      <View style={styles.siDesc}>
        <Text style={styles.siTitle}>{item?.name}</Text>
        <Text style={styles.siDistance}>{item?.distance} m from centre {item?.city}</Text>
        <Text style={styles.siTaxiOp}>{item?.type}</Text>
        <Text style={styles.siSubtitle}>
          Studio Apartment with Air conditioning
        </Text>
        <View style={styles.siCancelOp}>
          <Text style={styles.siCancelOpText}>Free cancellation</Text>
        </View>
        <Text style={styles.siCancelOpSubtitle}>
          You can cancel later, so lock in this great price today!
        </Text>
      </View>
      <View style={styles.siDetails}>
        {item?.rating && (
          <View style={styles.siRating}>
            <Text>Excellent</Text>
            <TouchableOpacity style={styles.siRatingButton}>
              <Text style={styles.siRatingButtonText}>{item?.rating}</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.siDetailTexts}>
          <Text style={styles.siPrice}>${item?.cheapestPrice}</Text>
          <Text style={styles.siTaxOp}>Includes taxes and fees</Text>
          <TouchableOpacity
            style={styles.siCheckButton}
            onPress={() => {
              console.log("HELLO WORLD");
              navigation.navigate('DetailsScreen', item);
            }}
          >
            <Text style={styles.siCheckButtonText}>See availability</Text>
          </TouchableOpacity>

        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  searchItem: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  siImg: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  siDesc: {
    flex: 2,
    flexDirection: 'column',
    gap: 10,
    marginLeft: 5
  },
  siTitle: {
    fontSize: 20,
    color: '#0071c2',
  },
  siDistance: {
    fontSize: 12,
  },
  siTaxiOp: {
    fontSize: 12,
    backgroundColor: '#008009',
    color: 'white',
    alignSelf: 'flex-start',
    padding: 3,
    borderRadius: 5,
  },
  siSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  siFeatures: {
    fontSize: 12,
  },
  siCancelOp: {
    fontSize: 12,
    color: '#008009',
    fontWeight: 'bold',
  },
  siCancelOpSubtitle: {
    fontSize: 12,
    color: '#008009',
  },
  siCancelOpSubtitle: {
    fontSize: 12,
    color: '#008009',
  },
  siDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  siRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  siRatingButton: {
    backgroundColor: '#003580',
    color: 'white',
    padding: 5,
    fontWeight: 'bold',
    borderRadius: 5,
  },
  siRatingButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  siDetailTexts: {
    textAlign: 'right',
    flexDirection: 'column',
    gap: 5,
  },
  siPrice: {
    fontSize: 24,
  },
  siTaxOp: {
    fontSize: 12,
    color: 'gray',
  },
  siCheckButton: {
    backgroundColor: '#0071c2',
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  siCheckButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
})

export default SearchItem; 