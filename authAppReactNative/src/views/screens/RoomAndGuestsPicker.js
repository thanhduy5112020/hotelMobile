import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Overlay } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../conts/colors';


const RoomAndGuestsPicker = ({ options, onChangeTotalGuests }) => {
    const [visible, setVisible] = useState(false);
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [totalGuests, setTotalGuests] = useState(1);
    console.log("Options ", options)

    useEffect(() => {
        const calculateTotalGuests = () => {
          const total = adults + children;
          setTotalGuests(total);
          onChangeTotalGuests(total);
        };
    
        calculateTotalGuests();
      }, [adults, children, onChangeTotalGuests]);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const increment = (setter) => {
        setter((prev) => prev + 1);
    };

    const decrement = (setter, minValue = 0) => {
        setter((prev) => (prev > minValue ? prev - 1 : minValue));
      };
      

    return (
        <View>
            <TouchableOpacity onPress={toggleOverlay}>
                <View style={styles.headerSearch}>
                    <View style={styles.headerSearchItem}>
                        <Icon name="user" size={30} style={{ marginLeft: 20 }} />
                        <Text style={{ fontSize: 20, paddingLeft: 20 }}>{`${adults} adult - ${children} children - ${rooms} room`}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Overlay isVisible={visible}>
                <View style={styles.overlayContainer}>
                    <Text style={styles.overlayTitle}>Select rooms and guests</Text>
                    <View style={styles.overlaySection}>
                        <Text style={styles.overlayLabel}>Adults</Text>
                        <View style={styles.overlayControl}>
                            <TouchableOpacity onPress={() => decrement(setAdults, 1)}>
                                <Icon name="minus" size={20} color="#888" />
                            </TouchableOpacity>
                            <Text style={styles.overlayValue}>{adults}</Text>
                            <TouchableOpacity onPress={() => increment(setAdults)}>
                                <Icon name="plus" size={20} color="#888" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.overlaySection}>
                        <Text style={styles.overlayLabel}>Children</Text>
                        <View style={styles.overlayControl}>
                            <TouchableOpacity onPress={() => decrement(setChildren)}>
                                <Icon name="minus" size={20} color="#888" />
                            </TouchableOpacity>
                            <Text style={styles.overlayValue}>{children}</Text>
                            <TouchableOpacity onPress={() => increment(setChildren)}>
                                <Icon name="plus" size={20} color="#888" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.overlaySection}>
                        <Text style={styles.overlayLabel}>Rooms</Text>
                        <View style={styles.overlayControl}>
                            <TouchableOpacity onPress={() => decrement(setRooms, 1)}>
                                <Icon name="minus" size={20} color="#888" />
                            </TouchableOpacity>
                            <Text style={styles.overlayValue}>{rooms}</Text>
                            <TouchableOpacity onPress={() => increment(setRooms)}>
                                <Icon name="plus" size={20} color="#888" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.overlayButton} onPress={toggleOverlay}>
                        <Text style={styles.overlayButtonText}>
                            Apply
                        </Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
        </View>
    );
};

const styles = StyleSheet.create({
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
    headerSearchItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerSearchText: {
        fontSize: 20,
        paddingLeft: 10,
    },
    overlayContainer: {
        padding: 20,
    },
    overlayTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    overlaySection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    overlayLabel: {
        fontSize: 18,
    },
    overlayControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    overlayValue: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    overlayButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    overlayButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default RoomAndGuestsPicker;