import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Button, Image } from 'tamagui';

type Props = {
  navigation: NavigationProp<any>;
};

const StartScreen: React.FC<Props> = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ImageBackground
      //source={require('./<place image here>.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./placeholder.jpg')} />
        <Text style={styles.title}>Welcome to [App Name]</Text>
        <Text style={styles.subtitle}>Where [App Description] goes here</Text>
        <Button style={styles.button} onPress={goToLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Button>
        <Button
          style={[styles.button, styles.signUpButton]}
          onPress={goToSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    borderRadius: 10,
    maxWidth: 400,
    width: '80%',
    marginBottom: 100, // Adjust based on your design needs
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60, // Rounded image
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666', // Dark gray text
  },
  button: {
    width: '100%',
    height: 55,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF', // White button text color
  },
  signUpButton: {
    marginTop: 20,
    backgroundColor: '#444', // Dark gray button background color for Sign Up
  },
});

export default StartScreen;
