import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      
   
      <View style={styles.header}>
        <Text style={styles.headerText}>Quran</Text>
      </View>

     
      <View style={styles.lastReadSection}>
        <FontAwesome5 name="book-open" size={40} color="white" />
        <Text style={styles.lastReadText}>Last Read</Text>
        <Text style={styles.surahName}>Al Faatihah</Text>
        <Text style={styles.verseNumber}>Verse No. 7</Text>
        <Text style={styles.dateText}>Thu Feb 27 2025 9:31 AM</Text>
      </View>

   
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>Features</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('ReadQuran')}>
            <FontAwesome5 name="book-reader" size={24} color="black" />
            <Text style={styles.buttonText}>Read Quran</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('Search')}>
            <FontAwesome5 name="search" size={24} color="black" />
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureButton}>
            <FontAwesome5 name="bookmark" size={24} color="black" />
            <Text style={styles.buttonText}>Book Mark</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureButton}>
            <FontAwesome5 name="cogs" size={24} color="black" />
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flex: 2,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
  },
  lastReadSection: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  lastReadText: {
    color: '#bbb',
    fontSize: 16,
    marginTop: 10,
  },
  surahName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  verseNumber: {
    color: '#bbb',
    fontSize: 16,
  },
  dateText: {
    color: '#777',
    fontSize: 12,
    marginTop: 5,
  },
  featuresSection: {
    flex: 5,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureButton: {
    width: '48%',
    padding: 20,
    marginBottom: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default HomeScreen;
