import 'react-native-gesture-handler'
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MenuDrawer from './navigation/MenuDrawer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; // use esse com Expo


export default function App() {
  return (
    <SafeAreaProvider >
      <NavigationContainer >
        <MenuDrawer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#1C1C1E'
  },
});
