import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ReadQuran from './screens/ReadQuranScreen';
import Search from './screens/Search';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name='ReadQuran' component={ReadQuran} />
      <Stack.Screen name='Search' component={Search} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;