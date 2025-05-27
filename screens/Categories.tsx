//estrutura do componente
import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles, colors, fontSizes } from '../styles/globalStyles';
import { hexToRgba, colorWhite } from '../utils/functions';

import { useCategory, CategoryContext } from '../context/CategoryContext';
import Category from './Category';

type objCategory = {
  id: string;
  description: string;
  icon: string;
  color: string;
};

type RootDrawerParamList = {
  Categorias: undefined;
  Configurações: undefined;
};

type Props = DrawerScreenProps<RootDrawerParamList, 'Categorias'>;
export default function Categories({ navigation }: Props) {
  const context = React.useContext(CategoryContext);
  if (!context) { throw new Error('Category must be used within a CategoryProvider'); }
  const { deleteCategory } = context;

  const { categories } = useCategory();
  const [data, setData] = useState<objCategory[]>(categories);

  const [editingCategory, setEditingCategory] = useState<null | { id: string; icon: any; description: string; color: string }>(null);
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [menuVisible, setMenuVisible] = useState(false); // para o modal de menu

  // const itemRefs = useRef<Record<string, any>>({});
  const itemRefs = useRef<Record<string, React.ComponentRef<typeof TouchableOpacity>>>({});

  const openMenu = (id: string) => {
    // console.log(`openMenu: ${id}`);
    const itemRef = itemRefs.current[id];

    if (itemRef) {
      itemRef.measure((fx: number, fy: number, width: number, height: number, px: number, py: number) => {
        setMenuPosition({ x: px - (width * 2) - 10, y: py });
        // console.log(`fx: ${fx}, fy: ${fy}, width: ${width}, height: ${height}, px: ${px}, py: ${py}`);
        setSelectedItem(id);
        setMenuVisible(true);
      });
    }
  };

  const renderItem = ({ item }: { item: objCategory }) => (
    <View style={styles.row}>

      <View style={[styles.color, { backgroundColor: colorWhite(item.color, 15), }]}  >
        <MaterialIcons name={item.icon as any} size={20} color={"#242729"} />
      </View>
      <Text style={styles.description}>{item.description}</Text>

      {/* posteriormente pode ter subcategorias */}
      <View style={[styles.color, { backgroundColor: hexToRgba(colorWhite(item.color, 15), 0.1), }]}  >
        <MaterialIcons name="local-offer" size={20} color={colorWhite(item.color, 15)} />
      </View>

      <TouchableOpacity
        style={styles.option}
        ref={(ref) => {
          if (ref) itemRefs.current[item.id] = ref;
        }}
        // ref={(ref: React.ComponentRef<typeof TouchableOpacity> | null) => {
        //   if (ref) {
        //     itemRefs.current[item.id] = ref;
        //   } else {
        //     delete itemRefs.current[item.id]; // opcional para limpar quando for null
        //   }
        // }}

        onPress={() => openMenu(item.id)}
      >
        <MaterialIcons name="more-vert" size={20} color={colors.icons} />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    setData(categories);
  }, [categories]);


  const goToCategory = (item: { id: string; icon: any; description: string; color: string } | null) => {
    setEditingCategory(item);
    setModalCategoryVisible(true);
  }

  return (
    <SafeAreaView edges={['bottom']} style={globalStyles.container} >
      <View >
        {/* o touch deve ficar em cima fixo */}
        <TouchableOpacity style={styles.plusIcon}
          onPress={() => goToCategory(null)}>
          <MaterialIcons name="add" size={30} color={colors.iconPlus} />
        </TouchableOpacity>

        <Category
          visible={modalCategoryVisible}
          onClose={() => setModalCategoryVisible(false)}
          category={editingCategory} />

        <FlatList
          data={data}
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
                  const item = data.find((item) => item.id === selectedItem);
                  if (item) goToCategory(item);
                }} style={styles.buttons}>
                  <MaterialIcons name="edit" size={20} color={colors.icons} />
                  <Text style={styles.modalOption}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setMenuVisible(false);
                    const item = data.find((item) => item.id === selectedItem);
                    if (item) {
                      deleteCategory(item.id);
                    }
                  }} style={styles.buttons}>
                  <MaterialIcons name="delete" size={20} color={colors.icons} />
                  <Text style={styles.modalOption}>Excluir</Text>
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
    width: 35,
    height: 35,
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
