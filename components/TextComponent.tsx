// ✅ CORRETO
import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function TextComponent({ placeholder, value, onChangeText }: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}

      mode="flat"
      underlineColor="#ccc"
      activeUnderlineColor="#00BFFF" // cor quando focado
      selectionColor="#00BFFF" // cor do cursor
      placeholderTextColor={'#ccc'} // cor do texto placeholder
      textColor='white' // cor do texto
      style={styles.inputContainer}
    />
  );
}
const styles = StyleSheet.create({
  inputContainer: { 
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
});
