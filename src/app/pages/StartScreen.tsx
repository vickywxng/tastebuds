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
    Font.loadAsync({
      'Arvo-Regular': require('../fonts/Arvo-Regular.ttf'),
      'Arvo-Bold': require('../fonts/Arvo-Bold.ttf'),
      'Jua-Regular': require('../fonts/Jua-Regular.ttf'),
      'Lato-Bold': require('../fonts/Lato-Bold.ttf'),
      'Lato-SemiBold': require('../fonts/Lato-Semibold.ttf'),
    });
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../images/carrot_filled.png')}
        />
        <Text style={styles.title}>Let's be tastebuds!</Text>
        <Text style={styles.subtitle}>Help me help you eat healthier</Text>
        <Button style={styles.button} onPress={goToLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Button>
        <Button
          style={[styles.button, styles.signUpButton]}
          onPress={goToSignUp}
        >
          <Text style={[styles.buttonText, styles.buttonText]}>Sign Up</Text>
        </Button>
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
  logo: {
    backgroundColor: '#365E32',
    borderRadius: 100,
    width: 175,
    height: 175,
    marginBottom: 40,
  },
  title: {
    color: '#365E32',
    fontFamily: 'Arvo-Regular',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#365E32',
    fontStyle: 'italic',
  },
  button: {
    width: '90%',
    height: 55,
    marginTop: 10,
    borderRadius: 50,
    backgroundColor: '#FD9B62',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Arvo-Bold',
    fontSize: 18,
    color: '#FFF5CD',
  },
  signUpButton: {
    marginTop: 20,
  },
});

export default StartScreen;
