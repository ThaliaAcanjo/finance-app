//estrutura do componente
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerScreenProps, DrawerItemList } from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import Categories from '../screens/Categories';
import Expenses from '../screens/Expenses';
import ExpenseResponsible from '../screens/ExpenseResponsible';
import Settings from '../screens/Settings';

const imageMap: Record<string, any> = {
    color: require('../assets/color.png'),
    icons: require('../assets/icons.png'),
    icone2: require('../assets/super.png'),
};

type DrawerParamList = {
    Home: undefined; // Define the routes and their params
    Despesas: undefined;
    Responsável: undefined;
    Configurações: undefined;
    Categorias: undefined;
};

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const Drawer = createDrawerNavigator<DrawerParamList>();

const MenuDrawer: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={(props) => (
                    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#1E1E1E' }}>
                      <View style={{ padding: 20, alignItems: 'center' }}>
                        <Image
                          source={imageMap['icone2']}
                          style={{ width: 60, height: 60, marginBottom: 20 }}
                        />
                      </View>
                      <DrawerItemList {...props} />
                    </DrawerContentScrollView>
                  )}
                  
                screenOptions={{
                    headerShown: true,
                    drawerStyle: {
                        backgroundColor: '#1E1E1E',
                        width: 240,
                    },
                    drawerLabelStyle: {
                        color: 'white',
                        fontSize: 16,
                    },
                    drawerActiveBackgroundColor: '#3E3E3E',
                    drawerActiveTintColor: 'white',
                    drawerInactiveTintColor: 'white',
                }}
                >
                <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={
                        { 
                            drawerLabel: (({focused}) => <Text style={{color: focused ? 'white' : 'white'}}> Home</Text>),
                            drawerIcon: (({focused}) => (
                                <View style={{ flexDirection: 'row' }}>
                                  <MaterialIcons  name="home" color={focused ? 'white' : 'white'} size={24} />                                  
                                </View>
                              ))                        
                    }}

                />
                <Drawer.Screen
                    name="Categorias"
                    component={Categories}
                    options={{ drawerLabel: 'Categorias' }}
                />
                <Drawer.Screen
                    name="Despesas"
                    component={Expenses}
                    options={{ drawerLabel: 'Despesas' }}
                />
                <Drawer.Screen
                    name="Responsável"
                    component={ExpenseResponsible}
                    options={{ drawerLabel: 'Responsável' }}
                />
                <Drawer.Screen
                    name="Configurações"
                    component={Settings}
                    options={{ drawerLabel: 'Configurações' }}
                />
            </Drawer.Navigator>
        </SafeAreaView>
    );
}

export default MenuDrawer;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
        //height: 100,
        //width: 100,
    },

    image: {
        width: 40,
        height: 40,
    },
});
