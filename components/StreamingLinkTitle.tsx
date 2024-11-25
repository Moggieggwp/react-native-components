import React, { FC } from 'react';
import { View, Linking, TouchableOpacity, Text } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import * as svg from 'assets/svg';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';

type Props = {
  link: string;
  disabled?: boolean;
};

const StreamingLinkTitle: FC<Props> = ({ link, disabled }) => {
  const onPress = () => {
    Linking.openURL(link).catch(err => {});
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.container}>
      <svg.iconLink width={scale(12)} height={scale(12)} style={styles.linkIcon} color={Colors.primaryBlue} />
      <Text
        style={[
          styles.linkText,
          {
            textDecorationLine: disabled ? 'none' : 'underline',
          },
        ]}>
        {disabled || !link ? 'Streaming link will be shared' : 'Streaming link'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  linkIcon: {
    marginRight: 8,
  },
  linkText: {
    ...fontsConfig.regularDia,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 20,
    color: Colors.primaryBlue,
  },
});

export default StreamingLinkTitle;
