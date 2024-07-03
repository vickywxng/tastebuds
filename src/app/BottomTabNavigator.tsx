import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainPage from './pages/MainPage';
import RecipeCollector from './pages/RecipeCollection';
import RecipeGenerator from './pages/RecipeGenerator';
import RecipePlanner from './pages/RecipePlanner';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#e91e63',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabStyle: {
          marginHorizontal: 10,
        },
        iconStyle: {
          marginBottom: -3,
        },
      }}
    >
      <Tab.Screen
        name="MainPage"
        component={RecipeGenerator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Generator"
        component={RecipeGenerator}
        options={{
          tabBarLabel: 'Generator',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Planner"
        component={RecipePlanner}
        options={{
          tabBarLabel: 'Planner',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Collector"
        component={RecipeCollector}
        options={{
          tabBarLabel: 'Collector',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="basket-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
