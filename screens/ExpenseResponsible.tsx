//estrutura do componente
import React from 'react';
import { Text, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootDrawerParamList = {
    Responsável: undefined;
};

type Props = DrawerScreenProps<RootDrawerParamList, 'Responsável'>;

export default function ExpenseResponsible({ navigation }: Props) {
    return (
        <SafeAreaView>
            <View >
                <Text>Responsável</Text>
            </View>
        </SafeAreaView>
    );
}