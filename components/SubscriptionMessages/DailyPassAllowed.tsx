import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import UpgradeMembershipButton from './UpgradeMembershipButton';
import Button from '../Button';
import { SCREEN_HEIGHT } from 'src/constants/window';

type Props = {
    price: string;
    onUpgradePress: () => void;
    onConfirmReservation: () => void;
    description: string;
    btnTitle: string;
};

const DailyPassAllowed: FC<Props> = ({ onUpgradePress, onConfirmReservation, price, description, btnTitle }) => {
  return (
    <>
      <View>
        <Text style={styles.reservationsCountText}>
          {price}
        </Text>
        <Text style={styles.reservationRestrictionDetailsText}>
          <Text>
            {description}
          </Text>
        </Text>
        <UpgradeMembershipButton onPress={onUpgradePress} />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          style={styles.sheetFormBtn}
          textStyle={styles.sheetFormBtnText}
          title={btnTitle}
          onPress={onConfirmReservation}
        />
      </View>
    </>
  );
};

export default DailyPassAllowed;

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
});
