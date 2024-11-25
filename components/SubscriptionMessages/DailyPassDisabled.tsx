import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import UpgradeMembershipButton from './UpgradeMembershipButton';

type Props = {
  onUpgradePress: () => void;
};

const DailyPassDisabled: FC<Props> = ({ onUpgradePress }) => {
  return (
    <View>
      <Text style={styles.reservationsCountText}>{`Upgrade`}</Text>
      <Text style={styles.reservationRestrictionDetailsText}>
        <Text>{`You have used all of your allocated visits`}</Text>
      </Text>
      <UpgradeMembershipButton onPress={onUpgradePress} />
    </View>
  );
};

export default DailyPassDisabled;

const styles = ScaledSheet.create({
  reservationsCountText: {
    ...fontsConfig.regularDia,
    fontSize: 32,
    color: Colors.primaryBlue,
  },
  reservationRestrictionDetailsText: {
    ...fontsConfig.regularDia,
    fontSize: 16,
    color: Colors.primaryBlue,
    lineHeight: 30,
    marginTop: verticalScale(32),
  },
});
