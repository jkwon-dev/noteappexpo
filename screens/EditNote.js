import { View, Text, StyleSheet,TextInput, TouchableOpacity  } from 'react-native'
import React ,{useState}from 'react'
import {firebase} from '../config'
import { useNavigation } from '@react-navigation/native'

const Detail = ({route}) => {
    const navigation = useNavigation();
    const [noteText, setNoteText] = useState(route.params.item.note);
    const [noteTitle, setNoteTitle] = useState(route.params.item.title);

    const handleEdit = () => {
        if(noteTitle && noteTitle.length > 0) {
        firebase.firestore()
        .collection('notes')
        .doc(route.params.item.id)
        .update({
            title: noteTitle,
            note: noteText
        })
        .then(() => {
            navigation.navigate('Home');
        })
        .catch((error) => {
            alert(error);
        })
        }
    }

    const handleDelete = () => {
        firebase.firestore()
        .collection('notes')
        .doc(route.params.item.id)
        .delete()
        .then(() => {
            navigation.navigate('Home')
        })
        .catch((error) => {
            alert(error)
        })
    }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Title'
        value={noteTitle}
        onChangeText={(text)=> setNoteTitle(text)}
        style={styles.inputTitle}
      />
      <TextInput
        placeholder='Note'
        value={noteText}
        onChangeText={(text)=> setNoteText(text)}
        style={styles.inputNote}
        multiline={true}
      />
      <View style={styles.buttonView}>
      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      </View>
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
      width: 140,
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
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '98%'
    }
  })

export default Detail