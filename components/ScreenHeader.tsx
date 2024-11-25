import React, { FC } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle, Share } from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import * as svg from 'assets/svg';

type Props = {
  onBackPress?: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<ViewStyle>;
  buttonBackStyle?: StyleProp<ViewStyle>;
  shareMessage?: string;
  shareTitle?: string;
};

const ScreenHeader: FC<Props> = ({
  onBackPress,
  title,
  style,
  shareMessage,
  shareTitle,
  titleStyle,
  buttonBackStyle,
}) => {
  const onShareHandler = () => {
    if (!shareMessage) return;
    Share.share({
      title: shareTitle, // Android
      message: shareMessage, // Both platforms
    });
  };

  return (
    <View style={[styles.headerWrap, style]}>
      {onBackPress && (
        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
          onPress={onBackPress}
          style={[styles.buttonBack, buttonBackStyle]}>
          <svg.arrowBackBlue width={scale(14)} height={scale(14)} color={Colors.black} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {shareMessage && (
        <TouchableOpacity
          hitSlop={{ top: 25, bottom: 25, right: 25, left: 25 }}
          onPress={onShareHandler}
          style={styles.shareButton}>
          <svg.shareIcon width={scale(25)} height={scale(25)} color={Colors.black} fill={'#000000'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  buttonBack: {
    position: 'absolute',
    left: 0,
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(26),
  },
  title: {
    ...fontsConfig.regularDia,
    fontSize: 16,
    lineHeight: 26,
    color: Colors.black,
    textTransform: 'uppercase',
  },
  shareButton: {
    position: 'absolute',
    right: 0,
  },
});

export default ScreenHeader;
