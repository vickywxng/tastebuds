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
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
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
  //right now the date is entered manually^^ (aug1-2024)

  useEffect(() => {
    fetchRecipes(dayIndex);
  }, []);

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
      </View>
      <View style={styles.editSection}>
        <TouchableOpacity onPress={toggleEditMode}>
          <Text style={styles.editText}>{editMode ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
        <FontAwesome5 name="plus" size={30} color="#365E32" />
      </View>
      <ScrollView contentContainerStyle={styles.recipes}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          recipes.map((recipe, index) => (
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
              <Text style={styles.recipeTitle}>{recipe[0]}</Text>
              <Text style={styles.recipeDescription}>{recipe[1]}</Text>
              <View style={styles.info}>
                <View style={styles.infoElement}>
                  <Ionicons name="alarm" size={20} color="#FFF5CD" />
                  <Text style={styles.infoText}>{recipe[2]}</Text>
                </View>
                <View style={styles.infoElement}>
                  <Ionicons name="star" size={20} color="#FFF5CD" />
                  <Text style={styles.infoText}>{recipe[3]}</Text>
                </View>
                <View style={styles.infoElement}>
                  <Ionicons name="flame" size={20} color="#FFF5CD" />
                  <Text style={styles.infoText}>{recipe[4]}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
    alignItems: 'center',
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
    margin: 15,
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
