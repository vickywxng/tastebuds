import React from 'react';
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
import { Divide } from '@tamagui/lucide-icons';
import { Button, XStack, YStack } from 'tamagui';

type Props = {
  navigation: NavigationProp<any>;
};

const RecipeGenerator: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const { userId } = route.params as {
    userId: string;
  };

  const goToPlanner = () => {
    navigation.navigate('Planner', { userId });
  };

  const goToCollection = () => {
    navigation.navigate('Collection', { userId });
  };

  return (
    <View style={styles.container}>
      <View>
        <YStack padding={50}>
          <Text style={styles.modalTitle}>
            Ok, now what are we working with?
          </Text>
          <XStack>
            <Text>Ingredients</Text>
            <Text>include quantity (e.g. 2 eggs)</Text>
          </XStack>

          <TextInput
            style={styles.input}
            placeholder="1 gal of milk, 3 potatoes, 2 sticks of butter, etc"
          />

          <Button>
            <Ionicons name="link" size={40} color={'black'} />
            Upload an Image
          </Button>

          <Text style={styles.modalTitle}>Time</Text>

          <XStack>
            {timeButton('15 mins')}
            {timeButton('30 mins')}
            {timeButton('1 hr')}
          </XStack>

          <XStack>
            {timeButton('2 hrs')}
            {timeButton('3 hrs')}
          </XStack>

          <Text style={styles.modalTitle}>Appliances</Text>
          <XStack>
            {applianceButton('Stove')}
            {applianceButton('Oven')}
            {applianceButton('Microwave')}
          </XStack>

          <XStack>
            {applianceButton('Air Fryer')}
            {applianceButton('Rice Cooker')}
          </XStack>

          <XStack>
            <Text>Diet</Text>
            <Text>(be as specific as possible!)</Text>
          </XStack>

          <TextInput
            style={styles.input}
            placeholder="Vegeterian, vegan, keto, etc"
          />

          <Text>Complexity</Text>
          <XStack>
            {complexityButton('Easy')}
            {complexityButton('Medium')}
            {complexityButton('Hard')}
          </XStack>

          <Text>Yield</Text>
          {/* <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Breakfast" value="breakfast" />
            <Picker.Item label="Lunch" value="lunch" />
            <Picker.Item label="Dinner" value="dinner" />
            <Picker.Item label="Snacks" value="snacks" />
          </Picker> */}
        </YStack>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={goToPlanner}>
          <Ionicons name="calendar-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="create" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToCollection}>
          <Ionicons name="basket-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
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

const timeButton = (str: string) => {
  return (
    <Button>
      <Ionicons name="alarm-outline" size={40} color={'black'} />
      {str}
    </Button>
  );
};

const applianceButton = (str: string) => {
  return (
    <Button>
      <Ionicons name="construct-outline" size={40} color={'black'} />
      {str}
    </Button>
  );
};

const complexityButton = (str: string) => {
  return (
    <Button>
      <Ionicons name="star" size={40} color={'black'} />
      {str}
    </Button>
  );
};

export default RecipeGenerator;
