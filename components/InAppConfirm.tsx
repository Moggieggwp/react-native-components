import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import { inAppConfirmSelector } from 'src/redux/app/selectors';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { appActions } from 'src/redux/app/reducer';

const InAppConfirm = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inAppConfirmData = useAppSelector(inAppConfirmSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inAppConfirmData) {
      setShowConfirm(true);
      showAnimation();
    } else {
      hideAnimation();
    }
  }, [inAppConfirmData]);

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
    setShowConfirm(false);
    dispatch(appActions.setInAppConfirm(null));
  }

  const onCancelPressed = () => {
    hideAnimation();
  };

  const onConfirmPressed = () => {
    inAppConfirmData?.onConfirm?.();
    hideAnimation();
  };

  if (!showConfirm || !inAppConfirmData) {
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
      <BlurView style={styles.viewBlur} blurType='light' blurAmount={3} blurRadius={5} />
      <View style={styles.viewContent}>
        <Text style={[styles.textTitle]}>
          {inAppConfirmData.title}
        </Text>
        {inAppConfirmData?.description?.length > 0 ? (
          <Text style={styles.textDesc}>{inAppConfirmData.description}</Text>
        ) : null}
        <View style={styles.line} />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.viewButtonConfirm} onPress={onCancelPressed}>
            <Text style={styles.textButton}>{inAppConfirmData?.cancelText || 'CANCEL'}</Text>
          </TouchableOpacity>
          <View style={styles.lineVertical} />
          <TouchableOpacity style={styles.viewButtonConfirm} onPress={onConfirmPressed}>
            <Text style={styles.textButton}>{inAppConfirmData?.confirmText || 'CONFIRM'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default InAppConfirm;

const styles = ScaledSheet.create({
  container: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    backgroundColor: `${Colors.black}50`,
  },
  viewBlur: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'rgba(76, 76, 160, 0.2)',
  },
  viewContent: {
    width: '100%',
    paddingTop: verticalScale(25),
    borderRadius: 12,
    backgroundColor: Colors.rareBlue,
  },
  textTitle: {
    textAlign: 'center',
    color: Colors.darkBlue,
    ...fontsConfig.boldDia,
    fontWeight: '700',
    fontSize: 18,
  },
  textDesc: {
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
    color: Colors.darkBlue,
    ...fontsConfig.regularDia,
    fontSize: 14,
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.darkBlue,
  },
  viewButtonConfirm: {
    flex: 1,
    paddingVertical: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: Colors.darkBlue,
    ...fontsConfig.boldDia,
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  lineVertical: {
    height: '100%',
    width: 0.5,
    backgroundColor: Colors.darkBlue,
  },
});
