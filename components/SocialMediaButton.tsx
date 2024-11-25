import React, { FC } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import { SocialMediaEnum } from 'src/models/user';
import { getSocialIcon } from 'src/helpers/icons';

type Props = {
  onPress?: () => void;
  type: SocialMediaEnum;
  title?: string;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
};

const SocialMediaButton: FC<Props> = ({ onPress, type, title, style, textColor }) => {
  return (
    <TouchableOpacity
      hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
      disabled={!onPress}
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.5}>
      <View style={styles.btnContent}>
        {getSocialIcon(type, textColor)}
        <Text style={[styles.title, { color: textColor || Colors.black, marginLeft: title ? 8 : 0 }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.primaryGray,
    backgroundColor: Colors.grayPost,
    paddingHorizontal: scale(23),
    paddingVertical: scale(6),
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...fontsConfig.regularDia,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.black,
  },
});

export default SocialMediaButton;
