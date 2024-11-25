import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Platform } from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import * as svg from 'assets/svg';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import ReachTextWithoutButton from './ReachTextWithoutButton';

type Props = {
  reachText?: string;
  isOpen: boolean;
  onClose: () => void;
};

const ReachTextModal: FC<Props> = ({ isOpen, reachText, onClose }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal
      animationType='fade'
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalWrap}>
        <TouchableOpacity style={styles.modalClose} onPress={handleClose}>
          <svg.closeIcon width={15} height={15} color={Colors.primaryBlue} />
        </TouchableOpacity>
        <View style={styles.scrollWrap}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalView}>
            <ReachTextWithoutButton html={reachText} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ReachTextModal;

const styles = ScaledSheet.create({
  modalClose: {
    marginTop: Platform.OS === 'android' ? verticalScale(30) : verticalScale(52),
    marginBottom: verticalScale(22),
    left: scale(-8),
    width: scale(25),
    height: scale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollWrap: {
    flex: 1,
  },
  modalWrap: {
    paddingHorizontal: 24,
    backgroundColor: Colors.grayBackground,
    height: '100%',
  },
  modalView: {
    width: '100%',
    paddingBottom: verticalScale(36),
  },
});
