import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');
const STAR_WIDTH = width / 5;

const StarFilter = ({ selectedStar, handleSelectedStar }) => {
    const handleFilter = (rating) => {
        handleSelectedStar(rating);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, selectedStar === 1 && styles.buttonSelected]}
                onPress={() => handleFilter(1)}
            >
                <Text style={[styles.buttonText, selectedStar === 1 && styles.buttonTextSelected]}>1 ★</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedStar === 2 && styles.buttonSelected]}
                onPress={() => handleFilter(2)}
            >
                <Text style={[styles.buttonText, selectedStar === 2 && styles.buttonTextSelected]}>2 ★</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedStar === 3 && styles.buttonSelected]}
                onPress={() => handleFilter(3)}
            >
                <Text style={[styles.buttonText, selectedStar === 3 && styles.buttonTextSelected]}>3 ★</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedStar === 4 && styles.buttonSelected]}
                onPress={() => handleFilter(4)}
            >
                <Text style={[styles.buttonText, selectedStar === 4 && styles.buttonTextSelected]}>4 ★</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedStar === 5 && styles.buttonSelected]}
                onPress={() => handleFilter(5)}
            >
                <Text style={[styles.buttonText, selectedStar === 5 && styles.buttonTextSelected]}>5 ★</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginVertical: 10,
        margin: 15
    },
    button: {
        width: STAR_WIDTH/2,
        height: STAR_WIDTH/2,
        borderRadius: STAR_WIDTH / 2,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSelected: {
        backgroundColor: '#ffbf00',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextSelected: {
        color: 'white',
    },
});

export default StarFilter;