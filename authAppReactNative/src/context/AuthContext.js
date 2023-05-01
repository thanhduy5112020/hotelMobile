import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  console.log("state ", state)
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        console.log("user data ", userData)
        if (userData) {
          dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(userData) });
        }
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const saveUserData = async () => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(state.user));
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      }
    };

    saveUserData();
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
