import React, { FC } from 'react';
import { Text, TextInput, View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';

type Props = {
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  label?: string;
};

const ProfileTextArea: FC<Props> = ({ onChange, value, label, placeholder }) => {
  return (
    <View style={styles.textAreaWrap}>
      <Text style={styles.placeholder}>{label}</Text>
      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        placeholderTextColor={Colors.blackAlpha}
        keyboardType='default'
        value={value}
        onChangeText={value => onChange(value)}
        multiline
      />
    </View>
  );
};

export default ProfileTextArea;

const styles = ScaledSheet.create({
  textAreaWrap: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.primaryGray,
    padding: 16,
  },
  placeholder: {
    ...fontsConfig.boldDia,
    fontSize: 12,
    lineHeight: 12,
    textTransform: 'uppercase',
    marginBottom: 6,
    color: Colors.black,
  },
  inputText: {
    ...fontsConfig.regularBeaufort,
    fontSize: 16,
    lineHeight: 19,
    color: Colors.black,
  },
});
