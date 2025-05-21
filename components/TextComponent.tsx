// ✅ CORRETO
import React from 'react';
import { TextInput } from 'react-native';

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
      style={{
        borderWidth: 1,
        borderColor: '#aaa',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
      }}
    />
  );
}
