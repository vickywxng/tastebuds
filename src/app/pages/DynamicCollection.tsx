import React, { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore/lite';

import { db } from '../firebase';

type Props = {
  navigation: NavigationProp<any>;
};

const DynamicCollection: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const { collectionName, userId } = route.params as {
    collectionName: string;
    userId: string;
  };
  const [editMode, setEditMode] = useState(false);
  const [recipes, setRecipes] = useState<string[][]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const curCollection = collection(
    db,
    `allUsers/${userId}/collections/${collectionName}/Recipes`,
  );

  useEffect(() => {
    const fetchRecipes = async () => {
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

  const goToInfo = (curRecipe: string) => {
    navigation.navigate('InfoPage', {
      navToInfo: `allUsers/${userId}/collections/${collectionName}/Recipes`,
      curRecipe,
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedRecipes([]);
  };

  const deleteSelectedRecipes = () => {
    const filteredFolders = recipes.filter(
      (_, index) => !selectedRecipes.includes(index),
    );
    setRecipes(filteredFolders);
    setSelectedRecipes([]);
    setEditMode(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.editButton}
          onPress={editMode ? deleteSelectedRecipes : toggleEditMode}
        >
          <Text style={styles.editButtonText}>
            {editMode ? 'Done' : 'Edit'}
          </Text>
        </TouchableOpacity>
        <View style={styles.recipes}>
          {recipes.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipe}
              onPress={() => goToInfo(`${recipe[0]}`)}
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
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={goToGenerator}>
          <Ionicons name="create-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPlanner}>
          <Ionicons name="calendar-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToCollection}>
          <Ionicons name="basket" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7D37F',
  },
  editButton: {
    marginTop: 120,
    marginLeft: 31,
    backgroundColor: '#E7D37F',
    borderWidth: 0,
    padding: 10,
  },
  editButtonText: {
    color: '#365E32',
    fontFamily: 'Arvo-Bold',
    fontSize: 32,
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
    height: 100,
    paddingBottom: 30,
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
});

export default DynamicCollection;
