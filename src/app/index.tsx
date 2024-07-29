import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import 'expo-router/entry';

import DynamicCollection from './pages/DynamicCollection';
import InfoPage from './pages/InfoPage';
import InputOutput from './pages/Input-Output';
import LoginScreen from './pages/Login';
import PlannerInfoPage from './pages/PlannerInfoPage';
import RecipeCollection from './pages/RecipeCollection';
import RecipeGenerator from './pages/RecipeGenerator';
import RecipePlanner from './pages/RecipePlanner';
import Registered from './pages/RegisteredPage';
import SignUpScreen from './pages/SignUp';
import StartScreen from './pages/StartScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen
        name="InOut"
        component={InputOutput}
        options={{ headerShown: false }}
      />
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
        name="Registered"
        component={Registered}
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
      <Stack.Screen
        name="DynamicCollection"
        component={DynamicCollection}
        options={{
          // transitionSpec: {
          //   open: { animation: 'timing', config: { duration: 0 } },
          //   close: { animation: 'timing', config: { duration: 0 } },
          // },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InfoPage"
        component={InfoPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlannerInfoPage"
        component={PlannerInfoPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default App;
