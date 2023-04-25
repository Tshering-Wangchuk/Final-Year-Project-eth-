import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Details() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text style={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel malesuada lorem. Aliquam euismod tellus quis augue dictum blandit.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'}
  });