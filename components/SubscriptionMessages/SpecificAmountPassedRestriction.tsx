import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import Button from '../Button';
import UpgradeMembershipButton from './UpgradeMembershipButton';
import { SCREEN_HEIGHT } from 'src/constants/window';
import { SubscriptionReccuringInterval } from 'src/models/user';

type Props = {
  onConfirmPress: () => void;
  onUpgradePress: () => void;
  subscriptionInterval: SubscriptionReccuringInterval | undefined;
  visitsRestrictionAmount: number;
  usersVisitsCountRemaining: number;
};

const SpecificAmountPassedRestriction: FC<Props> = ({
  onConfirmPress,
  subscriptionInterval,
  visitsRestrictionAmount,
  usersVisitsCountRemaining,
  onUpgradePress,
}) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.reservationsCountText1}>{usersVisitsCountRemaining}</Text>
          <Text style={styles.reservationsCountText2}>/{visitsRestrictionAmount}</Text>
        </View>
        <Text style={styles.reservationRestrictionDetailsText}>
          <Text>{`Your membership includes `}</Text>
          <Text style={styles.boldText}>{visitsRestrictionAmount}</Text>
          <Text
            style={
              styles.reservationRestrictionDetailsText
            }>{` visits to this space each calendar ${subscriptionInterval}. After this reservation you would have `}</Text>
          <Text style={styles.boldText}>{usersVisitsCountRemaining - 1}</Text>
          <Text>{` visits remaining for the ${subscriptionInterval}.`}</Text>
        </Text>
        <UpgradeMembershipButton onPress={onUpgradePress} />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          style={[styles.sheetFormBtn, { marginTop: verticalScale(-25) }]}
          textStyle={styles.sheetFormBtnText}
          title={'Confirm Reservation'}
          onPress={onConfirmPress}
        />
      </View>
    </>
  );
};

export default SpecificAmountPassedRestriction;

const styles = ScaledSheet.create({
  sheetFormBtn: {
    backgroundColor: Colors.rareBlue,
    position: 'absolute',
    zIndex: 2,
    bottom: SCREEN_HEIGHT * 0.42,
  },
  sheetFormBtnText: {
    ...fontsConfig.boldDia,
    fontSize: 16,
    color: Colors.primaryBlue,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  reservationsCountText1: {
    ...fontsConfig.boldDia,
    fontSize: 32,
    color: Colors.primaryBlue,
  },
  reservationsCountText2: {
    ...fontsConfig.regularDia,
    fontSize: 32,
    color: Colors.lightBlue,
  },
  reservationRestrictionDetailsText: {
    ...fontsConfig.regularDia,
    fontSize: 16,
    color: Colors.primaryBlue,
    lineHeight: 30,
    marginTop: verticalScale(32),
  },
  boldText: {
    ...fontsConfig.boldDia,
  },
});
