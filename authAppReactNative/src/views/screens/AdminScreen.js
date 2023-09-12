import axios from 'axios';
import React from 'react';
import {
  Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Animated, Alert
} from 'react-native';

import COLORS from '../../conts/colors';


import Navbar from '../components/Navbar';
import { AuthContext } from '../../context/AuthContext';

import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import useFetch from '../../hooks/useFetch';


const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;



const chartConfig = {
  backgroundGradientFrom: "#EEEEEE",
  backgroundGradientTo: "#EEEEEE",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
};



const AdminScreen = ({ navigation }) => {
  const { user } = React.useContext(AuthContext);
  const { data: dataTotal, loading: loadingTotal, error: errorTotal } = useFetch("api/hotels/calculateTotal")
  const { data: dataRating, loading: loadingRating, error: errorRating } = useFetch("api/hotels/calculateAverageRating")
  const { data: dataBest, loading: loadingBest, error: errorBest } = useFetch("api/hotels/findHotelWithMaxRevenue")
  const { data: dataPie, loading: loadingPie, error: errorPie } = useFetch("api/hotels/findTopHotelsByTotal")
  const { data: dataBar, loading: loadingBar, error: errorBar } = useFetch("api/hotels/calculateTotalByType")
  console.log(dataPie[0]?.amount)
  const datatest = dataPie[0]?.amount
  console.log(dataTotal)

  const data1 = [
    {
      name: dataPie[0]?.name,
      population: dataPie[0]?.amount,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: dataPie[1]?.name,
      population: dataPie[1]?.amount,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: dataPie[2]?.name,
      population: dataPie[2]?.amount,
      color: "#FFCCFF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: dataPie[3]?.name,
      population: dataPie[3]?.amount,
      color: "#33FF66",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: dataPie[4]?.name,
      population: dataPie[4]?.amount,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const data2 = {
    labels: [dataBar[0]?._id, dataBar[1]?._id, dataBar[2]?._id, dataBar[3]?._id, dataBar[4]?._id],
    datasets: [
      {
        data: [dataBar[0]?.total, dataBar[1]?.total, dataBar[2]?.total, dataBar[3]?.total, dataBar[4]?.total]
      }
    ]
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
            Dash Board
          </Text>
        </View>
        <View style={style.userInfo}>
          <Image source={{ uri: user?.img }} style={style.userImage} />
          <Text style={style.username}> Admin</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Navbar />
        <View style={style.chartContainer}>
          <Text style={style.chartTitle}>Revenue By Type</Text>
          {
            datatest != undefined  ? <View style={style.chart}>
            <BarChart
              style={style.graphStyle}
              data={data2}
              width={width - 40}
              height={220}
              yAxisLabel="$"
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
          </View>:<></>
          }
          

        </View>
        <View style={style.chartContainer}>
          <Text style={style.chartTitle}>Top 4 highest revenue </Text>
          {
            dataBar.length != 0? <View style={style.chart}>
            <PieChart
              data={data1}
              width={width}
              height={220}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[10, 5]}
              style={style.graphStyle}
            />
          </View>:<></>
          }
        </View>
        <Text ></Text>
        
        <Text style={style.chartTitle}>Total Revenue:
          <Text style={{ fontWeight: 'normal', color: 'green' }}> {dataTotal?.total} $</Text>
        </Text>
        <Text ></Text>
        <Text style={style.chartTitle}>Average Rating:
          <Text style={{ fontWeight: 'normal', color: 'green' }}> {dataRating?.averageRating}</Text>
        </Text>
        <Text ></Text>
        <Text style={style.chartTitle}>Best Hotel:
          <Text style={{ fontWeight: 'normal', color: 'green' }}> {dataBest?.name}</Text>
        </Text>
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
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chartContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#fff',
  },
  graphStyle: {
    marginVertical: 10,
    // borderRadius: 50,
  }

});

export default AdminScreen;