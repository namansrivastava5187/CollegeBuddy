import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../App/Backend/configs/FirebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the eye icon

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

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
        else if(errorCode=="auth/network-request-failed"){
          ToastAndroid.show("network error please try after some time",ToastAndroid.LONG)
        }
      });
  };

  
  // forgot password handling function

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
                  marginTop: 20,
                }}
              >
                <ArrowLeftIcon size="23" color="rgba(61, 143, 239, 1)" />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
              <Image 
                source={require('../../../App/Assets/Images/loginfigma.png')}
                style={{ width: 328, height: 158 }}  
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
              marginTop: 10, // Adjusted to avoid overlap
            }}
          >
            <View style={{ marginBottom: 10, marginTop: 20 }}>
              <Text style={{ color: 'rgba(0, 0, 0, 1)', fontWeight: 'bold', marginLeft: 16, fontFamily: 'Roboto' }}>Email Address</Text>
              <TextInput 
                style={{
                  padding: 16,
                  backgroundColor: 'lightgray',
                  color: 'gray',
                  borderRadius: 20,
                  marginBottom: 16,
                  fontFamily: 'Roboto',
                }}
                value={email}
                onChangeText={setEmail}
                placeholder='Enter Email' 
                keyboardType='email-address'
              />
              <Text style={{ color: 'black', marginLeft: 16, fontWeight: 'bold', fontFamily: 'Roboto' }}>Password</Text>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ flex: 1, position: 'relative' }}>
                  <TextInput 
                    style={{
                      padding: 16,
                      backgroundColor: 'lightgray',
                      color: 'gray',
                      borderRadius: 20,
                      fontFamily: 'Roboto',
                      width: '100%',
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
                      right: 20,
                      top: '50%',
                      transform: [{ translateY: -12 }], 
                    }}
                  >
                    <Icon
                      name={passwordVisible ? 'eye' : 'eye-off'}
                      size={24}
                      color='gray'
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity 
                onPress={handleForgotPassword}
                style={{ marginTop: -10, marginLeft: 'auto', marginRight: 16 }}
              >
                <Text style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Roboto' }}>Forgot Password?</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{
                  paddingVertical: 12,
                  backgroundColor: 'rgba(61, 143, 239, 1)',
                  borderRadius: 15,
                  alignItems: 'center',
                  marginTop: 20,
                }}
                onPress={LoginUser}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', fontFamily: 'Roboto' }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingVertical: 10, fontFamily: 'Roboto' }}>
              Or
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
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

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 40 }}>
              <Text style={{ color: 'rgba(0, 0, 0, 1)', fontWeight: '600', fontFamily: 'Roboto' }}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={{ fontWeight: 'bold', color: 'rgba(61, 143, 239, 1)', fontFamily: 'Roboto' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
