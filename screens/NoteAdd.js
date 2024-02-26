import { View, Text, Keyboard, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../config'

const NoteAdd = () => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  
  const handleAdd = () => {
    firebase.firestore()
    .collection('notes')
    .add({
      title, note,
    })
    .then(() => {
      setTitle('')
      setNote('')
      Keyboard.dismiss();
    })
    .catch((error) => {
      alert(error)
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Title'
        value={title}
        onChangeText={(text)=> setTitle(text)}
        style={styles.inputTitle}
      />
      <TextInput
        placeholder='Note'
        value={note}
        onChangeText={(text)=> setNote(text)}
        style={styles.inputNote}
        multiline={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#d7e3fc',
  },
  inputTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    height: 60,
    width: '80%',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fff'
  },
  inputNote:{
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    height: 200,
    width: '80%',
    borderRadius: 20,
    paddingTop: 20,
    padding: 10,
    backgroundColor: '#fff'
  },
  button:{
    backgroundColor: '#b6ccfe',
    borderRadius:10,
    marginTop: 20,
    height: 55,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    shadowColor: 'blue',
  },
  buttonText:{
    fontSize: 22, 
    color: 'white',
    fontWeight: 'bold'
  },
})

export default NoteAdd