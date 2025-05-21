// screens/CadastroScreen.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, Modal, Pressable, Text } from 'react-native';
import TextComponent from '../components/TextComponent';
import ButtonImageComponent from '../components/ButtonImageComponent';

type Props = {
  visible: boolean;
  onClose: () => void;
};


export default function NewCategory({ visible, onClose }: Props) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  function salvar() {
    if (!descricao || !valor) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    // Aqui você pode enviar os dados para uma API ou salvar no estado
    Alert.alert('Salvo com sucesso', `Descrição: ${descricao}\nValor: R$ ${valor}`);

    // Resetar os campos
    setDescricao('');
    setValor('');
  }

  return (
    // {/* Modal */}
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      { /* Clicar fora do modal → fecha */}
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.modal}>
        <Pressable onPress={() => { }}>
          <View style={styles.modal}>
            <Text style={styles.title}>Categoria</Text>

            <View style={styles.camposView}>
              <View style={styles.inputContainer}>
                <TextComponent placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
              </View>
              <ButtonImageComponent imageName="color" />
              <ButtonImageComponent imageName="icons" />
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
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
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