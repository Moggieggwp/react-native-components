import React, { FC } from 'react';
import { TouchableOpacity, ActivityIndicator, Text, StyleProp, TextStyle } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';

type Props = {
  title: string;
  onPress: () => void;
  width?: number;
  height?: number;
  disabled?: boolean;
  activeOpacity?: number;
  loading?: boolean;
  isReverse?: boolean;
  style?: StyleProp<any>;
  textStyle?: StyleProp<TextStyle>;
};

const Button: FC<Props> = props => {
  const { title, onPress, width, height, disabled, activeOpacity, style, isReverse, textStyle, loading } = props;

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        width ? { width } : null,
        height ? { height } : null,
        disabled
          ? [{ backgroundColor: `${Colors.darkBlue}99` }]
          : isReverse
          ? {
              backgroundColor: Colors.grayBackground,
              borderWidth: scale(1),
              borderColor: Colors.darkBlue,
            }
          : null,
        style,
      ]}>
      {!loading ? (
        <Text style={[styles.textTile, isReverse ? { color: Colors.darkBlue } : textStyle, textStyle]}>{title}</Text>
      ) : (
        <ActivityIndicator size='small' color={Colors.white} />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: Colors.primaryBlue,
  },
  textTile: {
    fontSize: 16,
    color: Colors.white,
    ...fontsConfig.boldDia,
    lineHeight: 19,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
