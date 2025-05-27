//estrutura do componente
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerScreenProps, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import Categories from '../screens/Categories';
import Expenses from '../screens/Expenses';
import ExpenseResponsible from '../screens/ExpenseResponsible';
import Settings from '../screens/Settings';
import { globalStyles, colors } from '../styles/globalStyles';
import { hexToRgba } from '../utils/functions';

type DrawerParamList = {
    Home: undefined; // Define the routes and their params
    Despesas: undefined;
    Responsável: undefined;
    Configurações: undefined;
    Categorias: undefined;
};

// type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const Drawer = createDrawerNavigator<DrawerParamList>();

const MenuDrawer: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1, padding: 0, margin: 0 }}>
            <Drawer.Navigator
                initialRouteName="Categorias"
                drawerContent={(props) => (
                    // 1E1E1E
                    <DrawerContentScrollView
                        {...props}
                        contentContainerStyle={{ flex: 1, padding: 0, margin: 0 }}
                    >
                        <DrawerItemList {...props} />
                    </DrawerContentScrollView>
                )}

                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.background3,
                    },
                    // headerBackButtonDisplayMode: 'minimal',
                    headerStatusBarHeight: 0,
                    headerTintColor: colors.icons,
                    headerTitleStyle: {
                        color: 'white',
                    },
                    drawerStyle: {
                        backgroundColor: '#1C1C1E',//'#1E1E1E',
                        width: 300,
                        padding: 0,
                        margin: 0
                    },
                    // drawerLabelStyle: {
                        // fontSize: 16,
                    // },
                    drawerActiveBackgroundColor: hexToRgba(colors.menuColorActive, 0.2),
                    drawerActiveTintColor: colors.menuColorActive,
                    drawerInactiveTintColor: 'white',
                    drawerItemStyle: {
                        borderRadius: 0,
                        borderBottomRightRadius: 30,
                        borderTopRightRadius: 30,
                        height: 50,
                    },
                    drawerContentContainerStyle: {
                        padding: 0,
                        margin: 0,
                    },
                    drawerContentStyle: {
                        padding: 0,
                        margin: 0
                    },
                }}
            >
                <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={
                        {
                            drawerLabel: (({ focused }) => <Text style={{ color: focused ? colors.menuColorActive : 'white' }}> Home</Text>),
                            drawerIcon: (({ focused }) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <MaterialIcons name="home" color={focused ? colors.menuColorActive : 'white'} size={24} />
                                </View>
                            ))
                        }}

                />
                <Drawer.Screen
                    name="Categorias"
                    component={Categories}
                    options={{ 
                        drawerLabel: 'Categorias', 
                        drawerIcon: ({ focused }) => (
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialIcons name="category" color={focused ? colors.menuColorActive : 'white'} size={24} />
                            </View>
                        )
                    }}                    
                />
                <Drawer.Screen
                    name="Despesas"
                    component={Expenses}
                    options={{ 
                        drawerLabel: 'Despesas',
                        drawerIcon: ({ focused }) => (
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialIcons name="attach-money" color={focused ? colors.menuColorActive : 'white'} size={24} />
                            </View>
                        )
                    }}
                />
                <Drawer.Screen
                    name="Responsável"
                    component={ExpenseResponsible}
                    options={{ 
                        drawerLabel: 'Responsável',
                        drawerIcon: ({ focused }) => (
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialIcons name="person" color={focused ? colors.menuColorActive : 'white'} size={24} />
                            </View>
                        )
                    }}
                />
                <Drawer.Screen
                    name="Configurações"
                    component={Settings}
                    options={{ drawerLabel: 'Configurações',
                        drawerIcon: ({ focused }) => (
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialIcons name="settings" color={focused ? colors.menuColorActive : 'white'} size={24} />
                            </View>
                    )}}
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
    },

    image: {
        width: 40,
        height: 40,
    },
});
