import React from 'react';
import {
    Text, TextInput, TouchableOpacity, View,StyleSheet, Dimensions
} from 'react-native';

import COLORS from '../../conts/colors';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;


const Navbar = ({ navigation }) => {
    const categories = ['Dashboard', 'User', "Hotel", "Room"];
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

    const handleCategoryPress = (index) => {
        setSelectedCategoryIndex(index);
        switch (index) {
            case 0:
                // navigation.navigate('AdminPage');
                break;
            case 1:
                // navigation.navigate('HomeScreen');
                break;
            default:
                break;
        }
    };

    return (
        <View style={style.categoryListContainer}>
            {categories.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => handleCategoryPress(index)}
                >
                    <View>
                        <Text
                            style={{
                                ...style.categoryListText,
                                color: selectedCategoryIndex === index ? COLORS.blue : COLORS.grey,
                            }}
                        >
                            {item}
                        </Text>
                        {selectedCategoryIndex === index && (
                            <View
                                style={{
                                    height: 3,
                                    width: 30,
                                    backgroundColor: COLORS.blue,
                                    marginTop: 2,
                                }}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
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

export default Navbar;