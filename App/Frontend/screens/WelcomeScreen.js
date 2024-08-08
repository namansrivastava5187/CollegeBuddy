import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() { 
  const navigation = useNavigation();
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(58, 54, 244, 1)' }}> 
    
      <View style={{ flex: 1, justifyContent: 'space-around', marginVertical: 16 }}> 
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32, textAlign: 'center', marginTop:50}}> 
         Welcome To {'\n'}CollegeBuddy
        </Text>
        <View >
          <Image 
            source={require("../../../App/Assets/Images/welcomelottie.gif")}
            style={{ width:300, height: 250, marginHorizontal:30 }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignUp')}
            style={{ paddingVertical: 12, backgroundColor: 'white', marginHorizontal: 28, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ color: 'white', fontWeight: '600' }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ fontWeight: 'bold', color: 'yellow', marginLeft: 5, fontSize:15 }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
