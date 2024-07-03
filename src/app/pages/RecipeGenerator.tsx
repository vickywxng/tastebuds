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
import { NavigationProp } from '@react-navigation/native';
import { Button, YStack } from 'tamagui';

import BottomTabNavigator from '../BottomTabNavigator';

type Props = {
  navigation: NavigationProp<any>;
};

const RecipeGenerator: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <ImageBackground>
        <View></View>
      </ImageBackground>
      {/* <View style={styles.tab}>
        <BottomTabNavigator />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default RecipeGenerator;
