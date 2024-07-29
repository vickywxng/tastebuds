import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { NavigationProp, useRoute } from '@react-navigation/native';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';
import { Button, XStack } from 'tamagui';

import { db } from '../firebase';

type Props = {
  navigation: NavigationProp<any>;
};

type CheckedItems = {
  [key: string]: boolean;
};

const InfoPage: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const { userId, dayName, curRecipe } = route.params as {
    userId: string;
    dayName: string;
    curRecipe: string;
  };
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<String>('');
  const [genInfo, setGenInfo] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [directions, setDirections] = useState<string[]>([]);
  const [showCalendarPopUp, setShowCalendarPopUp] = useState<boolean | null>(
    null,
  );
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [showCollectionPopUp, setShowCollectionPopUp] = useState<
    boolean | null
  >(null);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [collectionSelected, setCollectionSelected] = useState('');

  useEffect(() => {
    console.log(curRecipe);
    const fetchRecipes = async () => {
      try {
        const curDoc = doc(
          db,
          `allUsers/${userId}/planner/${dayName}/Recipes/${curRecipe}`,
        );
        const docSnap = await getDoc(curDoc);

        if (docSnap.exists()) {
          setTitle(docSnap.data().Title.trim());
          setDescription(docSnap.data().Description.trim());
          setGenInfo([
            docSnap.data().Info['Servings'],
            docSnap.data().Info['Time'],
            docSnap.data().Info['Complexity'],
            docSnap.data().Info['Calories'],
            docSnap.data().Info['Meal'],
          ]);
          setIngredients(docSnap.data().Ingredients);
          setDirections(docSnap.data().Directions);
        }
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchRecipes();
  }, []);

  const goToGenerator = () => {
    navigation.navigate('Generator', { userId });
  };

  const goToPlanner = () => {
    navigation.navigate('Planner', { userId });
  };

  const goToCollection = () => {
    navigation.navigate('Collection', { userId });
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Feather
          name="chevron-left"
          size={36}
          color={'#FFF5CD'}
          onPress={goBack}
          style={styles.arrow}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desctiption}>{description}</Text>
          <View style={styles.infoTitles}>
            <Text style={styles.itstyle}>Servings</Text>
            <Text style={styles.itstyle}>Time</Text>
            <Text style={styles.itstyle}>Complexity</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.istyle}>{genInfo[0]}</Text>
            <Text style={styles.istyle}>{genInfo[1]}</Text>
            <Text style={styles.istyle}>{genInfo[2]}</Text>
          </View>
          <Text style={styles.ingredientsTitle}>Ingredients</Text>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
          <Text style={styles.directionsTitle}>Directions</Text>
          {directions.map((direction, index) => (
            <View key={index} style={styles.orderedItem}>
              <Text style={styles.orderedNumber}>{index + 1}.</Text>
              <Text style={styles.directionText}>{direction}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={goToPlanner}>
          <Ionicons name="calendar" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToGenerator}>
          <Ionicons name="create-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons
            name="basket-outline"
            size={40}
            color={'#FFF5CD'}
            onPress={goToCollection}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const neededPadding = height / 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#365E32',
    fontFamily: 'Arvo-Bold',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: neededPadding,
  },
  content: {
    padding: 45,
    fontFamily: 'Arvo-Bold',
  },
  arrow: {
    marginTop: 100,
    borderWidth: 0,
    marginLeft: 30,
    fontFamily: 'Arvo-Bold',
  },
  title: {
    color: '#E7D37F',
    fontSize: 29,
    fontFamily: 'Arvo-Bold',
  },
  desctiption: {
    color: '#FFF5CD',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
  },
  infoTitles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: -5,
  },
  itstyle: {
    color: '#E7D37F',
    fontSize: 16,
    fontFamily: 'Arvo-Bold',
    marginHorizontal: 30,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 45,
  },
  istyle: {
    color: '#FFF5CD',
    fontSize: 16,
    marginTop: 10,
    marginHorizontal: 45,
    fontWeight: '500',
  },
  ingredientsTitle: {
    color: '#E7D37F',
    fontFamily: 'Arvo-Bold',
    fontSize: 22.5,
    marginBottom: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: -7,
  },
  bulletPoint: {
    fontSize: 35,
    marginRight: 10,
    marginLeft: 10,
    color: '#FFF5CD',
    marginTop: -5,
  },
  ingredientText: {
    fontSize: 16,
    color: '#FFF5CD',
    fontWeight: '500',
    marginLeft: -10,
  },
  orderedItem: {
    flexDirection: 'row',
    marginRight: 45,
    marginBottom: 5,
  },
  orderedNumber: {
    fontSize: 18,
    marginRight: 15,
    marginLeft: 10,
    color: '#FFF5CD',
  },
  directionText: {
    fontSize: 16,
    color: '#FFF5CD',
    fontWeight: '500',
    marginTop: 2,
    marginLeft: -10,
  },
  directionsTitle: {
    color: '#E7D37F',
    fontFamily: 'Arvo-Bold',
    fontSize: 22.5,
    marginTop: 30,
    marginBottom: 8,
  },
  buttons: {
    backgroundColor: '#82A263',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
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
  addToButtonContainer: {
    alignItems: 'center',
  },
  addToButton: {
    backgroundColor: '#FD9B62',
    paddingHorizontal: 30,
    borderRadius: 50,
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
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
  popUpContainer: {
    flex: 1,
    backgroundColor: '#E7D37F',
    justifyContent: 'space-between',
    borderRadius: 15,
  },
  popUpInnerContainer: {
    flex: 1,
    backgroundColor: '#FFF5CD',
    justifyContent: 'space-between',
    borderRadius: 7.5,
  },
  arvoTextNormal: {
    fontSize: 18,
    fontFamily: 'Arvo',
    color: '#365E32',
  },
  spacer: {
    flex: 1,
  },
  biggerSpacer: {
    flex: 2,
  },
});

export default InfoPage;
