import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { styles } from '../styles';

export default function BooksListScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const booksList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksList);
      } catch (error) {
        console.error("Error fetching books:", error);
        Alert.alert('Error', 'There was a problem fetching books.');
      }
    };

    fetchBooks();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BookDetail', { book: item })}
    >
      <Image source={{ uri: item.coverPage }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>by {item.author}</Text>
        <Text style={styles.text}>Rating: {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
