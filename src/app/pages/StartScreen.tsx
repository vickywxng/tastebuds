import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import * as Font from 'expo-font';
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

  React.useEffect(() => {
    // Load the custom font when the component mounts
    Font.loadAsync({
      'Arvo-Regular': require('../fonts/Arvo-Regular.ttf'),
      'Arvo-Bold': require('../fonts/Arvo-Bold.ttf'),
      'Jua-Regular': require('../fonts/Jua-Regular.ttf'),
    });
  }, []);

  return (
    <ImageBackground
      source={require('../images/food_background_tile.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../images/carrot_filled.png')}
        />
        <Text style={styles.title}>Welcome to [App Name]!</Text>
        <Text style={styles.subtitle}>
          Plan your meals, find easy recipes and more!
        </Text>
        <Button style={styles.button} onPress={goToLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Button>
        <Button
          style={[styles.button, styles.signUpButton]}
          onPress={goToSignUp}
        >
          <Text style={[styles.buttonText, styles.signUpButtonText]}>
            Sign Up
          </Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    maxWidth: 400,
    width: '80%',
    marginBottom: 80,
    marginTop: 80,
  },
  logo: {
    marginLeft: 20,
    width: 230,
    height: 230,
  },
  title: {
    color: '#BC301D',
    fontFamily: 'Jua',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#000000',
  },
  button: {
    width: '100%',
    height: 55,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#E63922',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Jua-Regular',
    fontSize: 32,
    color: '#FFFFFF',
  },
  signUpButtonText: {
    color: '#E63922',
  },
  signUpButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderColor: '#E63922',
    borderWidth: 2.5,
  },
});

export default StartScreen;
