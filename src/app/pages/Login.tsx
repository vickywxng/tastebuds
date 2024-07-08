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

      querySnapshot.forEach((doc) => {
        if (doc.data().username == username || doc.data().email == username) {
          if (doc.data().password == password) {
            navigation.navigate('MainPage');
          } else {
            Alert.alert('Incorrect password. Please try again.');
          }
        }
      });

      Alert.alert(
        'Username does not exist. Please check your spelling or create a new account.',
      );

      console.log('Document successfully checked!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../images/food_background_tile.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Button style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Button>
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text style={styles.signUpLink} onPress={goToSignUp}>
            Sign Up
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
    fontFamily: 'Jua',
    fontSize: 24,
    color: '#fff',
  },
  signUpText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  signUpLink: {
    color: '#BC301D',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
