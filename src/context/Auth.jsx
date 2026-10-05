import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '@env';

const AuthContext = createContext();

const initialState = {
  isAuth: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload = {} } = action;
  const { user = {} } = payload;

  switch (type) {
    case 'SET_LOGIN':
      return {
        isAuth: true,
        user,
      };

    case 'SET_LOGOUT':
      return {
        isAuth: false,
        user: {},
      };

    default:
      return state;
  }
};

const Auth = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isAppLoading, setIsAppLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');

      dispatch({
        type: 'SET_LOGOUT',
        payload: {},
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const readProfile = async (token) => {
    // No token means user is not logged in.
    if (!token) {
      setIsAppLoading(false);
      return;
    }

    try {
      if (!API_URL) {
        console.error('API_URL is not defined.');

        setIsAppLoading(false);
        return;
      }

      console.log('API URL:', API_URL);
      console.log('Checking logged-in user...');

      const response = await axios.get(
        `${API_URL}/auth/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { status, data } = response;

      if (status === 200) {
        const { user } = data;

        console.log('User:', user);

        dispatch({
          type: 'SET_LOGIN',
          payload: {
            user,
          },
        });
      }
    } catch (error) {
      console.error(
        'Read profile error:',
        error?.response?.data || error?.message || error
      );

      // Token invalid/expired
      if (
        error?.response?.data?.message ===
        'Invalid or expired token.'
      ) {
        await AsyncStorage.removeItem('token');

        dispatch({
          type: 'SET_LOGOUT',
          payload: {},
        });
      }
    } finally {
      setIsAppLoading(false);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        console.log('Stored token:', token ? 'YES' : 'NO');

        await readProfile(token);
      } catch (error) {
        console.error('Load token error:', error);

        setIsAppLoading(false);
      }
    };

    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        readProfile,
        handleLogout,
        isAppLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default Auth;