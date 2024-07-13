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
import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { Divide } from '@tamagui/lucide-icons';
import { Button, XStack, YStack } from 'tamagui';
// import { LuEggFried } from "react-icons/lu";
// import { FaBeer } from "@react-icons/all-files/fa/FaBeer";

type Props = {
  navigation: NavigationProp<any>;
};

const RecipeGenerator: React.FC<Props> = ({ navigation }) => {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);
  const [applianceArray, setApplianceArray] = useState<string[]>([]);
  const [complexityLevel, setComplexityLevel] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string>('');
  const [diet, setDiet] = useState<string>('');
  const [showError, setShowError] = useState(false);

  const route = useRoute();
  const { userId } = route.params as {
    userId: string;
  };

  useEffect(() => {
    resetState();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      resetState();
    }, [])
  );

  const resetState = () => {
    setSelectedMeal(null);
    setSelectedMinutes(null);
    setApplianceArray([]);
    setComplexityLevel(null);
    setIngredients('');
    setDiet('');
    setShowError(false);
  };



  const mealButton = (meal: string) => {
    let icon = null; 

    if (meal === "Breakfast") {
      icon = <MaterialCommunityIcons name="egg-fried" size={40} color={'#FFF5CD'} />;
    } else if (meal === "Lunch") {
      icon = <MaterialCommunityIcons name="food" size={35} color={'#FFF5CD'} />;
    } else if (meal === "Dinner") {
      icon = <MaterialIcons name="dinner-dining" size={35} color={'#FFF5CD'} />;
    } else {
      icon = <MaterialCommunityIcons name="food-apple-outline" size={35} color={'#FFF5CD'} />;
    }
  
    return (
      <Button
        style={styles.mealButton}
        onPress={() => setSelectedMeal(meal)}
      >
        {icon} {/* Render the determined icon */}
        <Text style={[styles.modalTitleSmaller, { marginBottom: 0 }, {color: '#FFF5CD'}]}>{meal}</Text>
      </Button>
    );
  };

  


  const goToPlanner = () => {
    navigation.navigate('Planner', { userId });
  };

  const goToCollection = () => {
    navigation.navigate('Collection', { userId });
  };

  const handleTimeSelected = (mins: number) => {
    setSelectedMinutes(mins);
  };

  const handleComplexitySelected = (complexity: string) => {
    setComplexityLevel(complexity);
  };

  const generateRecipe = () => {
    if (
      !selectedMinutes ||
      applianceArray.length === 0 ||
      !complexityLevel ||
      !diet ||
      !ingredients
    ) {
      setShowError(true);
    } else {
      setShowError(false);
      console.log(selectedMinutes);
      console.log(applianceArray);
      console.log(complexityLevel);
      console.log(ingredients);
      console.log(diet);
      // Add logic to generate recipe here
    }
  };

  const timeButton = (str: string, mins: number) => {
    return (
      <Button
        style={[
          styles.preferenceButton,
          selectedMinutes === mins ? styles.selectedPreferenceButton : {},
        ]}
        onPress={() => handleTimeSelected(mins)}
      >
        <Ionicons name="alarm-outline" size={20} color={'#FFF5CD'} />
        <Text style={{ marginLeft: 5, color: '#FFF5CD' }}>{str}</Text>
      </Button>
    );
  };

  const handleAppliancesSelected = (appliance: string) => {
    if (applianceArray.includes(appliance)) {
      const updatedArray = applianceArray.filter((item) => item !== appliance);
      setApplianceArray(updatedArray);
    } else {
      const updatedApplianceArray = [...applianceArray, appliance];
      setApplianceArray(updatedApplianceArray);
    }
  };

  const applianceButton = (appliance: string) => {
    const isSelected = applianceArray.includes(appliance);

    return (
      <Button
        style={[
          styles.preferenceButton,
          isSelected ? styles.selectedPreferenceButton : {},
        ]}
        onPress={() => handleAppliancesSelected(appliance)}
      >
        <Ionicons name="construct-outline" size={20} color={'#FFF5CD'} />
        <Text style={{ marginLeft: 5, color: '#FFF5CD' }}>{appliance}</Text>
      </Button>
    );
  };

  const complexityButton = (complexity: string) => {
    return (
      <Button
        style={[
          styles.preferenceButton,
          complexityLevel === complexity ? styles.selectedPreferenceButton : {},
        ]}
        onPress={() => handleComplexitySelected(complexity)}
      >
        <Ionicons name="star" size={20} color={'#FFF5CD'} />
        <Text style={{ marginLeft: 5, color: '#FFF5CD' }}>{complexity}</Text>
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{ padding: 40 }}>
          <View style={{ height: 50 }} />

          {!selectedMeal && (
            <>
            <View style={{ height: 150 }} />
              <Text style={[styles.modalTitle, { textAlign: 'center' }]}>
              What are we tryna chef up today? 
              </Text>
              <View style={{ height: 50 }} />
              <YStack>
                {mealButton('Breakfast')}
                {mealButton('Lunch')}
                {mealButton('Dinner')}
                {mealButton('Snack')}
              </YStack>
            </>
          )}

          {selectedMeal &&(
            <>
              <Text style={styles.modalTitle}>
                Ok, now what are we working with?
              </Text>
              <View style={{ height: 20 }} />

              <XStack style={styles.row}>
                <Text style={styles.modalTitleSmaller}>Ingredients</Text>
                <View style={{ width: 7 }} />
                <Text style={styles.modalText}>include quantity (e.g. 2 eggs)</Text>
              </XStack>

              <TextInput
                style={styles.input}
                placeholder="1 gal of milk, 3 potatoes, 2 sticks of butter, etc"
                placeholderTextColor="#AFA26B"
                value={ingredients}
                onChangeText={(text) => setIngredients(text)}
              />

              <TouchableOpacity style={styles.uploadImageButton}>
                <Ionicons name="link" size={20} color={'#FFF5CD'} />
                <Text style={styles.uploadImageText}>Upload an Image</Text>
              </TouchableOpacity>

              <View style={{ height: 20 }} />
              <Text style={styles.modalTitleSmaller}>Time</Text>

              <XStack>
                {timeButton('15 mins', 15)}
                {timeButton('30 mins', 30)}
                {timeButton('1 hr', 60)}
              </XStack>

              <XStack>
                {timeButton('2 hrs', 120)}
                {timeButton('3 hrs', 180)}
              </XStack>

              <View style={{ height: 20 }} />
              <Text style={styles.modalTitleSmaller}>Appliances</Text>
              <XStack>
                {applianceButton('Stove')}
                {applianceButton('Oven')}
                {applianceButton('Microwave')}
              </XStack>

              <XStack>
                {applianceButton('Air Fryer')}
                {applianceButton('Rice Cooker')}
              </XStack>

              <View style={{ height: 20 }} />
              <XStack style={styles.row}>
                <Text style={styles.modalTitleSmaller}>Diet</Text>
                <View style={{ width: 5 }} />
                <Text style={styles.modalText}>(be as specific as possible!)</Text>
              </XStack>

              <TextInput
                style={styles.input}
                placeholder="Vegeterian, vegan, keto, etc"
                value={diet}
                onChangeText={(text) => setDiet(text)}
              />

              <View style={{ height: 20 }} />
              <Text style={styles.modalTitleSmaller}>Complexity</Text>
              <XStack>
                {complexityButton('Easy')}
                {complexityButton('Medium')}
                {complexityButton('Hard')}
              </XStack>

              <View style={{ height: 20 }} />
              <Text style={styles.modalTitleSmaller}>Yield</Text>

              <View style={{ height: 20 }} />
              <Button
                style={styles.recipeGeneratorButton}
                onPress={() => generateRecipe()}
              >
                <Text style={[styles.modalTitleSmaller, { marginBottom: 0 }]}>
                  Generate Recipe
                </Text>
              </Button>
              <View
                style={[
                  styles.errorMessageContainer,
                  { height: showError ? 40 : 0 },
                ]}
              >
                <FontAwesome name="warning" size={20} color={'#FD9B62'} />
                
                {/* <Ionicons name="alert-outline" size={20} color={'#FD9B62'} /> */}
                <Text style={styles.errorMessageText}>
                  Make sure to fill out all of the sections.
                </Text>
              </View>
            </>
          )}  
          
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.buttons}>
        <Button style={styles.button} onPress={goToPlanner}>
          <Ionicons name="calendar-outline" size={40} color={'#FFF5CD'} />
        </Button>
        <Button style={styles.button}>
          <Ionicons name="create" size={40} color={'#FFF5CD'} />
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
    backgroundColor: '#365E32',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  buttons: {
    backgroundColor: '#82A263',
    flexDirection: 'row',
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Arvo-Bold',
    marginBottom: 10,
    color: '#E7D37F',
  },
  modalTitleSmaller: {
    fontSize: 18,
    fontFamily: 'Arvo-Bold',
    marginBottom: 10,
    color: '#E7D37F',
  },
  modalText: {
    fontSize: 12,
    fontFamily: 'Lato',
    marginBottom: 10,
    color: '#FFF5CD',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF5CD',
    padding: 10,
    marginBottom: 5,
    borderRadius: 9,
  },
  uploadImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
    marginBottom: 5,
  },
  uploadImageText: {
    marginLeft: 5,
    color: '#FFF5CD',
  },
  selectedPreferenceButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: '#AFA26B',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FFF5CD',
    borderWidth: 2,
    borderRadius: 20,
  },
  preferenceButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FFF5CD',
    borderWidth: 2,
    borderRadius: 20,
  },
  recipeGeneratorButton: {
    backgroundColor: '#FD9B62',
    paddingHorizontal: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  errorMessageText: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'Lato-bold',
    color: '#FD9B62',
    textAlign: 'center',
  }, 
  mealButton: {
    backgroundColor: '#FD9B62',
    paddingHorizontal: 10,
    marginBottom: 10, 
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default RecipeGenerator;
