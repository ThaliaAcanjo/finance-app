import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, Platform, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { materialIconNames } from '../utils/materialIconsList'; // seu arquivo de nomes
import { globalStyles, colors } from '../styles/globalStyles';

type IconPickerProps = {
    modalPickerVisible: boolean;
    onClose: () => void;
    onSelect: (iconName: string) => void;
};

export default function IconPickerComponent({ modalPickerVisible, onClose, onSelect }: IconPickerProps) {
    //modalPickerVisible: boolean, onClose: () => void, onSelect: (iconName: string) => void) => {//{ onSelect }: { onSelect: (iconName: string) => void }) => {
    const [search, setSearch] = useState('');

    const filteredIcons = materialIconNames.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Modal visible={modalPickerVisible} animationType="fade" transparent>
            <Pressable onPress={onClose} style={styles.overlay} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.centeredView}
            >
                <View style={styles.centeredView}>
                    <View style={styles.container}>
                        <TextInput
                            placeholder="Buscar ícone..."
                            value={search}
                            onChangeText={setSearch}
                            style={styles.input}
                            placeholderTextColor="#ccc"
                        />
                        <FlatList
                            data={filteredIcons}
                            persistentScrollbar={true}
                            scrollIndicatorInsets={{ right: 0 }}

                            keyExtractor={(item) => item}
                            numColumns={4}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.iconContainer} onPress={() => onSelect(item)}>
                                    <MaterialIcons name={item as any} size={30} color="#ccc" />
                                    {/* <Text style={styles.iconLabel}>{item}</Text> */}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};



const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)', //fundo escurecido
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 10,
        backgroundColor: '#1C1C1E',
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        width: 350,
        height: 430,
    },
    input: {
        backgroundColor: '#222',
        color: 'white',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
        width: 70,
    },
    iconLabel: {
        fontSize: 10,
        textAlign: 'center',
        marginTop: 4,
        color: colors.textLabelWhite,
    },
});
