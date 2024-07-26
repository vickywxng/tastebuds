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
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore/lite';

import { db } from '../firebase';

type Props = {
  navigation: NavigationProp<any>;
};

const RecipePlanner: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const { userId } = route.params as {
    userId: string;
  };

  const [editMode, setEditMode] = useState(false);
  const [recipes, setRecipes] = useState<string[][]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [dayIndex, setDayIndex] = useState<number>(0);
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  const [collectionNames, setCollectionNames] = useState<string[][]>([['']]);
  const [addRec, setAddRec] = useState<Boolean>(false);
  //right now the date is entered manually^^ (aug1-2024)

  useEffect(() => {
    const constFetchCollections = async () => {
      const allCollections = collection(db, `allUsers/${userId}/collections`);
      const querySnapshot = await getDocs(allCollections);
      const collArray = [['']];
      querySnapshot.forEach((collection) => {
        if (collection.id === 'History') {
          collArray.push([collection.id, 'history']);
        } else if (collection.id === 'Favorites') {
          collArray.push([collection.id, 'heart']);
        } else {
          collArray.push([collection.id, collection.data().IconName]);
        }
      });
      collArray.shift();
      setCollectionNames(collArray);
    };

    constFetchCollections();
    fetchRecipes(dayIndex);
  }, []);

  const icons = (meal: string) => {
    if (meal === 'Breakfast') {
      return (
        <MaterialCommunityIcons name="egg-fried" size={20} color="#FFF5CD" />
      );
    } else if (meal === 'Lunch') {
      return <MaterialCommunityIcons name="food" size={20} color="#FFF5CD" />;
    } else if (meal === 'Dinner') {
      return <MaterialIcons name="dinner-dining" size={20} color="#FFF5CD" />;
    } else if (meal === 'Snack') {
      return (
        <MaterialCommunityIcons
          name="food-apple-outline"
          size={20}
          color="#FFF5CD"
        />
      );
    }
  };

  const fetchRecipes = async (day: number) => {
    const curCollection = collection(
      db,
      `allUsers/${userId}/planner/${days[day]}/Recipes`,
    );
    console.log(day);
    try {
      const querySnapshot = await getDocs(curCollection);
      const updatedRecipes: string[][] = [];
      querySnapshot.forEach((doc) => {
        updatedRecipes.push([
          doc.id,
          doc.data().Description,
          doc.data().Info['Time'],
          doc.data().Info['Complexity'],
          doc.data().Info['Calories'],
          doc.data().Info['Meal'],
        ]);
      });
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedRecipes([]);
  };

  const toggleRecipeSelection = (index: number) => {
    if (selectedRecipes.includes(index)) {
      setSelectedRecipes(selectedRecipes.filter((i) => i !== index));
    } else {
      setSelectedRecipes([...selectedRecipes, index]);
    }
  };

  const deleteSelectedRecipes = async () => {
    const filteredRecipes = recipes.filter(
      (_, index) => !selectedRecipes.includes(index),
    );

    const recipesToDelete = recipes.filter((_, index) =>
      selectedRecipes.includes(index),
    );

    const curCollection = collection(
      db,
      `allUsers/${userId}/planner/${days[dayIndex]}/Recipes`,
    );

    for (let recipe of recipesToDelete) {
      const id = recipe[0];
      const docRef = doc(curCollection, id);
      await deleteDoc(docRef);
    }

    setRecipes(filteredRecipes);
    setSelectedRecipes([]);
    setEditMode(false);
  };

  const goToGenerator = () => {
    navigation.navigate('Generator', { userId });
  };

  const goToCollection = () => {
    navigation.navigate('Collection', { userId });
  };

  const toggleDay = (increment: number) => {
    const newIndex = dayIndex + increment;
    console.log('Changing day index to:', newIndex);
    setDayIndex(newIndex);
    fetchRecipes(newIndex);
  };

  const addPopUp = () => {
    if (addRec) {
      return (
        <View style={styles.popUp}>
          <Text style={styles.popUpTitle}>Select your collection</Text>
          <View style={styles.collections}>
            {collectionNames.map((name, index) => (
              <TouchableOpacity key={index} style={styles.collection}>
                <FontAwesome5
                  name={name[1]}
                  size={20}
                  color="#FD9B62"
                ></FontAwesome5>
                <Text style={styles.colText}>{name[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {dayIndex > 0 && (
          <TouchableOpacity
            onPress={() => {
              toggleDay(-1);
            }}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF5CD" />
          </TouchableOpacity>
        )}
        {dayIndex <= 0 && <View style={{ width: 20 }}></View>}
        <Text style={styles.headerText}>August {dayIndex + 1}, 2024</Text>
        {dayIndex < 6 && (
          <TouchableOpacity
            onPress={() => {
              toggleDay(1);
            }}
          >
            <Ionicons name="chevron-forward" size={24} color="#FFF5CD" />
          </TouchableOpacity>
        )}
        {dayIndex >= 6 && <View style={{ width: 20 }}></View>}
      </View>
      <View style={styles.editSection}>
        <TouchableOpacity
          onPress={editMode ? deleteSelectedRecipes : toggleEditMode}
        >
          <Text style={styles.editText}>{editMode ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAddRec(true);
          }}
        >
          <FontAwesome5 name="plus" size={30} color="#365E32" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.recipes}>
        {loading ? (
          <Text style={styles.recipeTitle}>Loading...</Text>
        ) : (
          recipes.map((recipe, index) => {
            const title =
              (recipe[0] || '').length >= 24
                ? recipe[0]?.substring(0, 25) + '...'
                : recipe[0];

            const description =
              (recipe[1] || '').length >= 110
                ? recipe[1]?.substring(0, 111) + '...'
                : recipe[1];

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.recipe,
                  selectedRecipes.includes(index) && styles.selectedRecipe,
                ]}
                onPress={() => {
                  if (editMode) {
                    toggleRecipeSelection(index);
                  }
                }}
              >
                <Text style={styles.recipeTitle}>{title}</Text>
                <Text style={styles.recipeDescription}>{description}</Text>
                <View style={styles.info}>
                  <View style={[styles.infoElement, { width: 50 }]}>
                    {icons(recipe[5] + '')}
                  </View>
                  <View style={styles.infoElement}>
                    <Ionicons name="alarm" size={18} color="#FFF5CD" />
                    <Text style={styles.infoText}>{recipe[2]}</Text>
                  </View>
                  <View style={styles.infoElement}>
                    <Ionicons name="star" size={18} color="#FFF5CD" />
                    <Text style={styles.infoText}>{recipe[3]}</Text>
                  </View>
                  <View style={styles.infoElement}>
                    <Ionicons name="flame" size={20} color="#FFF5CD" />
                    <Text style={styles.infoText}>{recipe[4]}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
      <View style={[styles.popUpContainer]}>{addPopUp()}</View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="calendar" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToGenerator}>
          <Ionicons name="create-outline" size={40} color={'#FFF5CD'} />
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
  header: {
    backgroundColor: '#365E32',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 110,
    paddingBottom: 50,
    paddingLeft: 25,
    paddingRight: 25,
  },
  headerText: {
    color: '#E7D37F',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Arvo-Bold',
  },
  editSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 25,
    paddingRight: 30,
    paddingTop: 25,
  },
  editText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#365E32',
    fontFamily: 'Arvo-Bold',
  },
  recipes: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 200,
  },
  recipe: {
    backgroundColor: '#FFF5CD',
    width: 375,
    padding: 30,
    height: 200,
    marginVertical: 15,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedRecipe: {
    borderColor: 'red',
    borderWidth: 2,
  },
  recipeTitle: {
    color: '#365E32',
    fontFamily: 'Arvo-Bold',
    fontSize: 20,
    marginTop: -5,
    marginBottom: 10,
  },
  recipeDescription: {
    color: '#AFA26B',
    fontSize: 16,
  },
  popUpContainer: {
    position: 'absolute',
    width: 310,
    marginTop: 300,
    marginLeft: 60,
    zIndex: 1000,
  },
  popUp: {
    backgroundColor: '#FD9B62',
    position: 'absolute',
    alignItems: 'center',
    zIndex: 1000,
    padding: 10,
    borderRadius: 15,
  },
  popUpTitle: {
    color: '#FFF5CD',
    fontSize: 22,
    fontFamily: 'Arvo-Bold',
    marginTop: 40,
    marginBottom: 20,
  },
  collections: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
    marginBottom: 15,
  },
  collection: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF5CD',
    padding: 8,
    borderRadius: 25,
    width: 125,
    margin: 5,
  },
  colText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#FD9B62',
    marginLeft: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  infoElement: {
    width: 95,
    height: 37.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 15,
    backgroundColor: '#AFA26B',
    marginHorizontal: 2.5,
  },
  infoText: {
    color: '#FFF5CD',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 5,
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

export default RecipePlanner;
