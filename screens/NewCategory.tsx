import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, Modal, Pressable, Text, TouchableOpacity } from 'react-native';
import TextComponent from '../components/TextComponent';
import ButtonImageComponent from '../components/ButtonImageComponent';
import { colors } from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import IconPickerComponent from '../components/IconPickerComponent';

type Props = {
  visible: boolean;
  onClose: () => void;
  editingCategory?: null | { id: string; icone: string; descricao: string; cor: string };
};


export default function NewCategory({ visible, onClose, editingCategory }: Props) {
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000'); // Cor padrão
  const [icon, setIcon] = useState(''); // Ícone padrão
  const [modalPickerVisible, setmodalPickerVisible] = useState(false);

  function salvar() {
    if (!description || !color || !icon) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    // Resetar os campos
    setDescription('');
    setColor('#000'); // Cor padrão
    setIcon(''); // Ícone padrão
  }

  useEffect(() => {
    if (editingCategory) {
      setDescription(editingCategory.descricao);
      setColor(editingCategory.cor);
      setIcon(editingCategory.icone);
    } else {
      setDescription('');
      setColor('#000000');
      setIcon('');
    }
  }, [editingCategory]);


  return (
    // {/* Modal */}
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      { /* Clicar fora do modal → fecha */}
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.modal}>
        <Pressable onPress={() => { }}>
          <View style={styles.modal}>
            <Text style={styles.title}>Nova Categoria</Text>

            <View style={styles.camposView}>
              <View style={styles.inputContainer}>
                <TextComponent placeholder="Descrição" value={description} onChangeText={setDescription} />
              </View>
              <MaterialIcons name="circle" size={30} color={color} />
              {/* <TouchableOpacity
                style={styles.overlay}
                // activeOpacity={1}
                onPress={() => setmodalPickerVisible(false)}
              > */}
              <TouchableOpacity
                onPress={() => { setmodalPickerVisible(true); console.log('IconPickerComponent1') }}>
                {/* <ButtonImageComponent imageName="icons" /> */}
                {icon ? (
                  <MaterialIcons name={icon as any} size={30} color={color} />
                ) : (
                  <MaterialIcons name="category" size={30} color={color} />
                )}


              </TouchableOpacity>
              {/* </TouchableOpacity> */}

              <IconPickerComponent modalPickerVisible={modalPickerVisible} onClose={() => setmodalPickerVisible(false)} onSelect={setIcon} />

            </View>

            <View style={styles.buttons}>
              <Button title="Salvar" onPress={salvar} />
              <Button title="Cancelar" onPress={onClose} color="gray" />
            </View>

          </View>
        </Pressable >
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', //fundo escurecido
    justifyContent: 'flex-end',
  },
  flexGrow: {
    flex: 1, // isso é a área acima do modal
  },
  modal: {
    backgroundColor: colors.registerBackground,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.textLabelWhite,
  },
  camposView: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    //marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});