import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
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
import { CornerDownLeft, Currency } from '@tamagui/lucide-icons';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';
import ModalComponent from 'react-native-modal';
import { Spacer } from 'tamagui';

import { db } from '../firebase';

type Props = {
  navigation: NavigationProp<any>;
};

const RecipePlanner: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const { userId } = route.params as {
    userId: string;
  };

  const [selectedCollectionName, setSelectedCollectionName] = useState<
    string | null
  >(null);
  // let selectedRecipesArray: string[] = [];
  const [tempSelectedRecipesArray, setTempSelectedRecipesArray] = useState<
    string[]
  >([]);
  const [selectedRecipesArray, setSelectedRecipesArray] = useState<string[]>(
    [],
  );
  // let tempSelectedRecipesArray: string[] = [];
  const [currentSelectedRecipes, setCurrentSelectedRecipes] = useState<any[][]>([]);

  const [editMode, setEditMode] = useState(false);
  const [recipes, setRecipes] = useState<string[][]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [dayIndex, setDayIndex] = useState<number>(0);
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  const [collectionNames, setCollectionNames] = useState<string[][]>([['']]);
  const [addRec, setAddRec] = useState<Boolean>(false);
  const [blackout, setBlackout] = useState<Boolean>(false);
  const [selectingRecipe, setSelectingRecipe] = useState<Boolean>(false);
  const [delVisible, setDelVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);

  const [collectionRecipes, setCollectionRecipes] = useState<string[][]>([]);

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

  const prevSelectingRecipeRef = useRef(selectingRecipe);

  // let currentSelectedRecipes: any[][] = [];
  
  const addRecipeToArray = (recipe: any[]) => {
    const recipeDetails: any[] = [
      recipe[0], // Title
      recipe[1], // Description
      recipe[2], // Time
      recipe[3], // Complexity
      recipe[4], // Calories
      recipe[5], // Meal
      recipe[6], // Servings
      recipe[7], // Ingredients
      recipe[8], // Directions
    ];
    //("adding");
    // Create a temporary array and add the new recipe
    const updatedRecipes = [...currentSelectedRecipes, recipeDetails];
    
    // Update the state with the temporary array
    setCurrentSelectedRecipes(updatedRecipes);
    //("THE CURRENT RECIPES ARE" + currentSelectedRecipes)
  };


  const addToFirestore = async (recipe: any[]) => {
    // //("ADDED!");
    try {
      const curCollection = collection(
        db,
        `allUsers/${userId}/planner/${days[dayIndex]}/Recipes`,
      );

      const title =
              (recipe[0]?.trim() || '').length >= 24
                ? recipe[0]?.trim().substring(0, 25) + '...'
                : recipe[0]?.trim() || ''; // Default to empty string if undefined
  
      const safeTitle = title;

      const reciperef = doc(curCollection, safeTitle);
      const newInfo = {
        Servings: recipe[6],
        Time: recipe[2],
        Complexity: recipe[3],
        Calories: recipe[4],
        Meal: recipe[5],
      };
      await setDoc(reciperef, {
        Title: recipe[0],
        Description: recipe[1],
        Info: newInfo,
        Ingredients: recipe[7],
        Directions: recipe[8],
      });
      fetchRecipes(dayIndex);
    } catch (error) {
      console.error('Error adding recipe: ', error);
    }
  }
  
  // Effect to track changes in selectingRecipe
  // useEffect(() => {
  //   const prevSelectingRecipe = prevSelectingRecipeRef.current;
  //   if (prevSelectingRecipe === true && selectingRecipe === false) {
  //     // Code to execute when selectingRecipe changes from true to false
  //     // //("CLICKING ADD");
  //     // //("Current:", currentSelectedRecipes);
  //     currentSelectedRecipes.forEach(async (recipe) => {
  //       // //("HELLO");
  //       try {
  //         await addToFirestore(recipe);
  //       } catch (error) {
  //         console.error("Error adding recipe:", error);
  //       }
  //     });
  //   }
  //   // Update the ref to the current value of selectingRecipe
  //   prevSelectingRecipeRef.current = selectingRecipe;
  // }, [selectingRecipe, currentSelectedRecipes, addToFirestore]);

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
          doc.data().Info['Servings'],
          doc.data().Ingredients,
          doc.data().Directions,
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
    toggleModal();
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

    const updatedArray = [...tempSelectedRecipesArray]; // Create a copy of the array

    for (let recipe of recipesToDelete) {
      const id = recipe[0];

      if (typeof id === 'string') {
        // Check if id is a string
        // //('DELETING:' + id);
        const docRef = doc(curCollection, id);
        await deleteDoc(docRef);

        const index = updatedArray.indexOf(id);
        if (index > -1) {
          updatedArray.splice(index, 1); // Remove the id from the array
        }
      } else {
        console.error('Invalid id:', id); // Log error if id is not a string
      }
    }

    // //(tempSelectedRecipesArray);

    setTempSelectedRecipesArray(updatedArray); // Set the updated array once
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

  const goToInfo = (curRecipe: string, dayName: string) => {
    navigation.navigate('PlannerInfoPage', {
      userId,
      dayName,
      curRecipe,
    });
  };

  const toggleModal = () => {
    setDelVisible(!delVisible);
  };

  const toggleModalAndEdit = () => {
    toggleModal();
    toggleEditMode();
  };

  const toggleVisible = () => {
    if (selectedRecipes.length > 0) {
      setDelVisible(true);
    } else {
      toggleEditMode();
    }
  };

  const toggleDay = (increment: number) => {
    const newIndex = dayIndex + increment;
    setDayIndex(newIndex);
    fetchRecipes(newIndex);
  };

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTranslateY] = useState(
    new Animated.Value(Dimensions.get('window').height),
  );
  const [collectionVisible, setCardVisible] = useState(false);
  const [collectionTranslateX] = useState(
    new Animated.Value(Dimensions.get('window').width),
  );

  const toggleCard = () => {
    setCardVisible(!collectionVisible);
    Animated.timing(collectionTranslateX, {
      toValue: collectionVisible ? Dimensions.get('window').width : 0,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    //TODO: confirmation
    //ADD RECIPES HERE --> logic from collection page? keep track of date and collection users selects
  };

  const toggleRecipeCard = async (collectionName: string) => {
    setSelectedCollectionName(collectionName);
    // //(tempSelectedRecipesArray);

    let arr = [''];

    let recipesArray: string[][] = [];

    if (collectionName != '') {
      const usersCollectionRef = collection(
        db,
        `allUsers/${userId}/collections/${collectionName}/Recipes`,
      );

      const querySnapshot = await getDocs(usersCollectionRef);

      querySnapshot.forEach((doc) => {
        arr.push(doc.id);
        const data = doc.data();
        const recipeDetails = [
          doc.id, // Recipe ID
          data.Description || '', // Recipe Description
          data.Info['Time'] || '', // Time
          data.Info['Complexity'] || '', // Complexity
          data.Info['Calories'] || '', // Calories
          data.Info['Meal'] || '', // Meal
          data.Info['Servings'] || '', // Servings
          data.Ingredients || [], // Ingredients
          data.Directions || [], // Directions
        ];
        recipesArray.push(recipeDetails);
      });

      arr.shift();
    }

    setCollectionRecipes(recipesArray);
    toggleCard();
  };

  

  const showCollectionRecipes = () => {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.recipes}>
          {collectionRecipes.map((recipe, index) => {
            const title =
              (recipe[0]?.trim() || '').length >= 24
                ? recipe[0]?.trim().substring(0, 25) + '...'
                : recipe[0]?.trim() || ''; // Default to empty string if undefined
  
            const description =
              (recipe[1]?.trim() || '').length >= 110
                ? recipe[1]?.trim().substring(0, 111) + '...'
                : recipe[1]?.trim() || ''; // Default to empty string if undefined
  
            const isSelected = tempSelectedRecipesArray.includes(title);
  
            return (
              <View key={index}>
                {/* {tempSelectedRecipesArray.length === 0 || !tempSelectedRecipesArray.includes(title) ? ( */}
                {(
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.recipe,
                      isSelected && { borderColor: '#00AA00', borderWidth: 2 },
                    ]}
                    
                    onPress={async () => {
                      
                      console.log("ADDING: " + recipe);
                      // addRecipeToArray(recipe);
                      // //(tempSelectedRecipesArray);
  
                      const safeTitle = title;
  
                      if (selectingRecipe) {
                        
                        if (isSelected) {
                          // Remove from selected array
                          // const updatedArray = tempSelectedRecipesArray.filter(
                          //   (item) => item !== safeTitle,
                          // );
                          // setTempSelectedRecipesArray(updatedArray);
  
                          // // Remove from Firestore
                          // try {
                          //   const recipeDocRef = doc(curCollection, safeTitle);
                          //   await deleteDoc(recipeDocRef);
                          // } catch (error) {
                          //   console.error('Error removing recipe: ', error);
                          // }
                        } else {
                          // Add to selected array
                          setTempSelectedRecipesArray((prevArray) => [
                            ...prevArray,
                            safeTitle,
                          ]);

                          
  
                          // Add to Firestore
                          
                        }
                      }
                    }}
                  >
                    <Text
                      style={
                        isSelected
                          ? styles.recipeTitle
                          : styles.unselectedRecipeTitle
                      }
                    >
                      {title}
                    </Text>
                    <Text
                      style={
                        isSelected
                          ? styles.recipeDescription
                          : styles.unselectedRecipeDescription
                      }
                    >
                      {description}
                    </Text>
                    <View style={styles.info}>
                      <View
                        style={
                          isSelected
                            ? styles.infoElement
                            : styles.unselectedInfoElement
                        }
                      >
                        <Ionicons name="alarm" size={18} color="#FFF5CD" />
                        <Text style={styles.infoText}>{recipe[2]}</Text>
                      </View>
                      <Spacer size={10} />
                      <View
                        style={
                          isSelected
                            ? styles.infoElement
                            : styles.unselectedInfoElement
                        }
                      >
                        <Ionicons name="star" size={18} color="#FFF5CD" />
                        <Text style={styles.infoText}>{recipe[3]}</Text>
                      </View>
                      <Spacer size={10} />
                      <View
                        style={
                          isSelected
                            ? styles.infoElement
                            : styles.unselectedInfoElement
                        }
                      >
                        <Ionicons name="flame" size={20} color="#FFF5CD" />
                        <Text style={styles.infoText}>{recipe[4]}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                // ) : null}
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
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

  const AddPopup = () => {
    return (
      <ModalComponent
        isVisible={addVisible}
        onBackdropPress={() => setAddVisible(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Add recipes</Text>
            <Text style={styles.popupText}>
              You sure you want to add these recipes to this day?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setAddVisible(false)}
                style={styles.popupButton}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => [setAddVisible(false), setCardVisible(false)]}
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

  const SlideInCard = () => (
    <Animated.View
      style={[
        styles.slideInCard,
        {
          transform: [{ translateX: collectionTranslateX }],
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <TouchableOpacity onPress={toggleCard}>
          <MaterialIcons name="arrow-back-ios" size={35} color="#365E32" />
        </TouchableOpacity>
        <Text style={styles.cardTitle}>{selectedCollectionName}</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => {
            // if(selectingRecipe) {
            //   console.log("CLICKING ADD");
            //   console.log("Current:" + currentSelectedRecipes);
            //   currentSelectedRecipes.forEach((recipe) => {
            //     console.log("HELLO");
            //     addToFirestore(recipe);
            //   });
            // }
            if (selectingRecipe && tempSelectedRecipesArray.length > 0) {
              // selectedRecipesArray = [""];
              setAddVisible(true);
              // toggleClosePopup();
              // setBlackout(false);
            }
            setSelectingRecipe(!selectingRecipe);

            currentSelectedRecipes.forEach(async (recipe) => {
              // //("HELLO");
              try {
                await addToFirestore(recipe);
              } catch (error) {
                console.error("Error adding recipe:", error);
              }
            });

            let newSelectedItemsArray = [''];
            tempSelectedRecipesArray.forEach((item) => {
              // //(item); // Replace this with your desired action
              // Perform your logic here
              newSelectedItemsArray.push(item);
            });

            
          }}
        >
          <Text
            style={[styles.cardTitle, { textAlign: 'right' }, { fontSize: 20 }]}
          >
            {selectingRecipe ? 'Add' : 'Select'}
          </Text>
        </TouchableOpacity>
      </View>
      {showCollectionRecipes()}
    </Animated.View>
  );

  const toggleOpenPopup = () => {
    // Show popup
    setPopupVisible(true);
    Animated.timing(popupTranslateY, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const toggleClosePopup = () => {
    // Hide popup
    setAddRec(false);
    Animated.timing(popupTranslateY, {
      toValue: Dimensions.get('window').height,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => setPopupVisible(false));
  };

  const addPopUp = () => {
    if (addRec) {
      return (
        <View style={styles.popUpContainer}>
          <Animated.View
            style={[
              styles.popUp,
              {
                transform: [{ translateY: popupTranslateY }],
              },
            ]}
          >
            <View style={styles.popUpHeaderSection}>
              <Text style={styles.popUpTitle}>Recipe Collection</Text>
              <TouchableOpacity
                onPress={() => {
                  setBlackout(!blackout);
                  toggleClosePopup();
                }}
              >
                <Ionicons
                  name="chevron-down"
                  size={35}
                  color="#365E32"
                  style={styles.closePopUp}
                />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.collectionScrollView}>
              <View style={styles.collections}>
                {collectionNames.map((name, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.collectionItem]}
                    onPress={() => {
                      const collectionName = name[0] || '';
                      toggleRecipeCard(collectionName);
                    }}
                  >
                    <FontAwesome5 name={name[1]} size={40} color="#365E32" />
                    <Text style={styles.collectionText}>{name[0]}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <DeletePopup />
      <AddPopup />
      {blackout && <View style={styles.blackBackground}></View>}
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
        <Text style={styles.headerText}>{realDateArray[dayIndex]}</Text>
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
        <TouchableOpacity onPress={editMode ? toggleVisible : toggleEditMode}>
          <Text style={styles.editText}>{editMode ? 'Delete' : 'Edit'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAddRec(true);
            toggleOpenPopup();
            setBlackout(true);
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
              (recipe[0]?.trim() || '').length >= 24
                ? recipe[0]?.trim().substring(0, 25) + '...'
                : recipe[0]?.trim();

            const description =
              (recipe[1]?.trim() || '').length >= 110
                ? recipe[1]?.trim().substring(0, 111) + '...'
                : recipe[1]?.trim();

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.recipe,
                  selectedRecipes.includes(index) && {
                    borderWidth: 2,
                    borderColor: 'red',
                  },
                ]}
                onPress={() => {
                  if (editMode) {
                    toggleRecipeSelection(index);
                  } else {
                    goToInfo(recipe[0] + '', days[dayIndex] + '');
                  }
                }}
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
          })
        )}
      </ScrollView>
      {addPopUp()}
      {collectionVisible && <SlideInCard />}
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

const { height } = Dimensions.get('window');
const neededPadding = height / 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7D37F',
  },
  blackBackground: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    zIndex: 1000,
  },
  header: {
    backgroundColor: '#365E32',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 110,
    paddingBottom: 50,
    paddingLeft: 25,
    paddingRight: 25,
    position: 'relative', // Ensure it is on top
    zIndex: 1,
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
  slideInCard: {
    position: 'absolute',
    backgroundColor: '#E7D37F',
    zIndex: 1002,
    padding: 20,
    borderRadius: 30,
    marginTop: 260,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  cardHeader: {
    padding: 20,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#365E32',
    fontSize: 26,
    fontFamily: 'Arvo-Bold',
    // marginTop: 20,
    textAlign: 'center',
  },
  cardContent: {
    padding: 20,
    color: '#365E32',
    fontSize: 18,
    marginTop: 20,
  },
  recipes: {
    paddingBottom: neededPadding,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 200,
  },
  recipe: {
    justifyContent: 'space-between',
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
    //borderColor: 'red',
    borderWidth: 2,
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
  popUpHeaderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closePopUp: {
    marginTop: 32,
    marginRight: 20,
  },
  popUpContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    zIndex: 1000,
    marginTop: 520,
  },
  popUp: {
    backgroundColor: '#E7D37F',
    zIndex: 1001,
    padding: 20,
    borderRadius: 30,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  popUpTitle: {
    color: '#365E32',
    marginLeft: 20,
    fontSize: 26,
    fontFamily: 'Arvo-Bold',
    marginTop: 35,
  },
  collectionScrollView: {
    // flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 30,
  },
  collections: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 320,
  },
  collectionItem: {
    backgroundColor: '#FFF5CD',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: (Dimensions.get('window').width - 110) / 2,
    height: (Dimensions.get('window').width - 110) / 2,
    borderRadius: 17.5,
    margin: 17.5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  collectionText: {
    fontFamily: 'Arvo-Bold',
    fontSize: 16,
    color: '#365E32',
    marginTop: 10,
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
  unselectedInfoElement: {
    width: 95,
    height: 37.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 15,
    backgroundColor: '#E7D37F',
    marginHorizontal: 2.5,
  },
  infoText: {
    color: '#FFF5CD',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  unselectedInfoText: {
    color: '#E7D37F',
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
    zIndex: 10000,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  editButton: {
    marginTop: 120,
    marginLeft: 31,
    position: 'relative',
    backgroundColor: '#E7D37F',
    borderWidth: 0,
    padding: 10,
  },
  editButtonText: {
    color: '#365E32',
    fontFamily: 'Arvo-Bold',
    fontSize: 32,
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
});

export default RecipePlanner;
