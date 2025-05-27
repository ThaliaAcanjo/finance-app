import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, Modal, Pressable, Text, TouchableOpacity } from 'react-native';
import { colors } from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { useCategory, CategoryContext } from '../context/CategoryContext';
import { v4 as uuidv4 } from 'uuid'; // Para gerar ID único

import TextComponent from '../components/TextComponent';
import IconPickerComponent from '../components/IconPickerComponent';
import ColorPickerComponent from '../components/ColorPickerComponent';
import { listColors } from '../utils/types';

type Props = {
  visible: boolean;
  onClose: () => void;
  category?: null | { id: string; icon: string; description: string; color: string };
};

export default function Category({ visible, onClose, category }: Props) {
  const colorInitial = category ? category.color : listColors[0]; // Cor inicial se houver categoria
  const iconInitial = category ? category.icon : 'category'; // Ícone inicial se houver categoria

  const context = React.useContext(CategoryContext);
  if (!context) { throw new Error('Category must be used within a CategoryProvider');}  
  const { addCategory, updateCategory } = context;
  const { categories } = useCategory();

  const [id, setId] = useState(category ? category.id : uuidv4()); // ID inicial se houver categoria
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(colorInitial); // Cor padrão
  const [icon, setIcon] = useState(iconInitial); // Ícone padrão
  const [modalIconPickerVisible, setModalIconPickerVisible] = useState(false);
  const [modalColorPickerVisible, setModalColorPickerVisible] = useState(false);  

  function salvar() {
    // console.log('salvar', 'desc', description, 'color', color, 'icon', icon);
    if (!description || !color || !icon) {
      Alert.alert('Erro', 'Preencha todos os campos');      
      return;
    }

    if (description.length < 3) {
      Alert.alert('Erro', 'A descrição deve ter pelo menos 3 caracteres');
      return;
    }
        
    if (category) {
      const exists = categories.some(cat => cat.description.toLowerCase() === description.toLowerCase() && cat.id != id);
      if (exists) {

      }
      updateCategory(category.id, { description, color, icon });
    } else {
      // verificar se já existe uma categoria com a mesma descrição
      const exists = categories.some(cat => cat.description.toLowerCase() === description.toLowerCase());
      if (exists) {
        Alert.alert('Erro', 'Já existe uma categoria com essa descrição');
        return;
      }            
      addCategory({ id, description, color, icon }); //id: uuidv4()
    }

    onClose();

    // Resetar os campos
    setDescription('');
    setColor(colorInitial); // Cor padrão
    setIcon(iconInitial); // Ícone padrão
  }

  useEffect(() => {
    if (category) {
      setId(category.id); // Atualiza o ID se for uma categoria existente      
      setDescription(category.description);
      setColor(category.color);
      setIcon(category.icon);
    } else {
      setId(uuidv4()); // Gera um novo ID se não for uma categoria existente      
      setDescription('');
      setColor(colorInitial);
      setIcon(iconInitial);
    }
  }, [category]);

  return (
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
              
              <TouchableOpacity
                onPress={() => { setModalColorPickerVisible(true)}}>
                <MaterialIcons name="circle" size={30} color={color} />  
              </TouchableOpacity>              
              <ColorPickerComponent 
                modalPickerVisible={modalColorPickerVisible} 
                onClose={() => setModalColorPickerVisible(false)} 
                onSelect={setColor} 
                currentColor={color}  // <-- passe a cor atual aqui
                />           
              
              <TouchableOpacity
                onPress={() => { setModalIconPickerVisible(true) }}>
                {/* <ButtonImageComponent imageName="icons" /> */}
                {icon ? (
                  <MaterialIcons name={icon as any} size={30} color={color} />
                ) : (
                  <MaterialIcons name="category" size={30} color={color} />
                )}
              </TouchableOpacity>
              <IconPickerComponent modalPickerVisible={modalIconPickerVisible} onClose={() => setModalIconPickerVisible(false)} onSelect={setIcon} />
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