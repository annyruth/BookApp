import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './screens/HomeStackScreen';
import BorrowedScreen from './screens/BorrowedScreen';
import AntDesign from '@expo/vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor: '#00bfff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
        },
      }}>
        <Tab.Screen name="Home" component={HomeStackScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }} />
        <Tab.Screen name="Borrowed" component={BorrowedScreen} options={{
          tabBarLabel: 'Borrowed',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" size={size} color={color} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
