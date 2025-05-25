import React, { useRef } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

type Props = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function SwipeDownModal({ visible, onClose, children }: Props) {
  const translateY = useRef(new Animated.Value(0)).current;

  const resetPosition = Animated.timing(translateY, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  });

  const closeModal = Animated.timing(translateY, {
    toValue: 1000,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 5,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          translateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        // console.log(gesture.dy);
        if (gesture.dy > 100) {
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            translateY.setValue(0);
            onClose();
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }       
      },
    })
  ).current;

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable style={styles.overlay} onPress={onClose} />

      <Animated.View
        style={[styles.modalContent, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000088',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 200,
  },
});
