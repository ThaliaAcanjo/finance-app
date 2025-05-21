//estrutura do componente
import React from 'react';
import { Text, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootDrawerParamList = {
    Configurações: undefined;
};

type Props = DrawerScreenProps<RootDrawerParamList, 'Configurações'>;

export default function Settings({ navigation }: Props) {
    return (
        <SafeAreaView>
            <View >
                <Text>Configurações</Text>
            </View>
        </SafeAreaView>
    );
}