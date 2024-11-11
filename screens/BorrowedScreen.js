import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { styles } from '../styles';

export default function BorrowedScreen() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'borrowedBooks'), (querySnapshot) => {
      const booksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBorrowedBooks(booksList);
    });

    return () => unsubscribe();
  }, []);

  const returnBook = async (bookId) => {
    try {
      await deleteDoc(doc(db, 'borrowedBooks', bookId));
      Alert.alert('Success', 'Book returned successfully.');
    } catch (error) {
      console.error("Error returning book:", error);
      Alert.alert('Error', 'There was a problem returning the book.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.name}</Text>
      <TouchableOpacity style={styles.returnButton} onPress={() => returnBook(item.id)}>
        <Text style={styles.returnButtonText}>Return</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
