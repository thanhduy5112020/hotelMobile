
import React from 'react';
import {
    Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Animated, Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../conts/colors';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';

// import SearchItem from '../components/SearchItem';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;


const UserScreen = ({ navigation }) => {

    const { data: userData, loading: userLoading, error: userError } = useFetch("api/users")
    console.log("userData ", userData)
    const { user } = React.useContext(AuthContext);


    const handleDeleteUser = (userId) => {
        // Implement your delete logic here
        // You can show an alert or confirmation dialog before deleting the user
        Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    // Perform the delete operation
                    console.log('Deleting user with id:', userId);
                },
            },
        ]);
    };

    const handleEditUser = (userId) => {
        // Implement your edit logic here
        // You can navigate to the edit user screen or show a modal for editing
        console.log('Editing user with id:', userId);
    };

    const renderUserItem = ({ item }) => (
        <View style={style.userItem}>
            <Image source={{ uri: item.img }} style={style.userImage} />
            <View style={style.userInfoContainer}>
                <Text style={style.username}>{item.username}</Text>
                <Text style={style.userEmail}>{item.email}</Text>
                <Text style={style.userCountry}>{item.phone}</Text>
            </View>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.button} onPress={() => handleDeleteUser(item.id)}>
                    <Text style={style.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.buttonEdit} onPress={() => handleEditUser(item.id)}>
                    <Text style={style.buttonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );


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
                        User Page
                    </Text>
                </View>
                <View style={style.userInfo}>

                    <Image source={{ uri: user?.img }} style={style.userImage} />
                    <Text style={style.username}>Admin</Text>
                </View>
            </View>

            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                {/* <Navbar/> */}
                <FlatList
                    data={userData}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderUserItem}
                />

            {/* </ScrollView> */}

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
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userInfoContainer: {
        flex: 1,
        marginLeft: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
        color: 'gray',
    },
    userCountry: {
        fontSize: 14,
        color: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'lightcoral',
        borderRadius: 5,
        marginLeft: 10,
    },
    buttonEdit: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'limegreen',
        borderRadius: 5,
        marginLeft: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
     userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

});

export default UserScreen;