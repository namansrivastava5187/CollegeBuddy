import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';

const animation1 = require('../../Assets/Images/Animation - 1722785609267.json');

export default function WelcomeScreen() { 
  let [fontsLoaded] = useFonts({
    'InterBold': require('./Fonts/Inter_24pt-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  const navigation = useNavigation();
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(58, 54, 244, 1)' }}> 
    
      <View style={{ flex: 1, justifyContent: 'space-around', marginVertical: 16 }}> 
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32, textAlign: 'center', marginTop:50, fontfamily: 'InterBold'}}> 
         Welcome to {'\n'}CollegeBuddy
        </Text>
        <View >
        <LottieView
                source={animation1}
                autoPlay
                loop
                style={{  width:350, height: 350, marginHorizontal:20}}
              />
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignUp')}
            style={{ paddingVertical: 12, backgroundColor: 'white', marginHorizontal: 28, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'black', fontfamily: 'InterBold' }}>
              Register
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ color: 'white', fontWeight: '600', fontfamily: 'InterBold' }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ fontWeight: 'bold', color: 'yellow', marginLeft: 5, fontSize:15,fontfamily: 'InterBold' }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
