//estrutura do componente
import React, { useState, useRef } from 'react';
import { Text, View, Pressable, TouchableOpacity, Image, FlatList, StyleSheet, Modal } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import NewCategory from './NewCategory';
import { globalStyles, colors, fontSizes } from '../styles/globalStyles';
import { plugins } from '../babel.config';
import { hexToRgba } from '../utils/functions';


const dados = [
  { id: '1', icone: "category", descricao: 'Alimentação', cor: '#BA55D3' },
  { id: '2', icone: "circle", descricao: 'Transporte', cor: '#FF69B4' },
  { id: '3', icone: "restaurant", descricao: 'Transporte', cor: '#40E0D0' },
  { id: '4', icone: "circle", descricao: 'Transporte', cor: '#DC143C' },
  { id: '5', icone: "circle", descricao: 'Transporte', cor: '#FFA500' },
  { id: '6', icone: "circle", descricao: 'Transporte', cor: '#90EE90' },
  { id: '7', icone: "circle", descricao: 'Alimentação', cor: '#00BFFF' },
  { id: '8', icone: "circle", descricao: 'Alimentação', cor: '#BA55D3' },
  { id: '9', icone: "circle", descricao: 'Alimentação', cor: '#FF69B4' },
  { id: '10', icone: "circle", descricao: 'Alimentação', cor: '#40E0D0' },
  { id: '11', icone: "circle", descricao: 'Transporte', cor: '#DC143C' },
  { id: '12', icone: "circle", descricao: 'Transporte', cor: '#FFA500' },
  { id: '13', icone: "circle", descricao: 'Transporte', cor: '#90EE90' },
  { id: '14', icone: "circle", descricao: 'Transporte', cor: '#00BFFF' },
  { id: '15', icone: "circle", descricao: 'Transporte', cor: '#BA55D3' },
  { id: '16', icone: "circle", descricao: 'Alimentação', cor: '#90EE90' },
  { id: '17', icone: "circle", descricao: 'Alimentação', cor: '#40E0D0' },
  { id: '18', icone: "circle", descricao: 'Transporte', cor: '#DC143C' },
  { id: '19', icone: "circle", descricao: 'Transporte', cor: '#FFA500' },
  { id: '20', icone: "circle", descricao: 'Transporte', cor: '#90EE90' },
  { id: '21', icone: "circle", descricao: 'Transporte', cor: '#00BFFF' },
];


type RootDrawerParamList = {
  Categorias: undefined;
  Configurações: undefined;
};

type Props = DrawerScreenProps<RootDrawerParamList, 'Categorias'>;
export default function Categories({ navigation }: Props) {
  const [editingCategory, setEditingCategory] = useState<null | { id: string; icone: any; descricao: string; cor: string }>(null);
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
  // const closeModal = () => setModalCategoryVisible(false);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [menuVisible, setMenuVisible] = useState(false); // para o modal de menu

  const itemRefs = useRef<Record<string, any>>({});

  const openMenu = (id: string) => {
    const itemRef = itemRefs.current[id];

    if (itemRef) {
      itemRef.measure((fx: number, fy: number, width: number, height: number, px: number, py: number) => {
        setMenuPosition({ x: px - (width * 2) - 10, y: py });
        //px - (width*2), y: py + height + fy});
        console.log(`fx: ${fx}, fy: ${fy}, width: ${width}, height: ${height}, px: ${px}, py: ${py}`);
        setSelectedItem(id);
        setMenuVisible(true);
      });
    }
  };

  const renderItem = ({ item }: { item: { id: string; icone: any; descricao: string; cor: string } }) => (
    <View style={styles.row}>
      <View style={[styles.color, { backgroundColor: hexToRgba(item.cor, 0.15), }]}  >
        <Image source={item.icone} style={styles.icon} />
      </View>
      <Text style={styles.description}>{item.descricao}</Text>

      {/* posteriormente pode ter subcategorias */}
      <View style={[styles.color, { backgroundColor: hexToRgba(item.cor, 0.15), }]}  >
        <MaterialIcons name="local-offer" size={25} color={item.cor} />
      </View>
      <TouchableOpacity
        style={styles.option}
        ref={(ref) => {
          if (ref) itemRefs.current[item.id] = ref;
        }}
        onPress={() => openMenu(item.id)}
      >
        <MaterialIcons name="more-vert" size={20} color={colors.icons} />
      </TouchableOpacity>
    </View>
  );

  const editCategory = (item: { id: string; icone: any; descricao: string; cor: string }) => {
    setEditingCategory(item);
    setModalCategoryVisible(true);
  };
  const newCategory = () => {
    setEditingCategory(null);
    setModalCategoryVisible(true);
  }

  const closeMenu = () => setMenuVisible(false);

  return (
    <SafeAreaView edges={['bottom']} style={globalStyles.container} >
      <View >
        {/* o touch deve ficar em cima fixo */}
        <TouchableOpacity style={styles.plusIcon}
          onPress={() => newCategory()}>
          <MaterialIcons name="add" size={30} color={colors.iconPlus} />
        </TouchableOpacity>

        <NewCategory 
              visible={modalCategoryVisible} 
              onClose={() => setModalCategoryVisible(false)} 
              editingCategory={editingCategory} />

        <FlatList
          data={dados}
          persistentScrollbar={true}
          scrollIndicatorInsets={{ right: 0 }}
          indicatorStyle='white'
          //sem linha de separação
          ItemSeparatorComponent={null}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <Modal visible={menuVisible} transparent animationType="fade">
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          >
            <View style={{ position: 'absolute', top: menuPosition.y, left: menuPosition.x }}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.modalBox}
                onPress={() => { }} // impede que o toque feche o modal
              >
                <TouchableOpacity onPress={() => {
                  setMenuVisible(false);
                  const item = dados.find((item) => item.id === selectedItem);
                  if (item) editCategory(item);
                }}>
                  <Text style={styles.modalOption}>✏️ Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  // console.log("Excluir", selectedItem);
                  setMenuVisible(false);
                }}>
                  <Text style={styles.modalOption}>🗑️ Excluir</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal >
      </View >
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  description: {
    flex: 1, // ocupa todo espaço entre o ícone e a cor
    fontSize: 16,
    color: colors.textLabelWhite
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: functions.hexToRgba(item.cor, 0.5),
  },
  option: {
    padding: 5,
  },
  plusIcon: {
    // position: 'absolute', 
    top: 10,
    right: 10,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
  },
  modalBox: {
    position: 'absolute',
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    width: 100,
    flexDirection: 'column',
    fontSize: fontSizes.large,
  },
  modalOption: {
    color: '#ccc',
    paddingVertical: 6,
    fontSize: 16,
  },
});
