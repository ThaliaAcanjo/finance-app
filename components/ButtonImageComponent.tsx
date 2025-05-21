//estrutura do componente
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const imageMap: Record<string, any> = {
    color: require('../assets/color.png'),
    icons: require('../assets/icons.png'),
    icone2: require('../assets/super.png'),
  };
  
  type Props = {
    imageName?: keyof typeof imageMap;
  };
  
  export default function ButtonImageComponent({ imageName = 'color'} : Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    style={styles.image}
                    source={imageMap[imageName]} // Use require to load the image
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
        //height: 100,
        //width: 100,
    },

    image: {
        width: 40,
        height: 40,
    },
});