import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';

export default function Register() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Email validation
  const emailValidCheck = (emailText) => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(emailText);
  };

  const handleSubmit = async () => {
    if (fullName.trim().length < 3) {
      return Alert.alert(
        'Error',
        'Please enter correct name.'
      );
    }

    if (!emailValidCheck(email)) {
      return Alert.alert(
        'Error',
        'Please enter correct email address.'
      );
    }

    if (password.length < 8) {
      return Alert.alert(
        'Error',
        'Password must be at least 8 characters.'
      );
    }

    if (password !== confirmPassword) {
      return Alert.alert(
        'Error',
        'Passwords must match.'
      );
    }

    const user = {
      fullName: fullName.trim(),
      email: email.trim(),
      password,
    };

    setIsProcessing(true);

    axios
      .post(
        `${API_URL}/auth/register`,
        user,
        {
          timeout: 10000,
        }
      )
      .then(({ status, data }) => {
        if (status === 201) {
          const responseMessage =
            data.message || 'Registered successfully!';

          Alert.alert(
            'Success',
            responseMessage
          );

          navigation.navigate('Login');
        }
      })
      .catch((error) => {
        console.error('Register error:', error);

        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          'User not registered.';

        Alert.alert(
          'Error',
          errorMessage
        );
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior="height"
      keyboardVerticalOffset={20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>

          {/* TITLE */}
          <Text style={styles.title}>
            Create Account
          </Text>

          {/* FULL NAME */}
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>
            Full Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          {/* EMAIL */}
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
            autoCorrect={false}
          />

          {/* PASSWORD */}
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

          {/* CONFIRM PASSWORD */}
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>
            Confirm Password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter confirm password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />

          {/* REGISTER BUTTON */}
          <TouchableOpacity
            style={[
              styles.registerButton,
              isProcessing &&
                styles.registerButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isProcessing}
            activeOpacity={0.8}
          >
            {isProcessing ? (
              <ActivityIndicator
                size="small"
                color="#ffffff"
              />
            ) : (
              <Text style={styles.registerButtonText}>
                Register
              </Text>
            )}
          </TouchableOpacity>

          {/* LOGIN LINK */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}

              <Text
                style={styles.linkText}
                onPress={() =>
                  navigation.navigate('Login')
                }
              >
                Login
              </Text>
            </Text>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: '#1e293b',
  },

  scrollContainer: {
    flexGrow: 1,
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
    color: '#dc2626',
  },

  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: '#0f172a',
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },

  /* RED REGISTER BUTTON */
  registerButton: {
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

  registerButtonDisabled: {
    opacity: 0.65,
  },

  registerButtonText: {
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