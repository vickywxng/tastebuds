import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import BottomTabNavigator from '../BottomTabNavigator';

type Props = {
  navigation: NavigationProp<any>;
};

const MainPage: React.FC<Props> = ({ navigation }) => {
  const screenHeight = Dimensions.get('window').height;

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
      <View style={styles.tab}>
        <BottomTabNavigator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
