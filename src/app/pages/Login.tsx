import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Button, YStack } from 'tamagui';

type Props = {
  navigation: NavigationProp<any>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login button pressed');
  };

  return (
    <YStack style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back!</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
        />
        <Button style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </Button>
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text style={styles.signUpLink} onPress={goToSignUp}>
            Sign Up
          </Text>
        </Text>
      </View>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Background color of the screen
  },
  content: {
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue', // Example button background color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // Example button text color
  },
  signUpText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  signUpLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
