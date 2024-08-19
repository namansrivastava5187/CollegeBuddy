import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ToastAndroid, KeyboardAvoidingView, Platform, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../App/Backend/configs/FirebaseConfig";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import {provider} from '../../Backend/configs/FirebaseConfig';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let [fontsLoaded] = useFonts({
    'InterBold': require('./Fonts/Inter_18pt-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


// creating account for email
  const OnCreateAccount = () => {
    if (!fullname || !username || !email || !password || !confirmPassword) {
      ToastAndroid.show("Please enter all details", ToastAndroid.BOTTOM);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.BOTTOM);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.replace("Homep");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        if (errorCode === "auth/email-already-in-use") {
          ToastAndroid.show("Email already exists", ToastAndroid.LONG);
        }
      });
  };

  //creating account for google
  const OnCreateAccountGoogle = async () => {
    try {
      // Get the user's ID token
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
  
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      // Sign in the user with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
  
      // User successfully signed in
      console.log('User Info:', userCredential.user);
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };
  
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Image 
              source={require("../../../App/Assets/Images/login.png")} 
              style={styles.logoImage}
            />
            <Text style={styles.headerText}>
              Register Account {'\n'}To  
              <Text style={styles.headerTextAccent}> CollegeBuddy</Text>
            </Text>
            <Text style={styles.subHeaderText}>
              Hello Buddy, register to continue
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput 
              style={styles.input}
              value={fullname}
              onChangeText={setFullname}
              placeholder='Enter Full Name'
              keyboardType='default'
            />
            <Text style={styles.label}>Username</Text>
            <TextInput 
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder='Enter Username'
              keyboardType='default'
            />
            <Text style={styles.label}>Email Address</Text>
            <TextInput 
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder='Enter Email'
              keyboardType='email-address'
            />
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={styles.input}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholder='Enter Password'
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#3D8FEF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={styles.input}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder='Confirm Password'
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                <Icon name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} color="#3D8FEF" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={OnCreateAccount}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>Or</Text>
          </View>
          
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}
              onPress={OnCreateAccountGoogle}>
              <Image 
                source={require('../../../App/Assets/Images/google.png')}
                style={styles.socialIcon} 
                resizeMode="contain"
                
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { marginHorizontal: width * 0.05 }]}>
              <Image 
                source={require('../../../App/Assets/Images/facebook.png')}
                style={styles.socialIcon} 
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  headerContainer: {
    alignItems: 'flex-start',
    marginTop: height * 0.03,
    marginHorizontal: width * 0.08,
  },
  logoImage: {
    height: width * 0.2,
    width: width * 0.2,
  },
  headerText: {
    marginTop: height * 0.02,
    color: '#000000',
    fontSize: width * 0.06,
    fontFamily: 'InterBold',
  },
  headerTextAccent: {
    color: '#325AFF',
    fontFamily: 'InterBold',
  },
  subHeaderText: {
    marginTop: -height * 0.01,
    color: 'grey',
    fontFamily: 'InterBold',
  },
  formContainer: {
    flex: 1,
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  label: {
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: height * 0.005,
    marginHorizontal: width * 0.04,
    fontFamily: 'InterBold',
  },
  input: {
    padding: height * 0.015,
    borderColor: 'lightgray',
    borderWidth: 1,
    color: 'black',
    borderRadius: 5,
    height: height * 0.06,
    width: width * 0.8,
    marginHorizontal: width * 0.04,
    backgroundColor: 'transparent',
    fontFamily: 'InterBold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  eyeIcon: {
    position: 'absolute',
    right: width * 0.1,
    top: '50%',
    transform: [{ translateY: -height * 0.015 }],
  },
  registerButton: {
    paddingVertical: height * 0.014,
    backgroundColor: '#3D8FEF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: height * 0.015,
    width: width * 0.75,
    marginHorizontal: width * 0.055,
  },
  registerButtonText: {
    fontSize: width * 0.045,
    color: '#000000',
    fontFamily: 'InterBold',
  },
  orText: {
    fontSize: width * 0.045,
    textAlign: 'center',
    paddingVertical: height * 0.02,
    fontFamily: 'InterBold',
    marginTop: height * -0.015,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height * 0.002,
  },
  
  socialIcon: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: width * 0.035,
    marginHorizontal:width*0.020,
    marginLeft:width*0.03,
    marginRight:width*-0.03,
    marginTop: height * -0.015,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.05,
    marginTop: height * 0.009,
  },
  footerText: {
    fontSize: width * 0.04,
    fontFamily: 'InterBold',
  },
  loginButton: {
    marginLeft: width * 0.02,
  },
  loginButtonText: {
    color: '#3D8FEF',
    fontSize: width * 0.04,
    fontFamily: 'InterBold',
  },
});
