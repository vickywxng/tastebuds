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
import { Button, XStack, YStack } from 'tamagui';

type Props = {
  navigation: NavigationProp<any>;
};

const RecipeGenerator: React.FC<Props> = ({ navigation }) => {
  const goToPlanner = () => {
    navigation.navigate('Planner');
  };

  const goToCollection = () => {
    navigation.navigate('Collection');
  };

  return (
    <View style={styles.container}>
      <View>
          <YStack padding={100}>
            <Text style={styles.modalTitle}>Ok, now what are we working with?</Text>
            <XStack>
              <Text>Ingredients</Text>
              <Text>include quantity (e.g. 2 eggs)</Text>
            </XStack>

            <TextInput
              style={styles.input}
              placeholder="1 gal of milk, 3 potatoes, 2 sticks of butter, etc"
            />

          </YStack>
        </View>
      <View style={styles.buttons}>
        <Button style={styles.button}>
          <Ionicons name="create" size={40} color={'#FFF5CD'} />
        </Button>
        <Button style={styles.button} onPress={goToPlanner}>
          <Ionicons name="calendar-outline" size={40} color={'#FFF5CD'} />
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
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#365E32',
  }, 
  input: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default RecipeGenerator;
