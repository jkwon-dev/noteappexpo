import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import NoteAdd from './screens/NoteAdd';
import EditNote from './screens/EditNote';
import Header from './components/Header';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{
        headerTitle: () => <Header name="My Notes" />,
        headerStyle: {
          backgroundColor: '#abc4ff',
          height: 120,
        }
      }}/>
      <Stack.Screen name="NoteAdd" component={NoteAdd} options={{
        headerTitle: () => <Header name="Add Notes" />,
        headerStyle: {
          backgroundColor: '#abc4ff',
          height: 120,
        }
      }}/>
      <Stack.Screen name="Edit" component={EditNote} options={{
        headerTitle: () => <Header name="Edit Note" />,
        headerStyle: {
          backgroundColor: '#abc4ff',
          height: 120,
        }
      }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}


