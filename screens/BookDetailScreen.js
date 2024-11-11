import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { styles } from '../styles';

export default function BookDetailScreen({ route, navigation }) {
  const { book } = route.params;
  const [borrowedCount, setBorrowedCount] = useState(0);

  useEffect(() => {
    const fetchBorrowedCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'borrowedBooks'));
        setBorrowedCount(querySnapshot.size);
      } catch (error) {
        console.error("Error fetching borrowed books count:", error);
      }
    };
    fetchBorrowedCount();
  }, []);

  const borrowBook = async () => {
    if (borrowedCount >= 3) {
      Alert.alert('Limit Exceeded', 'You cannot borrow more than 3 books at a time.');
    } else {
      try {
        let newBook = { ...book, refId: book.id};
        delete newBook.id;
        await addDoc(collection(db, 'borrowedBooks'), newBook);
        setBorrowedCount(borrowedCount + 1);
        Alert.alert('Success', `${book.name} has been borrowed.`);
        navigation.goBack();
      } catch (error) {
        console.error("Error borrowing book:", error);
        Alert.alert('Error', 'There was a problem borrowing the book.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{book.name}</Text>
        <Text style={styles.subtitle}>by {book.author}</Text>
        <Image source={{ uri: book.coverPage }} style={styles.image} />
        <Text style={styles.text}>Rating: {book.rating}</Text>
        <Text style={styles.text}>{book.summary}</Text>
        <TouchableOpacity style={styles.button} onPress={borrowBook}>
          <Text style={styles.buttonText}>Borrow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
