import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/views/screens/LoginScreen';
import RegistrationScreen from './src/views/screens/RegistrationScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import ListScreen from './src/views/screens/ListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './src/views/components/Loader';
import { View, Text } from 'react-native';
import axios from 'axios';
import useFetch from './src/hooks/useFetch';
import { AuthContextProvider } from './src/context/AuthContext';
import { SearchProvider } from './src/context/SearchContext';
import BookingConfirmationScreen from './src/views/screens/BookingConfirmationScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('');


  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('HomeScreen');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } else {
        setInitialRouteName('RegistrationScreen');
      }
    } catch (error) {
      setInitialRouteName('RegistrationScreen');
    }
  };

  return (
    <AuthContextProvider>
      <SearchProvider>
        <NavigationContainer>
          {!initialRouteName ? (
            <Loader visible={true} />
          ) : (
            <>
              <Stack.Navigator
                initialRouteName={initialRouteName}
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen
                  name="RegistrationScreen"
                  component={RegistrationScreen}
                />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
                <Stack.Screen name="BookingConfirmationScreen" component={BookingConfirmationScreen} />
                <Stack.Screen name="ListScreen" component={ListScreen} />
                
              </Stack.Navigator>
            </>
          )}
        </NavigationContainer>
      </SearchProvider>
    </AuthContextProvider>
  );
};

export default App;
