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
import { NavigationProp, useRoute } from '@react-navigation/native';
import { Button, YStack } from 'tamagui';

type Props = {
  navigation: NavigationProp<any>;
};

const RecipePlanner: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const { userId } = route.params as {
    userId: string;
  };

  const goToGenerator = () => {
    navigation.navigate('Generator', { userId });
  };

  const goToCollection = () => {
    navigation.navigate('Collection', { userId });
  };

  return (
    <View style={styles.container}>
      <ImageBackground>
        <View></View>
      </ImageBackground>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={goToGenerator}>
          <Ionicons name="create-outline" size={40} color={'#FFF5CD'} />
        </Button>
        <Button style={styles.button}>
          <Ionicons name="calendar" size={40} color={'#FFF5CD'} />
        </Button>
        <Button style={styles.button} onPress={goToCollection}>
          <Ionicons name="basket-outline" size={40} color={'#FFF5CD'} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7D37F',
  },
  buttons: {
    backgroundColor: '#82A263',
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

export default RecipePlanner;
