import * as svg from 'assets/svg';
import React from 'react';
import { Modal, Platform, Share, Text, TouchableOpacity, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import * as ROUTES from 'src/constants/routes';
import { HotspotMemberType } from 'src/models/hotspots';
import { appActions } from 'src/redux/app/reducer';
import { pdfModalVisibleSelector } from 'src/redux/app/selectors';
import { navigate } from 'src/services/navigation';
import { openWebLink } from 'src/utils/links';

type Props = {
  isOpen?: boolean;
  pdfUrl: string;
  onClose?: () => void;
  shareMessage?: string;
  shareTitle?: string;
  author?: HotspotMemberType;
  onAuthorPress?: (id: string) => void;
};

const PdfModal: React.FC<Props> = ({ isOpen, pdfUrl, onClose, shareMessage, shareTitle, author }) => {
  const dispatch = useDispatch();
  const modalVisibleRedux = useSelector(pdfModalVisibleSelector);

  const handleClose = () => {
    dispatch(appActions.setModalVisible(false));
    onClose?.();
  };

  const onShareHandler = () => {
    if (!shareMessage) return;
    Share.share({
      title: shareTitle, // Android
      message: shareMessage, // Both platforms
    });
  };

  const handleAuthorPress = (id: string) => {
    if (!id) return;
    navigate(ROUTES.DIRECTORY_PROFILE_DETAILS, {
      userId: id,
      goBack: true,
    });
    onClose?.();
  };

  return (
    <Modal
      animationType='fade'
      transparent={false}
      visible={modalVisibleRedux}
      onRequestClose={() => {
        dispatch(appActions.setModalVisible(false));
      }}>
      <View style={styles.modalWrap}>
        <View style={styles.headerWrap}>
          <TouchableOpacity style={styles.modalClose} onPress={handleClose}>
            <svg.closeIcon width={15} height={15} color={Colors.primaryBlue} />
          </TouchableOpacity>
          {author && (
            <TouchableOpacity style={styles.authorWrap} onPress={() => handleAuthorPress(author._id)}>
              <Text style={styles.underline}>{author.profile?.firstName || ''}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.scrollWrap}>
          <Pdf
            scale={1}
            source={{ uri: pdfUrl }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {}}
            onError={error => {}}
            trustAllCerts={false}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
              openWebLink(uri);
            }}
            style={[styles.pdfContent, { paddingBottom: shareMessage ? verticalScale(70) : verticalScale(30) }]}
          />
        </View>
      </View>
      {shareMessage && (
        <TouchableOpacity activeOpacity={0.98} style={styles.modalShare} onPress={onShareHandler}>
          <View style={styles.shareWrap}>
            <svg.shareIcon width={27} height={27} color={Colors.primaryBlue} fill={'#1E1E70'} />
            <Text style={styles.shareText}>Share</Text>
          </View>
        </TouchableOpacity>
      )}
    </Modal>
  );
};

export default PdfModal;

const styles = ScaledSheet.create({
  headerWrap: {
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'android' ? verticalScale(25) : verticalScale(52),
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalClose: {
    left: scale(-8),
    width: scale(30),
    height: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalShare: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: verticalScale(57),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.rareBlue,
  },
  scrollWrap: {
    height: verticalScale(600),
    overflow: 'hidden',
  },
  modalWrap: {
    paddingHorizontal: 24,
    backgroundColor: Colors.grayBackground,
    height: '100%',
  },
  pdfContent: {
    flex: 1,
    backgroundColor: Colors.grayBackground,
  },
  shareWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {
    ...fontsConfig.regularDia,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.16,
    color: Colors.primaryBlue,
    marginLeft: 7,
  },
  underline: {
    ...fontsConfig.regularDia,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.16,
    color: Colors.primaryBlue,
    textDecorationLine: 'underline',
  },
  authorWrap: {},
});
