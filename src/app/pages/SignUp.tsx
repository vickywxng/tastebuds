import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Button, YStack } from 'tamagui';

type Props = {
  navigation: NavigationProp<any>;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    // Implement sign-up logic here
    console.log('Sign Up button pressed');
  };

  return (
    <YStack style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
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
  loginText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
