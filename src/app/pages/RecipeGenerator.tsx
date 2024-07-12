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
import { NavigationProp } from '@react-navigation/native';
import { Button, XStack, YStack } from 'tamagui';
import { Divide } from '@tamagui/lucide-icons';


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
      <ScrollView style={styles.container}>
      <View>
          <YStack padding={40}>
            <View style={{ height: 50 }} />
            <Text style={styles.modalTitle}>Ok, now what are we working with?</Text>
            <View style={{ height: 20 }} />
            <XStack style={{ alignItems: 'center' }}>
              <Text style={styles.modalTitleSmaller}>Ingredients</Text>
              <View style={{ width: 10 }} />
              <Text style={styles.modalText}>include quantity (e.g. 2 eggs)</Text>
            </XStack>

            <TextInput
              style={styles.input}
              placeholder="1 gal of milk, 3 potatoes, 2 sticks of butter, etc"
              placeholderTextColor="#AFA26B"
            />

            <TouchableOpacity style={styles.uploadImageButton} onPress={() => { /* your handler here */ }}>
              <View style={styles.iconContainer}>
                <Ionicons name="link" size={20} color={'black'} />
                <View style={{ width: 10 }} />
                <Text style={styles.modalText}>Upload an Image</Text>
              </View>
            </TouchableOpacity>


            <Text style={styles.modalTitle}>Time</Text>

            <XStack>
              {timeButton("15 mins")}
              {timeButton("30 mins")}
              {timeButton("1 hr")}
            </XStack>

            <XStack>
              {timeButton("2 hrs")}
              {timeButton("3 hrs")}
            </XStack>

            
            <Text style={styles.modalTitle}>Appliances</Text>
            <XStack>
              {applianceButton("Stove")}
              {applianceButton("Oven")}
              {applianceButton("Microwave")}
            </XStack>

            <XStack>
              {applianceButton("Air Fryer")}
              {applianceButton("Rice Cooker")}
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
              {complexityButton("Easy")}
              {complexityButton("Medium")}
              {complexityButton("Hard")}
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
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
    width: 200,
    marginBottom: 5,
    marginTop: 0,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  selectedPreferenceButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,  
    marginHorizontal: 5,   
    marginBottom: 10,      
    backgroundColor: '#82A263',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  preferenceButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,  
    marginHorizontal: 5,   
    marginBottom: 10,      
    backgroundColor: '#82A263',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
});


const timeButton = (str: string) => {
  return (
    <Button style={styles.preferenceButton}>
      <Ionicons name="alarm-outline" size={20} color={'black'} />
      {str}
    </Button>
  );
};

const applianceButton = (str: string) => {
  return (
    <Button style={styles.preferenceButton}>
      <Ionicons name="construct-outline" size={20} color={'black'} />
      {str}
    </Button>
  );
};

const complexityButton = (str: string) => {
  return (
    <Button style={styles.preferenceButton}>
      <Ionicons name="star" size={20} color={'black'} />
      {str}
    </Button>
  );
};

export default RecipeGenerator;
