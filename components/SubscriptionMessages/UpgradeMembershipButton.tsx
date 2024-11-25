import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import * as svg from 'assets/svg';

type Props = {
  onPress: () => void;
};

const UpgradeMembershipButton: FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        marginTop: 32,
        alignItems: 'center',
      }}>
      <svg.scrollUpIcon width={scale(24)} height={scale(24)} color={Colors.primaryBlue} />
      <Text style={styles.upgradeMembershipText}>Upgrade your membership</Text>
    </TouchableOpacity>
  );
};

export default UpgradeMembershipButton;

const styles = ScaledSheet.create({
  upgradeMembershipText: {
    ...fontsConfig.regularDia,
    fontSize: 16,
    color: Colors.primaryBlue,
    marginLeft: 8,
  },
})
