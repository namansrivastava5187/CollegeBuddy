import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, TextInput, Image, ToastAndroid,
  KeyboardAvoidingView, ScrollView, Platform, Dimensions, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../App/Backend/configs/FirebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';

const animation1 = require('../../Assets/Images/signuplottie.json');

export default function LoginScreen() {
  {/* font import from external files */}
  let [fontsLoaded] = useFonts({
    'InterBold': require('./Fonts/Inter_18pt-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  {/* navigation and various input fields variable */}
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { width, height } = Dimensions.get('window');

  const LoginUser = () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter credentials", ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.replace("Homep");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          ToastAndroid.show("Enter correct credentials", ToastAndroid.LONG);
        } else if (errorCode === "auth/invalid-email") {
          ToastAndroid.show("Email not registered", ToastAndroid.LONG);
        }
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      ToastAndroid.show("Please enter your email", ToastAndroid.LONG);
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        ToastAndroid.show("Password reset email sent!", ToastAndroid.LONG);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          ToastAndroid.show("No user found with this email", ToastAndroid.LONG);
        } else {
          ToastAndroid.show("Error sending reset email", ToastAndroid.LONG);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1 }}>
          <Svg height="100%" width="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#325AFF" stopOpacity="1" />
                <Stop offset="1" stopColor="#325AFF" stopOpacity="1" />
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
                  marginTop: 10,
                }}
              >
                <ArrowLeftIcon size={23} color="rgba(61, 143, 239, 1)" />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
              <LottieView
                source={animation1}
                autoPlay
                loop
                style={{ width: width * 0.9, height: height * 0.25, marginTop: -30 }}
              />
            </View>
          </SafeAreaView>

          <View 
            style={{
              flex: 1,
              backgroundColor: 'white',
              paddingHorizontal: width * 0.075,
              paddingTop: 20, 
              borderTopLeftRadius: 38,
              borderTopRightRadius: 38,
              justifyContent: 'flex-start',
              marginTop: -15, 
            }}
          >
            <View style={{ marginBottom: 10, marginTop: 20 }}>
              <View style={{ alignItems: 'flex-start', marginTop: -5, marginHorizontal: 10 }}>
                <Image 
                  source={require("../../Assets/Images/letterc.png")} 
                  style={{ height: 50, width: 50 }}
                />
                <Text style={{ marginTop: 10, color: '#000000', fontSize: 24, fontFamily: 'InterBold' }}>
                  Register Account {'\n'}To  
                  <Text style={{ color: '#325AFF', fontFamily: 'InterBold' }}> CollegeBuddy</Text>
                </Text>
                <Text style={{ marginTop: -2, color: 'grey', fontFamily: 'InterBold' }}>
                  Hello Buddy, register to continue
                </Text>
              </View>
              <Text style={{ color: 'rgba(0, 0, 0, 1)', fontWeight: 'bold', marginLeft: 10, fontFamily: 'InterBold', marginTop: 25 }}>
                Username/Email Address
              </Text>
              <TextInput 
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: 10,
                  marginBottom: 16,
                  fontFamily: 'InterBold',
                  marginHorizontal: width * 0.02, // Adjusted margin
                  borderColor: 'lightgray',
                  borderWidth: 1,
                }}
                value={email}
                onChangeText={setEmail}
                placeholder='Enter username/email address' 
                keyboardType='email-address'
              />
              <Text style={{ color: 'black', marginLeft: 10, fontWeight: 'bold', fontFamily: 'InterBold', marginTop: -5 }}>
                Password
              </Text>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <View style={{ flex: 1, position: 'relative' }}>
                  <TextInput 
                    style={{
                      padding: 10,
                      backgroundColor: 'white',
                      color: 'black',
                      borderRadius: 10,
                      fontFamily: 'InterBold',
                      width: '95%',
                      marginHorizontal: width * 0.02, // Adjusted margin
                      borderColor: 'lightgray',
                      borderWidth: 1,
                    }}
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Enter Password'
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={{
                      position: 'absolute',
                      right: 30,
                      top: '50%',
                      transform: [{ translateY: -12 }], 
                    }}
                  >
                    <Icon
                      name={passwordVisible ? 'eye' : 'eye-off'}
                      size={24}
                      color='#3D8FEF'
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity 
                onPress={handleForgotPassword}
                style={{ marginTop: -10, marginLeft: 'auto', marginRight: 16 }}
              >
                <Text style={{ color: 'black', fontWeight: 'bold', fontFamily: 'InterBold' }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{
                  paddingVertical: 10,
                  backgroundColor: 'rgba(61, 143, 239, 1)',
                  borderRadius: 10,
                  alignItems: 'center',
                  marginTop: 15,
                  width: width * 0.75, // Adjusted width
                  marginHorizontal: width * 0.05, // Adjusted margin
                }}
                onPress={LoginUser}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', fontFamily: 'InterBold' }}>
                  Login
                </Text>
              </TouchableOpacity>
                            
              <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 14, color: 'black', fontFamily: 'InterBold' }}>Or</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -10 }}>
                <TouchableOpacity 
                  style={{
                  
                    padding: 10,
                    borderRadius: 10,
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: width * 0.02, // Adjusted margin
                  }}
                >
                  <Image 
                    source={require('../../Assets/Images/google.png')} 
                    style={{ width: 50, height: 50 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{
                
                    padding: 10,
                    borderRadius: 10,
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: width * 0.02, // Adjusted margin
                  }}
                >
                  <Image 
                    source={require('../../Assets/Images/facebook.png')} 
                    style={{ width: 50, height: 50 }}
                  />
                </TouchableOpacity>
              </View>
              
              <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: 'InterBold', color: 'black' }}>
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={{ fontSize: 14, fontFamily: 'InterBold', color: 'rgba(61, 143, 239, 1)', marginLeft: 4 }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
