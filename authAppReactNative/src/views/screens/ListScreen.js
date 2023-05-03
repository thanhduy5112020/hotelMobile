import React from 'react';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import COLORS from '../../conts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../context/AuthContext';
import SearchItem from '../components/SearchItem';
import useFetch from '../../hooks/useFetch';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const ListScreen = ({ navigation, route }) => {
    const { destination, day, people } = route.params.state;
    const { user } = React.useContext(AuthContext);
    const [minPrice, setMinPrice] = React.useState(0);
    const [maxPrice, setMaxPrice] = React.useState(999999);

    const queryString = `api/hotels/searchHotelByLocation?city=${destination}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    // const queryString = `api/hotels/searchHotelByLocation?city=Ha Noi`;
    const { data: dataSearch, loading: dataSearchLoading, error: dataSearchError } = useFetch(queryString);

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
                        Find your hotel
                    </Text>
                </View>
                <View style={style.userInfo}>
                    <Icon name="person-outline" size={38} color={COLORS.grey} />
                    <Text style={style.username}>{user?.username}</Text>
                </View>


            </View>

            <View style={style.searchInputContainer}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                        style={{ flex: 1, marginRight: 5 }}
                        placeholder="Min Price"
                        value={minPrice}
                        onChangeText={setMinPrice}
                    />
                    <TextInput
                        style={{ flex: 1, marginLeft: 5 }}
                        placeholder="Max Price"
                        value={maxPrice}
                        onChangeText={setMaxPrice}
                    />
                </View>
            </View>


            <ScrollView>
                <View style={styles.container}>
                    <FlatList
                        data={dataSearch}
                        renderItem={({ item }) => <SearchItem item={item} navigation={navigation} />}
                        keyExtractor={(item) => item?._id.toString()}
                    />
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}
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
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
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
    container: {
        flex: 1,
        padding: 10,
    },

});

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    itemText: {
        fontSize: 16,
    },
});

export default ListScreen;
