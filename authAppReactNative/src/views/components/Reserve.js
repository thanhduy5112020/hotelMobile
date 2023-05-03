import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../conts/colors';
import CheckBox from '@react-native-community/checkbox';

const Reserve = ({ item, navigation, onCheckboxChange, selectedRooms, guests }) => {
 
    return (
        <View style={style.roomItem}>
            <Text style={style.roomType}>{item?.title}</Text>
            <Text style={style.roomDetails}>{item?.desc}</Text>
            <Text style={style.roomMaxPeople}>Max peopple: {item?.maxPeople}</Text>
            <View style={style.checkboxContainer}>

                {item?.roomNumbers.map((roomNumber) => {
                    const room = item?.roomNumbers.find((room) => room._id === roomNumber);
                    const disabled = item?.maxPeople < guests;
                    return (
                        <View key={roomNumber._id}>
                            <CheckBox
                                disabled={disabled}
                                value={selectedRooms.includes(roomNumber._id)}
                                onValueChange={() => onCheckboxChange(roomNumber._id)}
                            />
                            <Text style={[style.checkboxLabel, disabled && style.disabledLabel]}>{roomNumber?.number}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const style = StyleSheet.create({
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
})

export default Reserve; 