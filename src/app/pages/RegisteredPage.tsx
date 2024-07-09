import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { Button } from 'tamagui';

type Props = {
  navigation: NavigationProp<any>;
};

const MainPage: React.FC<Props> = ({ navigation }) => {
  const goToGenerator = () => {
    navigation.navigate('Generator');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Yay you're all registered!</Text>
      <Button style={styles.button} onPress={goToGenerator}>
        <Text style={styles.buttonText}>Let's get started</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#365E32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFF5CD',
    fontSize: 36,
    fontFamily: 'Arvo-Bold',
    textAlign: 'center',
    margin: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FD9B62',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 60,
  },
  buttonText: {
    color: '#FFF5CD',
    fontFamily: 'Arvo-Bold',
    fontSize: 16,
  },
});

export default MainPage;
