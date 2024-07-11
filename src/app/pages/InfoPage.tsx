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
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore/lite';

import { db } from '../firebase';

type Props = {
  navigation: NavigationProp<any>;
};

const InfoPage: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const { navToInfo, curRecipe } = route.params as {
    navToInfo: string;
    curRecipe: string;
  };
  const [title, setTitle] = useState<String>('');
  const [description, setDescription] = useState<String>('');
  const [genInfo, setGenInfo] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [directions, setDirections] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const curDoc = doc(db, navToInfo, curRecipe);
        const docSnap = await getDoc(curDoc);

        if (docSnap.exists()) {
          setTitle(docSnap.id);
          setDescription(docSnap.data().Description);
          setGenInfo([
            docSnap.data().Info['Servings'],
            docSnap.data().Info['Time'],
            docSnap.data().Info['Complexity'],
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
    navigation.navigate('Generator');
  };

  const goToPlanner = () => {
    navigation.navigate('Planner');
  };

  const goToCollection = () => {
    navigation.navigate('Collection');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          { minHeight: Dimensions.get('window').height * 1.5 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <FontAwesome5
          name="arrow-left"
          size={30}
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
    backgroundColor: '#365E32',
    fontFamily: 'Arvo-Bold',
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

export default InfoPage;
