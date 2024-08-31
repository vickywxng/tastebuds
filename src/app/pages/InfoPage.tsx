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
import ModalComponent from 'react-native-modal';
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
  const { userId, collectionName, curRecipe } = route.params as {
    userId: string;
    collectionName: string;
    curRecipe: string;
  };
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<String>('');
  const [genInfo, setGenInfo] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [directions, setDirections] = useState<string[]>([]);
  const [addPlannerVisible, setAddPlannerVisible] = useState(false);
  const [addCollectionVisible, setAddCollectionVisible] = useState(false);
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
          `allUsers/${userId}/collections/${collectionName}/Recipes/${curRecipe}`,
        );
        const docSnap = await getDoc(curDoc);

        if (docSnap.exists()) {
          setTitle(docSnap.id.trim());
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

  const addToPlanner = () => {
    setShowCalendarPopUp(true);
  };

  const addToCollection = () => {
    setShowCollectionPopUp(true);
  };

  const handleCollectionPress = (name: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
    setCollectionSelected(name);
  };

  const plannerCheck = (name: string) => {
    if (selectedDays.includes(name)) {
      setSelectedDays(selectedDays.filter((i) => i !== name));
    } else {
      setSelectedDays([...selectedDays, name]);
    }
  };

  const collectionCheck = (name: string) => {
    if (selectedCollections.includes(name)) {
      setSelectedCollections(selectedCollections.filter((i) => i !== name));
    } else {
      setSelectedCollections([...selectedCollections, name]);
    }
  };

  const addToPlannerLogic = async () => {
    // Assuming selectedCollections is an array of collection names
    setAddPlannerVisible(false);
    console.log(selectedDays);
    for (const curDay of selectedDays) {
      console.log('reached loop');
      const usersCollectionRef = collection(
        db,
        `allUsers/${userId}/planner/${curDay}/Recipes`,
      );
      const recipeRef = doc(usersCollectionRef, title);

      const newInfo = {
        Servings: genInfo[0],
        Time: genInfo[1],
        Complexity: genInfo[2],
        Calories: genInfo[3],
        Meal: genInfo[4],
      };

      try {
        await setDoc(recipeRef, {
          Title: title.trim(),
          Description: description.trim(),
          Ingredients: ingredients,
          Directions: directions,
          Info: newInfo,
        });
        console.log(`Document added to ${curDay}`);
      } catch (error) {
        console.error('Error adding document:', error);
      }
    }
  };

  const addToCollectionLogic = async () => {
    // Assuming selectedCollections is an array of collection names
    setAddCollectionVisible(false);
    for (const curCollection of selectedCollections) {
      const usersCollectionRef = collection(
        db,
        `allUsers/${userId}/collections/${curCollection}/Recipes`,
      );
      const recipeRef = doc(usersCollectionRef, title);

      const newInfo = {
        Servings: genInfo[0],
        Time: genInfo[1],
        Complexity: genInfo[2],
        Calories: genInfo[3],
        Meal: genInfo[4],
      };

      try {
        await setDoc(recipeRef, {
          Title: title.trim(),
          Description: description.trim(),
          Ingredients: ingredients,
          Directions: directions,
          Info: newInfo,
        });
        console.log(`Document added to collection ${curCollection}`);
      } catch (error) {
        console.error('Error adding document:', error);
      }
    }
  };

  const AddPopupPlanner = () => {
    return (
      <ModalComponent
        isVisible={addPlannerVisible}
        onBackdropPress={() => setAddPlannerVisible(!addPlannerVisible)}
      >
        <View style={styles.popupContainerAdd}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Add recipes</Text>
            <Text style={styles.popupText}>
              You sure you want to add all selected recipe(s) to these days?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setAddPlannerVisible(false)}
                style={styles.popupButton}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => [
                  addToPlannerLogic(),
                  setShowCalendarPopUp(false),
                ]}
                style={styles.popupButton}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalComponent>
    );
  };

  const AddPopupCollection = () => {
    return (
      <ModalComponent
        isVisible={addCollectionVisible}
        onBackdropPress={() => setAddCollectionVisible(!addCollectionVisible)}
      >
        <View style={styles.popupContainerAdd}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Add recipes</Text>
            <Text style={styles.popupText}>
              You sure you want to add all selected recipe(s) to these
              collections?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setAddCollectionVisible(false)}
                style={styles.popupButton}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => [
                  addToCollectionLogic(),
                  setShowCollectionPopUp(false),
                ]}
                style={styles.popupButton}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalComponent>
    );
  };

  const collectionPopUP = async () => {
    const usersCollectionRef = collection(db, `allUsers/${userId}/collections`);
    const querySnapshot = await getDocs(usersCollectionRef);
    const stringArray = [''];

    querySnapshot.forEach((doc) => {
      stringArray.push(doc.id);
    });

    stringArray.shift();

    return (
      <View style={[styles.popUpContainer, { marginTop: 20 }]}>
        <Text
          style={[
            styles.modalTitle,
            { color: '#365E32' },
            { marginTop: 20 },
            { textAlign: 'center' },
          ]}
        >
          Save to collection
        </Text>
        <View
          style={[
            styles.popUpInnerContainer,
            { marginRight: 20 },
            { marginLeft: 20 },
          ]}
        >
          <View
            style={[
              { marginTop: 20 },
              { marginLeft: 20 },
              { marginBottom: 20 },
            ]}
          >
            {stringArray.map((name) => (
              <TouchableOpacity
                key={name}
                onPress={() => [
                  collectionCheck(name),
                  handleCollectionPress(name),
                ]}
              >
                <XStack>
                  {checkedItems[name] ? (
                    <MaterialIcons name="check-box" size={24} color="#365E32" />
                  ) : (
                    <MaterialIcons
                      name="check-box-outline-blank"
                      size={24}
                      color="#365E32"
                    />
                  )}
                  <Text
                    style={[
                      styles.arvoTextNormal,
                      { fontFamily: 'Lato' },
                      { marginLeft: 5 },
                    ]}
                  >
                    {name}
                  </Text>
                </XStack>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <XStack
          style={[
            { marginTop: 20 },
            { marginBottom: 20 },
            { alignContent: 'center' },
          ]}
        >
          <View style={styles.spacer} />
          <TouchableOpacity
            onPress={() => setShowCollectionPopUp(false)}
            style={{ marginLeft: 20 }}
            // Also set the array for the checkmarks to false as well!!
          >
            <Text style={styles.arvoTextNormal}>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.biggerSpacer} />
          <TouchableOpacity
            onPress={() => {
              if (selectedCollections.length > 0) {
                setAddCollectionVisible(true);
              } else {
                setShowCollectionPopUp(false);
              }
            }}
            style={{ marginRight: 20 }}
          >
            <Text style={styles.arvoTextNormal}>Save</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
        </XStack>
      </View>
    );
  };

  const calendarPopUP = () => {
    const formatDate = (date: number | Date | undefined) => {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long', // 'Monday'
        month: 'long', // 'July'
        day: 'numeric', // '22'
      }).format(date);
    };
    const currentDate = new Date();
    const day2 = new Date(currentDate);
    day2.setDate(day2.getDate() + 1);

    const day3 = new Date(currentDate);
    day3.setDate(day3.getDate() + 2);

    const day4 = new Date(currentDate);
    day4.setDate(day4.getDate() + 3);

    const day5 = new Date(currentDate);
    day5.setDate(day5.getDate() + 4);

    const day6 = new Date(currentDate);
    day6.setDate(day6.getDate() + 5);

    const day7 = new Date(currentDate);
    day7.setDate(day7.getDate() + 6);

    const realDateArray = [
      formatDate(currentDate),
      formatDate(day2),
      formatDate(day3),
      formatDate(day4),
      formatDate(day5),
      formatDate(day6),
      formatDate(day7),
    ];

    return (
      <View style={[styles.popUpContainer, { marginTop: 20 }]}>
        <Text
          style={[
            styles.modalTitle,
            { color: '#365E32' },
            { marginTop: 20 },
            { textAlign: 'center' },
          ]}
        >
          Add to planner
        </Text>
        <View
          style={[
            styles.popUpInnerContainer,
            { marginRight: 20 },
            { marginLeft: 20 },
          ]}
        >
          <View
            style={[
              { marginTop: 20 },
              { marginLeft: 20 },
              { marginBottom: 20 },
            ]}
          >
            {realDateArray.map((name) => (
              <TouchableOpacity
                key={name}
                onPress={() => [
                  plannerCheck(name),
                  handleCollectionPress(name),
                ]}
              >
                <XStack>
                  {checkedItems[name] ? (
                    <MaterialIcons name="check-box" size={24} color="#365E32" />
                  ) : (
                    <MaterialIcons
                      name="check-box-outline-blank"
                      size={24}
                      color="#365E32"
                    />
                  )}
                  <Text
                    style={[
                      styles.arvoTextNormal,
                      { fontFamily: 'Lato' },
                      { marginLeft: 5 },
                    ]}
                  >
                    {name}
                  </Text>
                </XStack>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <XStack
          style={[
            { marginTop: 20 },
            { marginBottom: 20 },
            { alignContent: 'center' },
          ]}
        >
          <View style={styles.spacer} />
          <TouchableOpacity
            onPress={() => setShowCalendarPopUp(false)}
            style={{ marginLeft: 20 }}
            // Also set the array for the checkmarks to false as well!!
          >
            <Text style={styles.arvoTextNormal}>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.biggerSpacer} />
          <TouchableOpacity
            onPress={() => {
              if (selectedDays.length > 0) {
                setAddPlannerVisible(true);
              } else {
                setShowCalendarPopUp(false);
              }
            }}
            style={{ marginRight: 20 }}
          >
            <Text style={styles.arvoTextNormal}>Save</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
        </XStack>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AddPopupPlanner />
      <AddPopupCollection />
      <View style={styles.header}></View>
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
        <View style={{ alignItems: 'center' }}>
          <Button style={styles.addToButton} onPress={() => addToPlanner()}>
            <Text
              style={[
                styles.modalTitleSmaller,
                { marginBottom: 0, color: '#FFF5CD' },
              ]}
            >
              Add to planner
            </Text>
          </Button>

          {showCalendarPopUp && (
            <>
              {calendarPopUP()}
              <View style={{ height: 20 }} />
            </>
          )}

          <View style={{ height: 10 }} />

          <Button style={styles.addToButton} onPress={() => addToCollection()}>
            <Text
              style={[
                styles.modalTitleSmaller,
                { marginBottom: 0, color: '#FFF5CD' },
              ]}
            >
              Add to collection
            </Text>
          </Button>

          {showCollectionPopUp && <>{collectionPopUP()}</>}
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={goToPlanner}>
          <Ionicons name="calendar-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToGenerator}>
          <Ionicons name="create-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons
            name="basket"
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
  header: {
    //backgroundColor: 'red',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
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
    marginTop: 30,
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
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 350,
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
  popupContainerAdd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#365E32',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: 350,
    height: 215,
  },
  popupTitle: {
    marginTop: 35,
    fontSize: 26,
    color: '#E7D37F',
    fontFamily: 'Arvo-Bold',
  },
  popupText: {
    color: '#FFF5CD',
    fontSize: 16,
    marginVertical: 15,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupButton: {
    backgroundColor: '#365E32',
    justifyContent: 'center',
    fontSize: 20,
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 35,
    borderRadius: 5,
    width: 150,
    height: 50,
  },
  buttonText: {
    color: '#FFF5CD',
    fontSize: 18,
    fontFamily: 'Arvo-Regular',
    textAlign: 'center',
  },
});

export default InfoPage;
