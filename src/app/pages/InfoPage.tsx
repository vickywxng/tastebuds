import React, { useState } from 'react';
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
import { addDoc, collection, doc, setDoc } from 'firebase/firestore/lite';

type Props = {
  navigation: NavigationProp<any>;
};

const InfoPage: React.FC<Props> = ({ navigation }) => {
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

  const ingredients = [
    '1 Egg',
    '3/4 cup milk',
    '1 cup flour',
    '1 teaspoon baking powder',
    '1/2 teaspoon baking soda',
    '2 tablespoons melted butter',
    '1+ cup fresh blueberries',
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <FontAwesome5
          name="arrow-left"
          size={30}
          color={'#FFF5CD'}
          onPress={goBack}
          style={styles.arrow}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Blueberry Pancakes</Text>
          <Text style={styles.desctiption}>
            Super thick and fluffy blueberry pancakes! Melt in your mouth,
            golden brown, and bursting with blueberries.
          </Text>
          <View style={styles.infoTitles}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
          </View>
          <View style={styles.info}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
          </View>
          <Text style={styles.ingredientsTitle}>Ingredients</Text>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
          <Text style={styles.directionsTitle}>Directions</Text>
          <Text style={styles.directionsList}></Text>
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
  infoTitles: {},
  info: {},
  ingredientsTitle: {
    color: '#E7D37F',
    fontFamily: 'Arvo-Bold',
    fontSize: 22.5,
    marginBottom: 6,
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
  directionsTitle: {
    color: '#E7D37F',
    fontFamily: 'Arvo-Bold',
    fontSize: 22.5,
    marginTop: 25,
    marginBottom: 6,
  },
  directionsList: {
    color: '#FFF5CD',
    fontFamily: 'Arvo-Bold',
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
