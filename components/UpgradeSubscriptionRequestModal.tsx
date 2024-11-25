import { BlurView } from '@react-native-community/blur';
import images from 'assets/images';
import * as svg from 'assets/svg';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import { AccessChatEmOptionEnum } from 'src/models/user';
import { appActions } from 'src/redux/app/reducer';
import { showUpgradeSubscriptionRequestModalSelector } from 'src/redux/app/selectors';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { userActions } from 'src/redux/user/reducer';
import { accessForEmChatSelector, userLoadingSelector } from 'src/redux/user/selectors';

const UpgradeSubscriptionRequestModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [upgradeRequested, setUpgradeRequested] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const showUpgradeSubscriptionRequestModal = useAppSelector(showUpgradeSubscriptionRequestModalSelector);
  const accessForEmChat = useAppSelector(accessForEmChatSelector);

  const loading = useAppSelector(userLoadingSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showUpgradeSubscriptionRequestModal) {
      setShowModal(true);
      showAnimation();
    } else {
      hideAnimation();
    }
  }, [showUpgradeSubscriptionRequestModal]);

  const showAnimation = () => {
    Animated.timing(fadeAnim, {
      duration: 300,
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const hideAnimation = () => {
    Animated.timing(fadeAnim, {
      duration: 300,
      toValue: 0,
      useNativeDriver: false,
    }).start(finish => {
      if (finish) {
        hide();
      }
    });
  };

  const hide = () => {
    setShowModal(false);
    dispatch(appActions.setShowUpgradeSubscriptionRequestModal(false));
  };

  const onPressOutsideModal = () => {
    hideAnimation();
  };

  const onConfirmPressed = () => {
    dispatch(userActions.upgradeSubscriptionRequest());
    setUpgradeRequested(true);
  };

  if (!showModal || !showUpgradeSubscriptionRequestModal) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ]}>
      <TouchableWithoutFeedback onPress={onPressOutsideModal}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <BlurView style={styles.viewBlur} blurType='light' blurAmount={4} blurRadius={5} />
      <View style={styles.viewContent}>
        <View style={{ flexDirection: 'column' }}>
          <Image source={images.girlWaitingImage} style={{ alignSelf: 'center' }} />
          <View style={{ paddingHorizontal: 32 }}>
            <Text style={styles.textTitle}>
              {accessForEmChat === AccessChatEmOptionEnum.REQUEST_SUBSCRIPTION_UPGRADE
                ? 'The pleasure is mine'
                : 'Be right there'}
            </Text>
            <Text style={styles.textDescription}>
              {accessForEmChat === AccessChatEmOptionEnum.REQUEST_SUBSCRIPTION_UPGRADE
                ? `Upgrade your membership for access to Em’s expert insights and service`
                : 'We’re rolling out slowly to ensure unforgettable service – come back soon'}
            </Text>
            {accessForEmChat === AccessChatEmOptionEnum.REQUEST_SUBSCRIPTION_UPGRADE && (
              <TouchableOpacity
                onPress={onConfirmPressed}
                disabled={upgradeRequested}
                style={[styles.button, upgradeRequested ? styles.buttonDisabled : styles.buttonActive]}>
                {loading ? (
                  <ActivityIndicator size='small' color={Colors.white} />
                ) : (
                  <View style={styles.buttonContainer}>
                    <Text
                      style={[
                        styles.buttonText,
                        upgradeRequested ? styles.buttonTextDisabled : styles.buttonTextActive,
                      ]}>
                      {upgradeRequested ? 'WE’LL BE IN TOUCH' : 'Request Upgrade'}
                    </Text>
                    {upgradeRequested && <svg.checkMarkIcon width={25} height={25} />}
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default UpgradeSubscriptionRequestModal;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  viewBlur: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
  },
  viewContent: {
    zIndex: 2,
    width: '100%',
    paddingTop: verticalScale(32),
    borderRadius: 12,
    backgroundColor: '#BBD9C8',
    paddingBottom: verticalScale(32),
  },
  textTitle: {
    ...fontsConfig.blackDia,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 24,
    marginTop: 16,
  },
  textDescription: {
    ...fontsConfig.regularBeaufort,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    marginTop: 16,
    lineHeight: 20,
  },
  overlay: {
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 30,
    marginTop: 16,
  },
  buttonActive: {
    backgroundColor: Colors.black,
  },
  buttonDisabled: {
    backgroundColor: Colors.primaryGray,
  },
  buttonText: {
    ...fontsConfig.regularDia,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  buttonTextActive: {
    color: Colors.white,
  },
  buttonTextDisabled: {
    color: Colors.black,
    marginRight: 12,
  },
});
