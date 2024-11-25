import React, { FC } from 'react';
import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';

type Props = {
  onClose: () => void;
  isModalOpen: boolean;
};

const WhatIsY5Modal: FC<Props> = ({ onClose, isModalOpen }) => {
  return (
    <Modal transparent visible={isModalOpen} animationType='fade'>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalParent}>
          <TouchableWithoutFeedback>
            <View style={[styles.modal]}>
              <View>
                <Text style={styles.popupTitle}>{`What's a Y5?`}</Text>
                <Text style={styles.popupText}>
                  {'Our guides to help you eat, sleep, work, play and slay like a local, anywhere in the world'}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modalParent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '90%',
    minWidth: 270,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 13,
    paddingBottom: 24,
  },
  modalButton: {
    minWidth: 140,
    backgroundColor: Colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    height: 44,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  modalButtonCancel: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    marginRight: 11,
  },
  modalButtonText: {
    textTransform: 'uppercase',
    ...fontsConfig.boldDia,
    fontWeight: 'bold',
    color: Colors.grayBackground,
    fontSize: 14,
  },
  modalButtonCancelText: {
    color: Colors.white,
    textTransform: 'uppercase',
  },
  modalButtonRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textLabel: {
    color: Colors.white,
    letterSpacing: -0.24,
    fontSize: 15,
    textAlign: 'center',
  },
  textButton: { flex: 1 },
  popupTitle: {
    ...fontsConfig.boldDia,
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 16,
    textAlign: 'center',
    width: '90%',
  },
  popupText: {
    ...fontsConfig.regularBeaufort,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.black,
    marginTop: 5,
    width: '90%',
    textAlign: 'center',
    marginLeft: 16,
  },
});

export default WhatIsY5Modal;
