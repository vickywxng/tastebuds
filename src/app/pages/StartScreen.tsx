import React from 'react';
import { Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Button, Image, Paragraph, YStack } from 'tamagui';

type Props = {
  navigation: NavigationProp<any>; // Adjust 'any' if you know the specific type of navigation prop
};

const StartScreen: React.FC<Props> = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate('Test'); // Navigate to the 'Login' screen
  };

  const goToSignUp = () => {
    navigation.navigate('Test'); // Navigate to the 'SignUp' screen
  };

  return (
    <YStack>
      <View id="start-screen" style={{ backgroundColor: '#fff' }}>
        <View id="title">
          <Image
            source={{
              uri: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
            }}
            style={styles.image}
          />
          <Text
            id="sc1"
            style={{ textAlign: 'center', marginTop: 350, fontSize: 25 }}
          >
            App Name
          </Text>
        </View>
        <Button id="login" style={styles.button1} onPress={goToLogin}>
          <Text style={styles.font}>Login</Text>
        </Button>
        <Button id="signup" style={styles.button2} onPress={goToSignUp}>
          <Text style={styles.font}>Sign Up</Text>
        </Button>
      </View>
    </YStack>
  );
};

const styles = {
  button1: {
    margin: 75,
    marginTop: 65,
    blockSize: 55,
  },

  button2: {
    margin: 75,
    marginTop: -50,
    marginBottom: 1000,
    blockSize: 55,
  },

  font: {
    fontSize: 30,
  },

  image: { marginTop: 10, width: 50 },
};

export default StartScreen;
