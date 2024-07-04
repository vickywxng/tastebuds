import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './pages/Login';
import MainPage from './pages/MainPage';
import RecipeCollection from './pages/RecipeCollection';
import RecipeGenerator from './pages/RecipeGenerator';
import RecipePlanner from './pages/RecipePlanner';
import SignUpScreen from './pages/SignUp';
import StartScreen from './pages/StartScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 0 } },
            close: { animation: 'timing', config: { duration: 0 } },
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Generator"
        component={RecipeGenerator}
        options={{
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 0 } },
            close: { animation: 'timing', config: { duration: 0 } },
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Planner"
        component={RecipePlanner}
        options={{
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 0 } },
            close: { animation: 'timing', config: { duration: 0 } },
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Collection"
        component={RecipeCollection}
        options={{
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 0 } },
            close: { animation: 'timing', config: { duration: 0 } },
          },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default App;
