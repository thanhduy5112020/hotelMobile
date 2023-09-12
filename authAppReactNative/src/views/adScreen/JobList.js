import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import useFetch from '../../hooks/useFetch';

const JobList = () => {
    const { data: jobData, loading: jobLoading, error: jobError } = useFetch("api/job");
    const reversedJobData = jobData?.slice().reverse(); // đảo ngược mảng jobData nếu có
    console.log("jobData ", jobData);
  
    return (
      <View style={styles.container}>
        <FlatList
          data={reversedJobData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.label}>Cleaner: {item.nameCleaner}</Text>
              <Text style={styles.label}>Room number: {item.roomNumber}</Text>
              <Text style={styles.label}>Hotel name: {item.nameHotel}</Text>
              <Text style={styles.label}>Scheduled time: {item.scheduledTime}</Text>
            </View>
          )}
        />
      </View>
    );
  };
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 20,
    },
    item: {
        backgroundColor: '#EEE',
        marginBottom: 10,
        padding: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default JobList;
