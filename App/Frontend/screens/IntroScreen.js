import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
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

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <Svg height="100%" width="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
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
        paginationStyle={{ position: 'absolute', top: -625, alignItems: 'center' }}
        activeDot={<View style={{ width: 70, height: 5, borderRadius: 5, marginHorizontal: 5, backgroundColor: '#FFF' }} />}
        dot={<View style={{ width: 70, height: 5, borderRadius: 5, marginHorizontal: 5, backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />}
        autoplay={true}
        autoplayTimeout={3}
        index={0}
        scrollEnabled={true}
        showsButtons={false}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
            source={animation1}
            autoPlay
            loop
            style={{ width: width * 0.8, height: height * 0.5, marginTop: 200 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 28, textAlign: 'center', marginTop: -85 ,fontFamily:"InterBold"}}>
              Welcome To CollegeBuddy
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
            source={animation2}
            autoPlay
            loop
            style={{ width: width * 0.8, height: height * 0.5, marginTop: 200 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 28, textAlign: 'center', marginTop: -85, fontFamily:'InterBold' }}>
              Time Saving
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
            source={animation3}
            autoPlay
            loop
            style={{ width: width * 0.8, height: height * 0.5, marginTop: 200 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 28, textAlign: 'center', marginTop: -85,fontFamily:'InterBold' }}>
              Track Your Attendance
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
            source={animation4}
            autoPlay
            loop
            style={{ width: width * 0.8, height: height * 0.3, marginTop: 270 }}
          />
          <View style={{ flex: 1,marginTop:10}}>
            <Text style={{ color: 'white', fontSize: 28, textAlign: 'center', marginBottom: 20,fontFamily:'InterBold' }}>
              One Solution For All
            </Text>
          </View>
          
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 40,
              right: 50,
              backgroundColor: 'white',
              borderRadius: 50,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              
              
            }}
            onPress={() => navigation.navigate('Welcome')}
          >
            <ChevronRightIcon size={30} color="black" />
          </TouchableOpacity>
        
        </View>
      </Swiper>
    </View>
  );
}
