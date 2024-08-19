import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimeTableScreen from './TimeTableScreen';
import GraduationScreen from './GraduationScreen'; 
import SmileScreen from './SmileScreen'; 
import SettingsScreen from './SettingsScreen';
import HomePage from './HomePage';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#3D8FEF',
          height: height * 0.065,
          width: width * 0.88,
          borderRadius: 30,
          marginHorizontal: width * 0.075,
          marginBottom: 20,
          position: 'absolute',
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let isCustomIcon = false;

          switch (route.name) {
            case 'Timetable':
              iconSource = focused
                ? require('../../Assets/Images/Timetableactive.png')
                : require('../../Assets/Images/Timetable.png');
              isCustomIcon = true;
              break;
            case 'Graduation':
              iconSource = focused
                ? require('../../Assets/Images/activegcap.png')
                : require('../../Assets/Images/fi-sr-graduation-cap.png');
              isCustomIcon = true;
              break;
            case 'Home':
              return (
                <View style={focused ? styles.activeIconContainer : undefined}>
                  <Icon name="home" size={25} color={focused ? "#3D8FEF" : "white"} style={styles.activeIcon} />
                </View>
              );
            case 'Smile':
              iconSource = focused
                ? require('../../Assets/Images/activegcap.png')
                : require('../../Assets/Images/Smilinginactive.png');
              isCustomIcon = true;
              break;
            case 'Settings':
              return (
                <View style={focused ? styles.activeIconContainer : undefined}>
                  <Icon name="settings" size={25} color={focused ? "#3D8FEF" : "white"} style={styles.activeIcon} />
                </View>
              );
          }

          if (isCustomIcon) {
            return (
              <View style={focused ? styles.activeIconContainer : undefined}>
                <Image source={iconSource} style={[styles.footerIcon, focused && styles.activeIconStyle]} />
              </View>
            );
          }
        },
      })}
    >
      <Tab.Screen name="Timetable" component={TimeTableScreen} />
      <Tab.Screen name="Graduation" component={GraduationScreen} />
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Smile" component={SmileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  footerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  activeIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    textAlign: 'center',
  },
  activeIconStyle: {
    tintColor: '#3D8FEF',
  },
});

export default HomeScreen;
