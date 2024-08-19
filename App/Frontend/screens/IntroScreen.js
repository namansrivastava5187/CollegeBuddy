import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import { useFonts } from 'expo-font';

const animation4 = require('../../../App/Assets/Images/Animation - 1722785627001.json');
const animation2 = require('../../../App/Assets/Images/Animation - 1722785534555.json');
const animation1 = require('../../../App/Assets/Images/Animation - 1722785609267.json');
const animation3 = require('../../../App/Assets/Images/Animation - 1722785621094.json');

const { width, height } = Dimensions.get('window');

export default function IntroScreen({ navigation }) {
  
  let [fontsLoaded] = useFonts({
    'InterBold': require('./Fonts/Inter_24pt-Bold.ttf'),
  });

  const [swiperIndex, setSwiperIndex] = useState(0);
  
  if (!fontsLoaded) {
    return null;
  }

  const handleNextPress = () => {
    if (swiperIndex < 3) {
      setSwiperIndex(swiperIndex + 1);
    } else {
      navigation.navigate('Welcome');
    }
  };

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={styles.backgroundSvg}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#0500FF" stopOpacity="1" />
            <Stop offset="1" stopColor="#0500FF" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>

      <Swiper
        loop={false}
        showsPagination={true}
        paginationStyle={styles.paginationStyle}
        activeDot={<View style={styles.activeDot} />}
        dot={<View style={styles.dot} />}
        autoplay={true}
        autoplayTimeout={3}
        index={swiperIndex}
        onIndexChanged={(index) => setSwiperIndex(index)}
        scrollEnabled={true}
        showsButtons={false}
      >
        <View style={styles.slide}>
          <LottieView
            source={animation1}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.title}>
            Welcome To CollegeBuddy
          </Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextPress}
          >
            <ChevronRightIcon size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.slide}>
          <LottieView
            source={animation2}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.title}>
            Time Saving
          </Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextPress}
          >
            <ChevronRightIcon size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.slide}>
          <LottieView
            source={animation3}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.title}>
            Track Your Attendance
          </Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextPress}
          >
            <ChevronRightIcon size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.slide}>
          <LottieView
            source={animation4}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={[styles.title, { marginBottom: 20 }]}>
            One Solution For All
          </Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextPress}
          >
            <ChevronRightIcon size={30} color="black" />
          </TouchableOpacity>
        </View>
      </Swiper>
    </View>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 20,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
    marginBottom:20
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom:20
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  animation: {
    width: width * 0.9,
    height: height * 0.6,
    marginTop: -100,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    marginTop: -45,
    fontFamily: 'InterBold',
  },
  nextButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
