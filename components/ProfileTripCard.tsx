import React, { FC, memo } from 'react';
import { StyleProp, ViewStyle, Text, TouchableOpacity } from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import * as svg from 'assets/svg';

type Props = {
  title: string;
  subTitle?: string;
  style?: StyleProp<ViewStyle>;
  id: string;
  onRemove?: (id: string) => void;
  onPress?: () => void;
  color?: string;
  disabled?: boolean;
};

const ProfileTripCard: FC<Props> = ({ title, subTitle, style, onRemove, id, onPress, color, disabled = true }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} disabled={disabled} style={[styles.itemContainer, style]}>
      <svg.treeIcon width={scale(35)} height={scale(35)} color={color || Colors.black} style={styles.icon} />
      <Text style={[styles.title, { color: color || Colors.black }]}>{title}</Text>
      {subTitle && <Text style={[styles.subTitle, { color: color || Colors.black }]}>{subTitle}</Text>}
      {!!onRemove && (
        <TouchableOpacity
          hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
          style={styles.closeBtn}
          onPress={() => onRemove(id)}>
          <svg.closeIcon width={scale(11)} height={scale(11)} color={Colors.black} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default memo(ProfileTripCard);

const styles = ScaledSheet.create({
  itemContainer: {
    width: scale(250),
    height: verticalScale(129),
    backgroundColor: Colors.blackAlpha,
    borderRadius: 8,
    padding: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    ...fontsConfig.regularBeaufort,
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 28,
    marginBottom: verticalScale(12),
  },
  subTitle: {
    ...fontsConfig.regularDia,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
  },
  icon: {
    marginBottom: verticalScale(12),
  },
  closeBtn: {
    position: 'absolute',
    top: scale(16),
    right: scale(16),
  },
});
