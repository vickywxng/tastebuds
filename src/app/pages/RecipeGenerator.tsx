import React, { useState } from 'react';
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
import { NavigationProp } from '@react-navigation/native';
import { Button, XStack, YStack } from 'tamagui';
import { Divide } from '@tamagui/lucide-icons';


type Props = {
  navigation: NavigationProp<any>;
};


const RecipeGenerator: React.FC<Props> = ({ navigation }) => {
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);
  
  const goToPlanner = () => {
    navigation.navigate('Planner');
  };

  const goToCollection = () => {
    navigation.navigate('Collection');
  };

  const handleTimeSelected = (mins: number) => {
    setSelectedMinutes(mins);
  };

  const timeButton = (str: string, mins: number) => {
    return (
      <Button
        style={[
          styles.preferenceButton,
          selectedMinutes === mins ? styles.selectedPreferenceButton : {}
        ]}
        onPress={() => handleTimeSelected(mins)}
      >
        <Ionicons name="alarm-outline" size={20} color={'#FFF5CD'} />
        <Text style={{ marginLeft: 5, color: '#FFF5CD' }}>{str}</Text>
      </Button>
    );
  };
  
  const applianceButton = (str: string) => {
    return (
      <Button style={styles.preferenceButton}>
        <Ionicons name="construct-outline" size={20} color={'#FFF5CD'} />
        <Text style={{ marginLeft: 5, color: '#FFF5CD' }}>{str}</Text>
      </Button>
    );
  };
  
  const complexityButton = (str: string) => {
    return (
      <Button style={styles.preferenceButton}>
        <Ionicons name="star" size={20} color={'#FFF5CD'} />
        <Text style={{ marginLeft: 5, color: '#FFF5CD' }}>{str}</Text>
      </Button>
    );
  };
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
      <View>
          <YStack padding={40}>
            <View style={{ height: 50 }} />
            <Text style={styles.modalTitle}>Ok, now what are we working with?</Text>
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
            />

            <TouchableOpacity style={styles.uploadImageButton}>
              <Ionicons name="link" size={20} color={'#FFF5CD'} />
              <Text style={styles.uploadImageText}>Upload an Image</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitleSmaller}>Time</Text>

            <XStack>
              {timeButton("15 mins", 15)}
              {timeButton("30 mins", 30)}
              {timeButton("1 hr", 60)}
            </XStack>

            <XStack>
              {timeButton("2 hrs", 120)}
              {timeButton("3 hrs", 180)}
            </XStack>

            
            <Text style={styles.modalTitleSmaller}>Appliances</Text>
            <XStack>
              {applianceButton("Stove")}
              {applianceButton("Oven")}
              {applianceButton("Microwave")}
            </XStack>

            <XStack>
              {applianceButton("Air Fryer")}
              {applianceButton("Rice Cooker")}
            </XStack>
            
            <XStack style={styles.row}>
              <Text style={styles.modalTitleSmaller}>Diet</Text>
              <View style={{ width: 5 }} />
              <Text style={styles.modalText}>(be as specific as possible!)</Text>
            </XStack>

            <TextInput
              style={styles.input}
              placeholder="Vegeterian, vegan, keto, etc"
            />

            <Text style={styles.modalTitleSmaller}>Complexity</Text>
            <XStack>
              {complexityButton("Easy")}
              {complexityButton("Medium")}
              {complexityButton("Hard")}
            </XStack>

            <Text style={styles.modalTitleSmaller}>Yield</Text>
            

          <Button>Generate Recipe</Button>
            
          </YStack>
        </View>
      </ScrollView>

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
    backgroundColor: '#365E32',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline', 
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
    fontFamily: "Arvo-Bold",
    marginBottom: 10,
    color: '#E7D37F',
  }, 
  modalTitleSmaller: {
    fontSize: 18,
    fontFamily: "Arvo-Bold",
    marginBottom: 10,
    color: '#E7D37F',
  }, 
  modalText: {
    fontSize: 12,
    fontFamily: "Lato",
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedPreferenceButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,  
    marginHorizontal: 5,   
    marginBottom: 10,      
    backgroundColor: '#FD9B62',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor:'#FFF5CD',
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
    borderColor:'#FFF5CD',
    borderWidth: 2,
    borderRadius: 20,
  },
});





export default RecipeGenerator;
