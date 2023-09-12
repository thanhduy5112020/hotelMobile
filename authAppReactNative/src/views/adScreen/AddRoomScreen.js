import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import useFetch from '../../hooks/useFetch';
import usePost from '../../hooks/usePost';

const AddRoomScreen = ({ navigation }) => {
    const { loading: loadingUser, error, postData } = usePost();
    const [roomData, setRoomData] = useState({
        name: '',
        type: '',
        city: '',
        address: '',
        distance: '',
        title: '',
        desc: '',
        cheapestPrice: '',
        total: '',
    });

    const handleInputChange = (field, value) => {
        setRoomData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleAddRoom = () => {
        console.log('Add room clicked');
        // Kiểm tra các giá trị nhập vào không bị rỗng
        const values = Object.values(roomData);
        if (values.some((value) => value.trim() === '')) {
            Alert.alert('Please fill in all fields');
            return;
        }
        // Thực hiện thêm phòng nếu tất cả các giá trị đã được nhập đầy đủ
        const response = postData('api/hotels', roomData);
        navigation.navigate("AdminScreen");
        console.log('Room data:', roomData);
    };
    

    return (
        <ScrollView>


            <View style={styles.container}>
                <Text style={styles.heading}>Add Room</Text>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={roomData.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Type</Text>
                    <TextInput
                        style={styles.input}
                        value={roomData.type}
                        onChangeText={(value) => handleInputChange('type', value)}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.input}
                        value={roomData.city}
                        onChangeText={(value) => handleInputChange('city', value)}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.input}
                        value={roomData.address}
                        onChangeText={(value) => handleInputChange('address', value)}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Distance</Text>
                    <TextInput
                        style={styles.input}
                        value={roomData.distance}
                        onChangeText={(value) => handleInputChange('distance', value)}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={roomData.title}
                        onChangeText={(value) => handleInputChange('title', value)}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={roomData.desc}
                        onChangeText={(value) => handleInputChange('desc', value)}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Cheapest Price</Text>
                    <TextInput
                        style={styles.input}
                        value={roomData.cheapestPrice}
                        onChangeText={(value) => handleInputChange('cheapestPrice', value)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Total</Text>
                    <TextInput
                        style={styles.input}
                        value={roomData.total}
                        onChangeText={(value) => handleInputChange('total', value)}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={handleAddRoom}>
                    <Text style={styles.addButtonText}>Add Room</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: 'dodgerblue',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddRoomScreen;