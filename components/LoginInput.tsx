import React, { useRef, FC } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  TextInputFocusEventData,
} from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import { SvgProps } from 'react-native-svg';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';

interface LoginInputProps {
  value: string;
  style?: StyleProp<ViewStyle>;
  label: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  errorMessage?: string;
  maxLength?: number;
  onBlur?: () => void;
  onPressRight?: () => void;
  returnKeyType?: 'default' | 'done' | 'go' | 'next' | 'search' | 'send';
  icon_right?: FC<SvgProps>;
  secureTextEntry?: boolean;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  mainColor?: string;
  placeholderTextColor?: string;
}

const LoginInput: FC<LoginInputProps> = ({
  value,
  style = {},
  label,
  placeholder,
  onChangeText,
  error,
  errorMessage,
  maxLength,
  onBlur,
  onPressRight,
  returnKeyType,
  icon_right,
  secureTextEntry,
  onSubmitEditing,
  mainColor,
  placeholderTextColor,
}) => {
  const ref = useRef<TextInput>(null);
  const inputColor = error ? Colors.red : (mainColor || Colors.primaryBlue);

  const onFocusInput = () => {
    if (!ref.current) return;
    ref.current.focus();
  };

  return (
    <>
      <TouchableOpacity onPress={onFocusInput} style={[styles.inputItem, { borderColor: inputColor }, style]}>
        <View style={styles.inputWrapper}>
          <Text style={[styles.inputLabel, { color: inputColor }]}>{label}</Text>
          <TextInput
            ref={ref}
            style={[styles.input, { color: inputColor }]}
            onBlur={onBlur}
            placeholderTextColor={error ? Colors.red : `${placeholderTextColor || Colors.darkBlue}99`}
            placeholder={placeholder || ''}
            onChangeText={onChangeText}
            value={value}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            onSubmitEditing={onSubmitEditing}
          />
        </View>
        {icon_right && (
          <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} onPress={onPressRight} disabled={!onPressRight}>
            {icon_right && icon_right?.({})}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {errorMessage ? (
        <View style={styles.viewError}>
          <Text style={styles.textError}>{errorMessage || ''}</Text>
        </View>
      ) : null}
    </>
  );
};

export default LoginInput;

const styles = ScaledSheet.create({
  inputWrapper: {
    width: '90%',
  },
  inputItem: {
    width: '100%',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: scale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLabel: {
    ...fontsConfig.regularDia,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    textTransform: 'uppercase',
    marginBottom: verticalScale(7),
  },
  input: {
    fontFamily: 'BeaufortPro',
    fontWeight: '400',
    fontSize: 18,
  },
  viewError: {
    paddingTop: scale(2),
    paddingBottom: scale(10),
  },
  textError: {
    color: Colors.red,
    ...fontsConfig.regularDia,
    fontWeight: '600',
  },
});

