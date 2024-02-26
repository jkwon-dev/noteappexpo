import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config';
import { FlashList } from '@shopify/flash-list';
import { FontAwesome } from '@expo/vector-icons';


const Home = () => {
  const [notes,setNote] = useState([]);
  const navigation = useNavigation();

  useEffect(()=> {
    firebase.firestore()
    .collection('notes')
    .onSnapshot((querySnapshot) => {
        const newNotes = [];
        querySnapshot.forEach((doc) => {
          const {note, title} = doc.data();
          newNotes.push({note, title, id: doc.id})
        });
        setNote(newNotes);
    });
  },[])
 
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
       <TouchableOpacity style={styles.addButton} onPress={()=> navigation.navigate('NoteAdd')}>
       <FontAwesome name="pencil-square-o" size={24} color="black" />
      </TouchableOpacity>
      </View>
      <FlashList  
        data={notes}
        numColumns={1}
        estimatedItemSize={20}
        renderItem={({item}) => (
          <View style={styles.noteView}>
            <Pressable style={styles.pressView} onPress={()=> navigation.navigate('Edit', {item})}>
            <Text style={styles.noteTitle}>
              {item.title}
            </Text>
            <Text style={styles.noteDescription}>
              {item.note}
            </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:'#d7e3fc',
  },
  noteView:{
    flex:1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
    alignItems: 'center'
  },
  pressView: {
    alignSelf: 'flex-start'
  },
  noteTitle:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  noteDescription:{
    fontSize: 16,
    marginTop: 5
  },
  iconContainer: {
    flexDirection: 'row-reverse'
  },
  addButton: {
    width: 44,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation:7,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }
  
})

export default Home