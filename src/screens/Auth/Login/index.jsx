import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../context/Auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { readProfile } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Please fill in all fields.');
    }

    setIsProcessing(true);

    axios
      .post(`${API_URL}/auth/login`, {
        email,
        password,
      })
      .then(async ({ status, data }) => {
        if (status === 200) {
          const { message: resMessage, token } = data;

          await AsyncStorage.setItem('token', token);

          await readProfile(token);

          Alert.alert(
            'Success',
            resMessage || 'Logged in successfully!'
          );

          navigation.navigate('Home');
        }
      })
      .catch((error) => {
        console.error('error', error);

        const errorMsg =
          error?.response?.data?.message || 'Login failed.';

        Alert.alert('Error', errorMsg);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>

        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>
          <Text style={styles.required}>* </Text>
          Email
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>
          <Text style={styles.required}>* </Text>
          Password
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={[
            styles.loginButton,
            isProcessing && styles.loginButtonDisabled,
          ]}
          onPress={handleLogin}
          disabled={isProcessing}
          activeOpacity={0.8}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.loginButtonText}>
              Login
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerContainer}>

          <Text style={styles.footerText}>
            Forget Password?{' '}
            <Text
              style={styles.linkText}
              onPress={() =>
                console.log('Navigate to Reset Password')
              }
            >
              Reset Password
            </Text>
          </Text>

          <Text
            style={[
              styles.footerText,
              { marginTop: 8 },
            ]}
          >
            Don't have an account?{' '}

            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('Register')}
            >
              SignUp
            </Text>
          </Text>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 30,

    elevation: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 6,
  },

  required: {
    color: '#ef4444',
  },

  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: '#0f172a',
    backgroundColor: '#fff',
    marginBottom: 16,
  },

  /* RED LOGIN BUTTON */
  loginButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 10,
    marginBottom: 20,

    elevation: 4,

    shadowColor: '#dc2626',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  loginButtonDisabled: {
    opacity: 0.65,
  },

  loginButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  footerContainer: {
    alignItems: 'center',
  },

  footerText: {
    fontSize: 13,
    color: '#475569',
  },

  linkText: {
    color: '#2563eb',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});