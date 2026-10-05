import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../../../assets/images/logo/logo.png';
import { useAuth } from '../../../context/Auth';

const Home = () => {
  const navigation = useNavigation();
  const { isAuth, user, handleLogout } = useAuth();

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Top Header */}
      <View style={styles.topSection}>
        <View style={styles.brandRow}>
          <View style={styles.brandIcon}>
            <View style={styles.brandDot} />
          </View>

          <View>
            <Text style={styles.brandTitle}>TASKNATIVE</Text>
            <Text style={styles.brandSubtitle}>PRODUCTIVITY APP</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.heroContainer}>
        {/* Logo */}
        <View style={styles.logoOuter}>
          <View style={styles.logoWrapper}>
            <Image source={logo} style={styles.logoImage} />
          </View>
        </View>

        {/* Profile */}
        {isAuth && (
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {getInitials(user?.fullName || user?.email)}
              </Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.welcomeSmall}>WELCOME BACK</Text>

              <Text style={styles.profileName} numberOfLines={1}>
                {user?.fullName || 'User Profile'}
              </Text>

              <Text style={styles.profileEmail} numberOfLines={1}>
                {user?.email || 'No email provided'}
              </Text>
            </View>

            <View style={styles.onlineDot} />
          </View>
        )}

        {/* Heading */}
        <Text style={styles.title}>
          {isAuth ? 'Welcome Back! 👋' : 'Plan Your Day'}
        </Text>

        <Text style={styles.titleHighlight}>
          {isAuth ? 'Let’s Get Things Done.' : 'Stay Organized.'}
        </Text>

        <Text style={styles.subtitle}>
          {isAuth
            ? "Your tasks are synced and ready. Let's make today productive and get things done."
            : 'Keep track of your daily goals, stay organized, and never miss an important task again.'}
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {isAuth ? (
          <>
            <TouchableOpacity
              style={styles.primaryBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Todos')}
            >
              <Text style={styles.primaryBtnText}>View My Tasks</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutBtn}
              activeOpacity={0.85}
              onPress={() => handleLogout()}
            >
              <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.primaryBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.primaryBtnText}>Login</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.secondaryBtnText}>Create Account</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.footerText}>
          Simple tasks. Better productivity.
        </Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 24,
    paddingTop: 45,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },

  /* ---------------- TOP ---------------- */

  topSection: {
    width: '100%',
    alignItems: 'flex-start',
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brandIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  brandDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },

  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },

  brandSubtitle: {
    fontSize: 8,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 1.5,
    marginTop: 2,
  },

  /* ---------------- HERO ---------------- */

  heroContainer: {
    width: '100%',
    alignItems: 'center',
  },

  logoOuter: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#334155',
  },

  logoWrapper: {
    width: 92,
    height: 92,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  logoImage: {
    width: 68,
    height: 68,
    resizeMode: 'contain',
    borderRadius: 18,
  },

  /* ---------------- PROFILE ---------------- */

  profileCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 14,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#334155',
  },

  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  profileInfo: {
    flex: 1,
  },

  welcomeSmall: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.2,
    marginBottom: 3,
  },

  profileName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 3,
  },

  profileEmail: {
    fontSize: 12,
    color: '#94A3B8',
  },

  onlineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#22C55E',
    marginLeft: 8,
  },

  /* ---------------- TEXT ---------------- */

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.6,
    marginBottom: 2,
  },

  titleHighlight: {
    fontSize: 28,
    fontWeight: '800',
    color: '#EF4444',
    textAlign: 'center',
    letterSpacing: -0.6,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
    maxWidth: 430,
  },

  /* ---------------- BUTTONS ---------------- */

  buttonContainer: {
    width: '100%',
  },

  primaryBtn: {
    width: '100%',
    backgroundColor: '#DC2626',
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    flexDirection: 'row',

    elevation: 6,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
    marginLeft: 12,
  },

  secondaryBtn: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#475569',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  secondaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  logoutBtn: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#7F1D1D',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  logoutBtnText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
  },

  footerText: {
    color: '#64748B',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 3,
  },
});