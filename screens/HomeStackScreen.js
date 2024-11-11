import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BooksListScreen from './BooksListScreen';
import BookDetailScreen from './BookDetailScreen';

const Stack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BooksList" component={BooksListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
}
