import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../../App/Backend/configs/FirebaseConfig";

export default function SignUpScreen() { // Changed the component name to match its purpose
  const navigation = useNavigation();
  const [fullname, setFullname] = useState(''); // Fixed state setter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const OnCreateAccount = () => {
    if (!email&&!fullname&&!password) {
      ToastAndroid.show("Please enter all details",ToastAndroid.BOTTOM);
      return ;
    }
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    navigation.replace("Home");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    if(errorCode=="auth/email-already-in-use"){
      ToastAndroid.show("email already exists",ToastAndroid.LONG)
    }
    
    // ..
  });
  };


  return (
    <View style={{ flex: 1 }}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#0500FF" stopOpacity="1" />
            <Stop offset="1" stopColor="#6ED4FF" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderRadius: 15,
              marginLeft: 16,
              alignItems: 'center',
              fontWeight: '600',
              marginTop:20
            }}
          >
            <ArrowLeftIcon size="23" color="rgba(61, 143, 239, 1)" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
          <Image 
            source={require('../../../App/Assets/Images/loginfigma.png')}
            style={{ width: 328, height: 158, marginLeft: -20 }}  
          />
        </View>
      </SafeAreaView>
      
      <View 
        style={{
          flex: 1,
          backgroundColor: 'white',
          height: 617,
          paddingHorizontal: 30,
          paddingTop: 20, 
          borderTopLeftRadius: 38,
          borderTopRightRadius: 38,
          justifyContent: 'space-between',
          marginTop: -250,
        }}
      >
        
        <View style={{ marginBottom: 10, marginTop: 20 }}>
          <Text style={{ color: 'rgba(0, 0, 0, 1)', fontWeight: 'bold', marginLeft: 16 }}>Full Name</Text>
          <TextInput 
            style={{
              padding: 16,
              backgroundColor: 'lightgray',
              color: 'gray',
              borderRadius: 20,
              marginBottom: 16,
            }}
            value={fullname}
            onChangeText={setFullname} // Fixed the state setter here
            placeholder='Enter Full Name' 
            keyboardType='default' // Use default for general text input
          />
          <Text style={{ color: 'rgba(0, 0, 0, 1)', fontWeight: 'bold', marginLeft: 16 }}>Email Address</Text>
          <TextInput 
            style={{
              padding: 16,
              backgroundColor: 'lightgray',
              color: 'gray',
              borderRadius: 20,
              marginBottom: 16,
            }}
            value={email}
            onChangeText={setEmail}
            placeholder='Enter Email' 
            keyboardType='email-address'
          />
          <Text style={{ color: 'black', marginLeft: 16, fontWeight: 'bold' }}>Password</Text>
          <TextInput 
            style={{
              padding: 16,
              backgroundColor: 'lightgray',
              color: 'gray',
              borderRadius: 20,
              marginBottom: 16,
            }}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder='Enter Password'
          />
          
          <TouchableOpacity 
            style={{
              paddingVertical: 12,
              backgroundColor: 'rgba(61, 143, 239, 1)',
              borderRadius: 15,
              alignItems: 'center',
            }}
            onPress={OnCreateAccount} // Updated the press handler
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingVertical: -10 }}>
          Or
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
          <TouchableOpacity 
            style={{
              padding: 8,
              backgroundColor: 'lightgray',
              borderRadius: 20,
              marginHorizontal: 12,
            }}
          >
            <Image 
              source={require('../../../App/Assets/Images/google.png')}
              style={{ width: 40, height: 40 }} 
              resizeMode="contain"
            />
          </TouchableOpacity>
         
          <TouchableOpacity 
            style={{
              padding: 8,
              backgroundColor: 'lightgray',
              borderRadius: 20,
              marginHorizontal: 12,
            }}
          >
            <Image 
              source={require('../../../App/Assets/Images/facebook.png')}
              style={{ width: 40, height: 40 }} 
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
          <Text style={{ color: 'rgba(0, 0, 0, 1)', fontWeight: '600' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ fontWeight: '600', color: 'rgba(61, 143, 239, 1)' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
