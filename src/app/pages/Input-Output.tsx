import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { Button, YStack } from 'tamagui';

type Props = {
  navigation: NavigationProp<any>;
};

const InputOutput: React.FC<Props> = ({ navigation }) => {
  const [infoArray, setInfoArray] = useState<string[]>([]);
  const makeInput = (
    cookTime: string,
    appliance: string,
    diet: string,
    complexity: string,
    quantity: string,
    ingredients: string,
  ) => {
    const input = `Generate me a recipe with these constraints: ${cookTime} cooking time, cooked on ${appliance}, diet ${diet}, ${complexity}, ${quantity} yield. The ingredients available are ${ingredients}. I need the response to be generated in this way: Title: (title of dish) Description: (description of dish) Ingredients: (list of all ingredients separated by a comma) Directions: (list of cooking directions separated by a comma) Calories: (calorie amount)`;
    return input;
  };

  const organizeOutput = (givenOutput: string) => {
    let output =
      'Title: Creamy Potato Soup Description: A comforting and creamy potato soup made with simple ingredients, perfect for a quick and satisfying meal. Ingredients: 3 potatoes, 2 sticks of butter, 1 gal of milk Directions: Peel and dice the potatoes. In a large pot, melt the butter over medium heat. Add the diced potatoes and sauté for 2-3 minutes. Pour in the milk and bring to a gentle simmer. Cook for about 10 minutes or until the potatoes are tender. Use a potato masher or immersion blender to blend some of the potatoes to thicken the soup while leaving some chunks for texture. Season with salt and pepper to taste. Serve hot. Calories: Approximately 350 calories';
    const wordsToSplitBy = [
      'Title: ',
      'Description: ',
      'Ingredients: ',
      'Directions: ',
      'Calories: ',
    ];
    const pattern = wordsToSplitBy.join('|');
    const array = output.split(new RegExp(pattern, 'i'));
    setInfoArray(array);
  };

  useEffect(() => {
    organizeOutput('');
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'black', margin: 20, marginTop: 100 }}>
          {infoArray[1]}
        </Text>
        <Text style={{ color: 'black', margin: 20 }}>{infoArray[2]}</Text>
        <Text style={{ color: 'black', margin: 20 }}>{infoArray[3]}</Text>
        <Text style={{ color: 'black', margin: 20 }}>{infoArray[4]}</Text>
        <Text style={{ color: 'black', margin: 20 }}>{infoArray[5]}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="calendar-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="create" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="basket-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#365E32',
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
    paddingBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
  },
});

export default InputOutput;
