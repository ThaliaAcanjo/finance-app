//estrutura do componente
import React from 'react';
import { Text, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootDrawerParamList = {
    Categorias: undefined;
    Configurações: undefined;
};

type Props = DrawerScreenProps<RootDrawerParamList, 'Categorias'>;

export default function Categories({ navigation }: Props) {
    return (
        <SafeAreaView>
            <View >
                <Text>categorias</Text>
            </View>
        </SafeAreaView>
    );
}