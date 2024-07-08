import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { Button } from 'tamagui';

import { db } from '../firebase';

type Props = {
  navigation: NavigationProp<any>;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    try {
      const usersCollectionRef = collection(db, 'allUsers');
      const querySnapshot = await getDocs(usersCollectionRef);
      let userExists = false;
      let emailExists = false;

      querySnapshot.forEach((doc) => {
        if (doc.data().username == username) {
          userExists = true;
        }
        if (doc.data().email == email) {
          emailExists = true;
        }
      });
      if (userExists) {
        Alert.alert('Username already exists. Log into your account.');
      } else if (emailExists) {
        Alert.alert(
          'Email already has a username attached. Log into your account.',
        );
      } else {
        await addDoc(usersCollectionRef, {
          username: username,
          password: password,
          email: email,
        });
        navigation.navigate('MainPage');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../images/food_background_tile.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Button style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={goToLogin}>
            Log In
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    maxWidth: 400,
    width: '80%',
    marginBottom: 80,
    marginTop: 80,
  },
  title: {
    color: '#BC301D',
    fontFamily: 'Jua',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 50,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    borderWidth: 2.5,
    borderColor: '#E63922',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#E63922',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  loginText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  loginLink: {
    color: '#BC301D',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
