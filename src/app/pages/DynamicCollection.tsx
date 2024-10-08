import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore/lite';
import ModalComponent from 'react-native-modal';

import { db } from '../firebase';

type Props = {
  navigation: NavigationProp<any>;
};

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

const DynamicCollection: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const { collectionName, userId } = route.params as {
    collectionName: string;
    userId: string;
  };
  const [editMode, setEditMode] = useState(false);
  const [recipes, setRecipes] = useState<string[][]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const [delVisible, setDelVisible] = useState(false);
  const curCollection = collection(
    db,
    `allUsers/${userId}/collections/${collectionName}/Recipes`,
  );
  let curtitle = '';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(curCollection);
        const updatedRecipes: string[][] = [];

        querySnapshot.forEach((doc) => {
          curtitle = doc.id;
          updatedRecipes.push([
            doc.id,
            doc.data().Description.trim(),
            doc.data().Info['Time'],
            doc.data().Info['Complexity'],
            doc.data().Info['Calories'],
            doc.data().Info['Meal'], // Ensure this value matches the type
          ]);
        });

        setRecipes(updatedRecipes);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchRecipes();
  }, []);

  const toggleModal = () => {
    setDelVisible(!delVisible);
  };

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

  const goToInfo = (curRecipe: string) => {
    console.log(curRecipe);
    navigation.navigate('InfoPage', {
      userId,
      collectionName,
      curRecipe,
    });
  };

  const toggleRecipeSelection = (index: number) => {
    if (selectedRecipes.includes(index)) {
      setSelectedRecipes(selectedRecipes.filter((i) => i !== index));
    } else {
      setSelectedRecipes([...selectedRecipes, index]);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedRecipes([]);
  };

  const toggleVisible = () => {
    if (selectedRecipes.length > 0) {
      setDelVisible(true);
    } else {
      toggleEditMode();
    }
  };

  const deleteSelectedRecipes = () => {
    toggleModal();
    const filteredFolders = recipes.filter(
      (_, index) => !selectedRecipes.includes(index),
    );

    const recipesToDelete = recipes.filter((_, index) =>
      selectedRecipes.includes(index),
    );

    for (let infoArr of recipesToDelete) {
      let id = infoArr[0];
      const docRef = doc(curCollection, id);
      deleteDoc(docRef);
    }

    setRecipes(filteredFolders);
    setSelectedRecipes([]);
    setEditMode(false);
  };

  const toggleModalAndEdit = () => {
    toggleModal();
    toggleEditMode();
  };

  const DeletePopup = () => {
    return (
      <ModalComponent isVisible={delVisible} onBackdropPress={toggleModal}>
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Delete recipe</Text>
            <Text style={styles.popupText}>
              You sure you want to delete all selected recipes?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={toggleModalAndEdit}
                style={styles.popupButton}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={deleteSelectedRecipes}
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

  return (
    <View style={styles.container}>
      <DeletePopup />
      <View style={styles.fixedHeader}></View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={{ flexDirection: 'row' }}>
            <MaterialIcons
              name="arrow-back-ios"
              size={35}
              color={'#365E32'}
              style={styles.arrow}
            />
            <Text style={styles.collectionName}>{collectionName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={editMode ? toggleVisible : toggleEditMode}
          >
            <Text style={styles.editButtonText}>
              {editMode ? 'Done' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recipes}>
          {recipes.map((recipe, index) => {
            const title =
              (recipe[0]?.trim() || '').length >= 24
                ? recipe[0]?.trim().substring(0, 25) + '...'
                : recipe[0]?.trim();

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
                onPress={() =>
                  editMode
                    ? toggleRecipeSelection(index)
                    : goToInfo(recipe[0] + '')
                }
              >
                <Text
                  style={[
                    styles.recipeTitle,
                    editMode &&
                      !selectedRecipes.includes(index) &&
                      styles.unselectedRecipeTitle,
                  ]}
                >
                  {title}
                </Text>
                <Text
                  style={[
                    styles.recipeDescription,
                    editMode &&
                      !selectedRecipes.includes(index) &&
                      styles.unselectedRecipeDescription,
                  ]}
                >
                  {description}
                </Text>
                <View style={styles.info}>
                  <View
                    style={[
                      [
                        styles.infoElement,
                        editMode &&
                          !selectedRecipes.includes(index) &&
                          styles.unselectedInfoElement,
                      ],
                      { width: 50 },
                    ]}
                  >
                    {icons(recipe[5] + '')}
                  </View>
                  <View
                    style={[
                      styles.infoElement,
                      editMode &&
                        !selectedRecipes.includes(index) &&
                        styles.unselectedInfoElement,
                    ]}
                  >
                    <Ionicons name="alarm" size={18} color="#FFF5CD" />
                    <Text style={styles.infoText}>{recipe[2]}</Text>
                  </View>
                  <View
                    style={[
                      styles.infoElement,
                      editMode &&
                        !selectedRecipes.includes(index) &&
                        styles.unselectedInfoElement,
                    ]}
                  >
                    <Ionicons name="star" size={18} color="#FFF5CD" />
                    <Text style={styles.infoText}>{recipe[3]}</Text>
                  </View>
                  <View
                    style={[
                      styles.infoElement,
                      editMode &&
                        !selectedRecipes.includes(index) &&
                        styles.unselectedInfoElement,
                    ]}
                  >
                    <Ionicons name="flame" size={20} color="#FFF5CD" />
                    <Text style={styles.infoText}>{recipe[4]}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={goToPlanner}>
          <Ionicons name="calendar-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToGenerator}>
          <Ionicons name="create-outline" size={40} color={'#FFF5CD'} />
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
    backgroundColor: '#E7D37F',
  },
  fixedHeader: {
    //backgroundColor: 'red',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  arrow: {
    borderWidth: 0,
    marginLeft: 30,
    fontFamily: 'Arvo-Bold',
  },
  collectionName: {
    marginTop: 3,
    color: '#365E32',
    fontFamily: 'Arvo-Bold',
    fontSize: 24,
  },
  editButton: {
    marginTop: -10,
    marginRight: 30,
    position: 'relative',
    backgroundColor: '#E7D37F',
    borderWidth: 0,
    padding: 10,
  },
  editButtonText: {
    color: '#365E32',
    fontFamily: 'Arvo-Bold',
    fontSize: 24,
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
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  infoElement: {
    width: 85,
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
    fontSize: 11,
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
  popupContainer: {
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
    fontSize: 18,
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
  unselectedRecipeTitle: {
    color: '#E7D37F',
    fontFamily: 'Arvo-Bold',
    fontSize: 20,
    marginTop: -5,
    marginBottom: 10,
  },
  unselectedRecipeDescription: {
    color: '#E7D37F',
    fontSize: 16,
  },
  unselectedInfoElement: {
    backgroundColor: '#E7D37F',
  },
});

export default DynamicCollection;
