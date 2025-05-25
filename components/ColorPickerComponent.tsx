import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Pressable, Platform, KeyboardAvoidingView, FlatList } from 'react-native';
// import Modal from 'react-native-modal';

import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles, colors, fontSizes } from '../styles/globalStyles';
import SwipeDownModal from '../components/SwipeDownModal';
        
// const listColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#000000', '#FFFFFF'];
const listColors = [
  '#EE534F', '#EC407A', '#AA47BC', '#7E57C1', '#5C6BC0', '#00E676', 
  '#E53935', '#D81A60', '#8E24AA', '#5C36AC', '#3949AB', '#01C853', 
  '#C62827', '#AD1457', '#6A1B9A', '#45289F', '#283593', '#757575', 
  '#42A5F6', '#26A59A', '#25C6DA', '#66BB6A', '#9CCC66', '#FFA728', 
  '#1C89E5', '#00887A', '#00ACC2', '#18A05E', '#7BB441', '#FB8C00', 
  '#1564C0', '#00695B', '#00848F', '#2F7D32', '#548B2E', '#EF6C00', 
  '#29B5F6', '#D4E056', '#FCC624', '#FF7143', '#8C6E63', '#77909D', 
  '#039BE6', '#DCE775', '#FFB200', '#F5511E', '#6D4D42', '#546F7A', 
  '#0277BD', '#9E9E24', '#FF8E01', '#D74315', '#4D342F', '#36474F', 
];


type ColorPickerProps = {
  modalPickerVisible: boolean;
  onClose: () => void;
  onSelect: (color: string) => void;
  currentColor: string;  // nova prop
};

export default function IconPickerComponent({ modalPickerVisible, onClose, onSelect, currentColor }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');

  return (
  // <Modal
  //     isVisible={modalPickerVisible}
  //     onBackdropPress={onClose}     // Tocar fora
  //     onSwipeComplete={onClose}     // Arrastar pra baixo
  //     swipeDirection="down"         // Direção de swipe
  //     style={styles.modal}
  //     propagateSwipe></Modal>
    <SwipeDownModal visible={modalPickerVisible} onClose={onClose}>
      <Pressable onPress={onClose} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // style={styles.centeredView}
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
