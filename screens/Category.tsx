import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, Modal, Pressable, Text, TouchableOpacity } from 'react-native';
import TextComponent from '../components/TextComponent';
import ButtonImageComponent from '../components/ButtonImageComponent';
import { colors } from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import IconPickerComponent from '../components/IconPickerComponent';
import ColorPickerComponent from '../components/ColorPickerComponent';
import { CategoryContext } from '../context/CategoryContext';
import { v4 as uuidv4 } from 'uuid'; // Para gerar ID único
import { nanoid } from 'nanoid';


type Props = {
  visible: boolean;
  onClose: () => void;
  category?: null | { id: string; icon: string; description: string; color: string };
};


export default function Category({ visible, onClose, category }: Props) {
  const context = React.useContext(CategoryContext);
  if (!context) { throw new Error('Category must be used within a CategoryProvider');}
  const { addCategory, updateCategory } = context;

  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000'); // Cor padrão
  const [icon, setIcon] = useState(''); // Ícone padrão
  const [modalIconPickerVisible, setModalIconPickerVisible] = useState(false);
  const [modalColorPickerVisible, setModalColorPickerVisible] = useState(false);  

  
  function salvar() {
    if (!description || !color || !icon) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    console.log('salvar', description, color, icon);
    
    if (category) {
      updateCategory(category.id, { description, color, icon });
    } else {      
      addCategory({ id: uuidv4(), description, color, icon });
    }

    onClose();

    // Resetar os campos
    setDescription('');
    setColor('#000'); // Cor padrão
    setIcon(''); // Ícone padrão
  }

  useEffect(() => {
    if (category) {
      setDescription(category.description);
      setColor(category.color);
      setIcon(category.icon);
    } else {
      setDescription('');
      setColor('#000000');
      setIcon('');
    }
  }, [category]);


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