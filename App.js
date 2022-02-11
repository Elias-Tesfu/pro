import React from 'react';
import { SafeAreaView, StyleSheet, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

import Home from './Screens/Home';
import Details from './Screens/Details';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen 
            name='Home' 
            component={Home} 
            options={{ 
              headerShown: false
             }} 
          />
          <Stack.Screen 
            name='Details'
            component={Details}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
