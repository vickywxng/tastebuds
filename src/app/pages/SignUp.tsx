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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore/lite';
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
        if (doc.data().username === username) {
          userExists = true;
        }
        if (doc.data().email === email) {
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
        const docRef = await addDoc(usersCollectionRef, {
          username: username,
          password: password,
          email: email,
        });

        // Reference to collections and planner subcollections
        const collectionsRef = collection(
          usersCollectionRef,
          docRef.id,
          'collections',
        );
        const plannerRef = collection(usersCollectionRef, docRef.id, 'planner');

        // Set up 'collections' subcollection
        const historyRef = doc(collectionsRef, 'History');
        const favoritesRef = doc(collectionsRef, 'Favorites');
        await Promise.all([setDoc(historyRef, {}), setDoc(favoritesRef, {})]);

        // Set up 'planner' subcollection
        const dayRefs = [
          'Day 1',
          'Day 2',
          'Day 3',
          'Day 4',
          'Day 5',
          'Day 6',
          'Day 7',
        ];
        const dayDocRefs = dayRefs.map((day) => doc(plannerRef, day));
        await Promise.all(dayDocRefs.map((docRef) => setDoc(docRef, {})));

        // Navigate to the next screen after all operations are completed
        navigation.navigate('Registered', { userId: docRef.id });
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.greenCircle} />
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create your account now!</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#AFA26B"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#AFA26B"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#AFA26B"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#AFA26B"
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
    </View>
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
    marginTop: -400,
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
    marginTop: -300,
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
  loginText: {
    marginTop: 10,
    fontSize: 16,
    color: '#365E32',
  },
  loginLink: {
    color: '#365E32',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
