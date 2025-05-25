import 'react-native-gesture-handler'
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // use esse com Expo
import { colors } from './styles/globalStyles';

import MenuDrawer from './navigation/MenuDrawer';
import { CategoryProvider } from './context/CategoryContext'; // Certifique-se de que o caminho está correto


export default function App() {
  return (
    <SafeAreaProvider >
      <View style={styles.container}>
        <CategoryProvider>
          <NavigationContainer >
            <MenuDrawer />
          </NavigationContainer>
        </CategoryProvider>
      </View>
    </SafeAreaProvider >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background3
  },
});
