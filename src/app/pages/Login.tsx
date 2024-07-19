import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore/lite';
import { Button } from 'tamagui';

import { db } from '../firebase';

type Props = {
  navigation: NavigationProp<any>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = async () => {
    try {
      const usersCollectionRef = collection(db, 'allUsers');
      const querySnapshot = await getDocs(usersCollectionRef);
      let userExists = false;

      querySnapshot.forEach((doc) => {
        if (doc.data().username == username) {
          userExists = true;
          if (doc.data().password == password) {
            navigation.navigate('Generator', { userId: doc.id });
          } else {
            Alert.alert('Incorrect password. Please try again.');
          }
        }
      });

      if (!userExists) {
        Alert.alert(
          'Username does not exist. Please check your spelling or create a new account.',
        );
      }

      console.log('Document successfully checked!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.background}>
          <View style={styles.greenCircle} />
          <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Login to your account</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#AFA26B"
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#AFA26B"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </Button>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text style={styles.signUpLink} onPress={goToSignUp}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7D37F',
  },
  greenCircle: {
    width: 650,
    height: 750,
    backgroundColor: '#365E32',
    borderRadius: 1000,
    marginTop: -300,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    maxWidth: 400,
    width: '80%',
    marginBottom: 80,
    marginTop: 80,
  },
  title: {
    color: '#E7D37F',
    fontFamily: 'Arvo-Bold',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -350,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF5CD',
    marginBottom: 180,
  },
  input: {
    width: '100%',
    height: 55,
    color: 'black',
    backgroundColor: '#FFF5CD',
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#FD9B62',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: 'Arvo-Bold',
    fontSize: 18,
    color: '#fff',
  },
  signUpText: {
    marginTop: 10,
    fontSize: 16,
    color: '#365E32',
  },
  signUpLink: {
    color: '#365E32',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
