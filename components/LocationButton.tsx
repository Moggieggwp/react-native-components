import React, { FC } from 'react';
import { StyleProp, ViewStyle, Text, TouchableOpacity } from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import * as svg from 'assets/svg';
import { LocationModalModeEnum } from 'src/types/payments';

type Props = {
  title?: string;
  onPress: () => void;
  type: LocationModalModeEnum;
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
  color?: string;
  placeholderText?: string;
};

const getIconByType = (type: LocationModalModeEnum, color?: string) => {
  switch (type) {
    case LocationModalModeEnum.CURRENT:
      return () => <svg.aimIcon style={styles.icon} width={24} height={24} color={color || Colors.black} />;
    case LocationModalModeEnum.HOME:
      return () => <svg.homeIcon style={styles.icon} width={24} height={24} color={color || Colors.black} />;
    case LocationModalModeEnum.NEXT:
      return () => <svg.planeIcon style={styles.icon} width={24} height={24} color={color || Colors.black} />;
    default:
      return () => <svg.aimIcon style={styles.icon} width={24} height={24} color={color || Colors.black} />;
  }
};

const LocationButton: FC<Props> = ({ title, onPress, onClear, style, color, type, placeholderText }) => {
  const icon = getIconByType(type, color);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={[styles.locationButton, style]}>
      {icon()}
      <Text style={[styles.cityText, { color: color || Colors.black }]}>
        {title || placeholderText || 'Press here'}
      </Text>
      {!!onClear && title && (
        <TouchableOpacity
          hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
          style={styles.clearBtn}
          onPress={onClear}>
          <svg.closeIcon width={scale(11)} height={scale(11)} color={color || Colors.black} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default LocationButton;

const styles = ScaledSheet.create({
  locationButton: {
    borderRadius: 4,
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  cityText: {
    ...fontsConfig.regularBeaufort,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 32,
    paddingTop: 2,
  },
  secondTitle: {
    marginTop: verticalScale(35),
    marginBottom: verticalScale(14),
    width: '100%',
  },
  clearBtn: {
    position: 'absolute',
    right: 16,
  },
});
