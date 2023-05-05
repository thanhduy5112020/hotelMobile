import React from 'react';
import { View, Text, SafeAreaView, Keyboard, Alert } from 'react-native';
import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import DetailsScreen from './DetailsScreen';
import usePost from '../../hooks/usePost';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const { loading: loadingUser, error, postData } = usePost();

  const { dispatch } = React.useContext(AuthContext);


  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }

    if (isValid) {
      login();

    }
  };

  const login = async () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      console.log("Wait ")
    }, 3000)

    const payload = {
      username: inputs.email,
      password: inputs.password,
    };
    console.log("paload ", payload)
    try {

     
      dispatch({ type: 'LOGIN_START' });

      const response = await postData('api/auth/login', payload);
      console.log("response ", response)
    
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.details });

  
      if (payload.username === "admin") {
        navigation.navigate('HomeTab');
      } else {
        navigation.navigate('HomeScreen');
      }
      
    } catch (err) {
  
      Alert.alert("Failure", "Try again !");
      console.log(err)
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
     
    } finally {
      setLoading(false);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
          Log In
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Usename"
            placeholder="Enter your Username"
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Log In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Don't have account ?Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
