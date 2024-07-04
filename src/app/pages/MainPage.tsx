import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { Button } from 'tamagui';

type Props = {
  navigation: NavigationProp<any>;
};

const MainPage: React.FC<Props> = ({ navigation }) => {
  const screenHeight = Dimensions.get('window').height;

  const goToGenerator = () => {
    navigation.navigate('Generator');
  };

  const goToPlanner = () => {
    navigation.navigate('Planner');
  };

  const goToCollection = () => {
    navigation.navigate('Collection');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          { minHeight: screenHeight * 1.75 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require('../images/main_background.jpg')}
          style={styles.background}
          resizeMode="cover"
        >
          <Text style={styles.text}>Work In Progress</Text>
          <View style={[styles.section, styles.section1]}></View>
          <View style={[styles.section, styles.section2]}></View>
          <View style={[styles.section, styles.section3]}></View>
        </ImageBackground>
      </ScrollView>
      <View style={styles.buttons}>
        <Button style={styles.button}>
          <Ionicons name="home-outline" size={36} color={'#E91E63'} />
        </Button>
        <Button style={styles.button} onPress={goToGenerator}>
          <Ionicons name="create-outline" size={36} color={'gray'} />
        </Button>
        <Button style={styles.button} onPress={goToPlanner}>
          <Ionicons name="calendar-outline" size={36} color={'gray'} />
        </Button>
        <Button style={styles.button} onPress={goToCollection}>
          <Ionicons name="basket-outline" size={36} color={'gray'} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
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
  scrollViewContent: {
    flexGrow: 1,
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 200,
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end', // Align the image to the bottom
    alignItems: 'center',
  },
  section: {
    borderRadius: 0,
    borderTopWidth: 40,
    width: '110%',
    marginBottom: 20,
    marginTop: 20,
    flex: 1,
  },
  section1: {
    backgroundColor: 'rgba(100, 230, 255, 0.8)',
    borderColor: '#2294E6',
    marginTop: 100,
  },
  section2: {
    backgroundColor: 'rgba(150, 255, 150, 0.8)',
    borderColor: '#66B452',
  },
  section3: {
    backgroundColor: 'rgba(255, 200, 120, 0.8)',
    borderColor: '#FE9E45',
    marginBottom: 200,
  },
});

export default MainPage;
