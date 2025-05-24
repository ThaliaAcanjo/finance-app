import { StatusBar } from 'expo-status-bar';
import {
  Alert, Image, TextInput, StyleSheet, Text, View, Button, ScrollView, Switch,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
}
  from 'react-native';

import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

// import DrawerToggleButton from '../components/DrawerToggleButton';
import { globalStyles } from '../styles/globalStyles';

type RootDrawerParamList = {
  Home: undefined;
  Configurações: undefined;
};

type Props = DrawerScreenProps<RootDrawerParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [usuario, setUsuario] = useState('A')
  const [ligado, setLigado] = useState(true)

  
  const [campo1, setCampo1] = useState('');
  const [campo2, setCampo2] = useState('');
  

  function handleSwitch() {
    setLigado(!ligado)
  }

  return (
    <SafeAreaView >
      {/* style={globalStyles.container}> */}
      <View >
        {/* <DrawerToggleButton /> */}
        <Text style={styles.title}>Tela Inicial</Text>
        {/* <Button title="☰ Abrir Menu" onPress={() => navigation.openDrawer()} />          */}
          {/* <Icon
            name="plus"
            size={30}
            color="#fff"
            style={styles.botaoMais}
            onPress={() => navigation.navigate('Categorias')}/> */}
      </View>
    </SafeAreaView>



    /*
    <ScrollView>
      <View style={[styles.container, {backgroundColor:'red'}]}>
        
        <Switch 
          value={ligado}
          onValueChange={handleSwitch}
          >
        </Switch>

        <Image
          source={imgSuper}
          style={{display: ligado ? "flex" : "none"}}
        />
        <TextInput
          style={styles.input}
          onChange={(text)=>setUsuario(text.nativeEvent.text)}
          keyboardType="default"
          placeholder='digite seu numero'
          value={usuario}
        />
        <Button
          title='click aqui'
          onPress={()=>{Alert.alert('valor atual', usuario)}}
        />


        <View
          onTouchStart={(event)=>{
            Alert.alert('TOQUE', 'Clique iniciado')
          }}
          onTouchEnd={(event)=>{
            Alert.alert('TOQUE', 'Toque finalizado')
          }}
        >
        <Text style={[styles.texto, styles.border]}>
            oi
        </Text>
        </View>
        
          <Text
            selectable={false}
            onPress={()=>{console.log("pressionado")}}
            onLongPress={()=>{console.log("pressionamento longo")}}
          >Open up App.tsx to start working on your app!
          </Text>
        <StatusBar style="auto" />
        
        <Text>
          <Text>ola</Text>
          <Text> mundo</Text>
        </Text>

        <View>
          <Text>ola</Text>
          <Text>mundo</Text>
        </View>

      </View>
    </ScrollView>
    */
  );
}

const styles = StyleSheet.create({
  container: {
   // flex: 1,
    backgroundColor: '#1C1C1E',
    color: '#fff',
    width: '100%',
    height: '100%',
  },
  title: {
    // marginTop: 60,
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
  },  
});