import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ToastAndroid, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
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
  let [fontsLoaded] = useFonts({
    'InterBold': require('./Fonts/Inter_24pt-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const LoginUser = () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter credentials", ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.replace("Home");
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
                <ArrowLeftIcon size="23" color="rgba(61, 143, 239, 1)" />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
              <LottieView
                source={animation1}
                autoPlay
                loop
                style={{ width: 400, height: 200, marginTop: -30 ,marginLeft:15}}
              />
            </View>
          </SafeAreaView>

          <View 
            style={{
              flex: 1,
              backgroundColor: 'white',
              paddingHorizontal: 30,
              paddingTop: 20, 
              borderTopLeftRadius: 38,
              borderTopRightRadius: 38,
              justifyContent: 'flex-start',
              marginTop: -15, // Adjusted to avoid overlap
              
            }}
          >
            <View style={{ marginBottom: 10, marginTop: 20 }}>
              <View style={{ alignItems: 'flex-start', marginTop: -10, marginHorizontal: 10 }}>
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
              <Text style={{ color: 'rgba(0, 0, 0, 1)', fontWeight: 'bold', marginLeft: 10, fontFamily: 'InterBold',marginTop:35 }}>Username or Email Address</Text>
              <TextInput 
                style={{
                  padding: 10,
                  backgroundColor: 'white', // Changed to white
                  color: 'gray',
                  borderRadius:10,
                  marginBottom: 16,
                  fontFamily: 'InterBold',
                  marginHorizontal:9,
                  borderColor:'lightgray', // Outline border color light gray
                  borderWidth: 1, // Added border width
                }}
                value={email}
                onChangeText={setEmail}
                placeholder='Enter username or email address' 
                keyboardType='email-address'
              />
              <Text style={{ color: 'black', marginLeft: 10, fontWeight: 'bold',fontFamily: 'InterBold', marginTop:-5}}>Password</Text>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                <View style={{ flex: 1, position: 'relative' }}>
                  <TextInput 
                    style={{
                      padding: 10,
                      backgroundColor: 'white', // Changed to white
                      color: 'gray',
                      borderRadius: 10,
                      fontFamily: 'InterBold',
                      width: '95%',
                      marginHorizontal:9,
                      borderColor: 'lightgray', // Outline border color light gray
                      borderWidth: 1, // Added border width
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
                <Text style={{ color: 'black', fontWeight: 'bold', fontFamily: 'InterBold' }}>Forgot Password?</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{
                  paddingVertical: 10,
                  backgroundColor: 'rgba(61, 143, 239, 1)',
                  borderRadius: 10,
                  alignItems: 'center',
                  marginTop: 15,
                  width:'90%',
                  marginHorizontal:15
                }}
                onPress={LoginUser}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', fontFamily: 'InterBold' }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingVertical: 5, fontFamily: 'InterBold', marginBottom: -3 }}>
              Or
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
              <TouchableOpacity 
                style={{
                  padding: 6,
                  backgroundColor: 'lightgray',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginVertical: 6,
                }}
              >
                <Image 
                  source={require("../../Assets/Images/google.png")}
                  style={{ height: 28, width: 28 }}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={{
                  padding: 6,
                  backgroundColor: 'lightgray',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginVertical: 6,
                }}
              >
                <Image 
                  source={require("../../Assets/Images/facebook.png")}
                  style={{ height: 28, width: 28 }}
                />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -6 }}>
              <Text style={{ color: 'black', fontSize: 14, fontFamily: 'InterBold' }}>
                Don't have an account? 
              </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('SignUp')}
                style={{ marginLeft: 3 }}
              >
                <Text style={{ color: '#325AFF', fontFamily: 'InterBold', textDecorationLine: 'underline' }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
