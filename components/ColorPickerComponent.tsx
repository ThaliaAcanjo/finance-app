import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Pressable, Platform, KeyboardAvoidingView, FlatList } from 'react-native';
import { colors, fontSizes } from '../styles/globalStyles';
import { listColors } from '../utils/types';
import SwipeDownModal from '../components/SwipeDownModal';
        
type ColorPickerProps = {
  modalPickerVisible: boolean;
  onClose: () => void;
  onSelect: (color: string) => void;
  currentColor: string;  // nova prop
};

export default function IconPickerComponent({ modalPickerVisible, onClose, onSelect, currentColor }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');

  return (
    <SwipeDownModal visible={modalPickerVisible} onClose={onClose}>
      <Pressable onPress={onClose} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Escolha uma cor</Text>
          <View >
            <FlatList
              data={listColors}
              persistentScrollbar={true}
              scrollIndicatorInsets={{ right: 0 }}
              keyExtractor={(item) => item}
              numColumns={6}
              style={{ marginBottom: 30 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={{margin:7}} onPress={() => {onSelect(item); onClose()}}>
                  <View 
                    style={[styles.colorCircle, { backgroundColor: item }, currentColor === item && styles.selectedBorder]} />
                </TouchableOpacity>
              )}
            />            
          </View>
          <Text style={{ marginTop: 20, color: currentColor }}>
            Cor escolhida: {currentColor}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SwipeDownModal>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.registerBackground,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 'auto',
    maxHeight: 400,
    minHeight: 170,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },  
  title: {
    color: colors.textLabelWhite,
    fontSize: fontSizes.medium,
    marginBottom: 10,
  },    
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  selectedBorder: {
    borderColor: '#ffffff',
    borderWidth: 3,
  },
});
