import React from 'react';
import { Linking, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';

const UpdateAppPopup = () => {
  const onOk = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('market://details?id=co.yayem.yayem');
    } else {
      if (Platform.OS === 'ios') {
        Linking.openURL('itms-apps://apps.apple.com/id/app/yayem/id1572690491');
      }
    }
  };

  return (
    <Modal transparent visible={true} supportedOrientations={['portrait', 'landscape-left', 'landscape-right']}>
      <View style={styles.modalParent}>
        <View style={[styles.modal]}>
          <View>
            <Text style={styles.popupTitle}>{'New version available'}</Text>
            <Text style={styles.popupText}>
              {'Please visit the App Store or Google Play Store to download the latest version.'}
            </Text>
          </View>
          <View style={styles.modalButtonRow}>
            <TouchableOpacity style={styles.modalButton} onPress={onOk}>
              <Text style={styles.modalButtonText}>{'update'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    color: Colors.darkBlue,
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
    color: Colors.primaryBlue,
    marginTop: 5,
    width: '90%',
    textAlign: 'center',
    marginLeft: 16,
  },
});

export default UpdateAppPopup;
