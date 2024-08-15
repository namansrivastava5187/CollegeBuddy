import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SettingsScreen = () => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    'InterBold': require('./Fonts/Inter_18pt-Bold.ttf'),
    'Intersemi': require('./Fonts/Inter_18pt-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // State for each setting item
  const [profile, setProfile] = useState('Edit profile');
  const [security, setSecurity] = useState('Security');
  const [notifications, setNotifications] = useState('Notifications');
  const [privacy, setPrivacy] = useState('Privacy');
  const [subscription, setSubscription] = useState('My Subscription');
  const [helpSupport, setHelpSupport] = useState('Help & Support');
  const [termsPolicies, setTermsPolicies] = useState('Terms and Policies');
  const [reportProblem, setReportProblem] = useState('Report a problem');
  const [logout, setLogout] = useState('Log out');

  // Code for Back Button regulation
  const handleBackPress = () => {
    console.log('Back button pressed');
  };

  // Function for handling profile
  const handleProfilePress = () => {
    console.log('Profile pressed:', profile);
  };

  // Function for handling security
  const handleSecurityPress = () => {
    console.log('Security pressed:', security);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header with Back Button and Settings Title */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <View style={styles.backButtonBox}>
            <ChevronLeftIcon size={24} color="black" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* ScrollView for content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Account Section */}
        <Text style={styles.sectionAccount}>Account</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.item} onPress={handleProfilePress}>
            <Icon name="person-outline" size={24} color="#000" style={styles.icon} />
            <Text style={styles.itemText}>{profile}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={handleSecurityPress}>
            <Icon name="shield-outline" size={24} color="#000" style={styles.icon} />
            <Text style={styles.itemText}>{security}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => console.log('Notifications pressed:', notifications)}>
            <Icon name="notifications-outline" size={24} color="#000" style={styles.icon} />
            <Text style={styles.itemText}>{notifications}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => console.log('Privacy pressed:', privacy)}>
            <Icon name="lock-closed-outline" size={24} color="#000" style={styles.icon} />
            <Text style={styles.itemText}>{privacy}</Text>
          </TouchableOpacity>
        </View>
        {/* Support & About Section */}
        <Text style={styles.sectionTitle}>Support & About</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.item} onPress={() => console.log('Subscription pressed:', subscription)}>
            <Icon name="card-outline" size={24} color="#000" style={styles.icon} />
            <Text style={styles.itemText}>{subscription}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => console.log('Help & Support pressed:', helpSupport)}>
            <Icon name="help-circle-outline" size={24} color="#000" style={styles.icon} />
            <Text style={styles.itemText}>{helpSupport}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => console.log('Terms and Policies pressed:', termsPolicies)}>
            <Icon name="information-circle-outline" size={24} color="#000" style={styles.icon} />
            <Text style={styles.itemText}>{termsPolicies}</Text>
          </TouchableOpacity>
        </View>

        {/* Actions Section */}
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.item} onPress={() => console.log('Report a problem pressed:', reportProblem)}>
            <Icon name="flag-outline" size={24} color="#000" style={styles.icon} />
            <Text style={styles.itemText}>{reportProblem}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => console.log('Log out pressed:', logout)}>
            <Icon name="log-out-outline" size={24} color="#000" style={styles.icon} />
            <Text style={styles.itemText}>{logout}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    zIndex: 1, // Ensure header is above ScrollView
    borderBottomWidth: 1,
    borderBottomColor:'#ddd',
    marginTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonBox: {
    backgroundColor: '#ffffff',
    marginTop: 10,
    padding: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontFamily: 'InterBold',
    fontWeight: 'bold',
    fontSize: 22,
    flex: 1,
    textAlign: 'center', // Center the title
    marginRight: 40, // Adjust to center the title correctly
    marginTop: 10,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 100, // Adjust to accommodate header height
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#3D8FEF14',
    borderRadius: 31,
    padding: 5,
    marginBottom: 15,
  },
  sectionAccount: {
    fontSize: 16,
    fontFamily: 'InterBold',
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 15,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'InterBold',
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  icon: {
    marginRight: 20,
    marginTop: 0, // Removed marginTop to align with text
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Intersemi',
    fontWeight: 'bold',
    marginTop: 0, // Adjusted to align with icon
  },
});

export default SettingsScreen;
