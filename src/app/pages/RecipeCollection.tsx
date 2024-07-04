import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { Button, YStack } from 'tamagui';

import BottomTabNavigator from '../BottomTabNavigator';

type Props = {
  navigation: NavigationProp<any>;
};

const RecipeCollection: React.FC<Props> = ({ navigation }) => {
  const goToMain = () => {
    navigation.navigate('MainPage');
  };

  const goToGenerator = () => {
    navigation.navigate('Generator');
  };

  const goToPlanner = () => {
    navigation.navigate('Planner');
  };

  return (
    <View style={styles.container}>
      <ImageBackground>
        <View></View>
      </ImageBackground>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={goToMain}>
          <Ionicons name="home-outline" size={36} color={'gray'} />
        </Button>
        <Button style={styles.button} onPress={goToGenerator}>
          <Ionicons name="create-outline" size={36} color={'gray'} />
        </Button>
        <Button style={styles.button} onPress={goToPlanner}>
          <Ionicons name="calendar-outline" size={36} color={'gray'} />
        </Button>
        <Button style={styles.button}>
          <Ionicons name="basket-outline" size={36} color={'#2294E6'} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: 100,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    marginTop: 15,
  },
});

export default RecipeCollection;
