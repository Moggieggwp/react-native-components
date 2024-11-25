import React, { FC, memo } from 'react';
import moment from 'moment';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import fontsConfig from 'src/constants/fonts';
import Colors from 'src/constants/colors';
import { Reservation } from 'src/models/reservations';

type Props = {
  reservation: Reservation;
  onPress: () => void;
};

const ReservedPlaceCard: FC<Props> = ({ reservation, onPress }) => {
  const { place } = reservation;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.root}>
      <View>
        <View>
          <FastImage
            style={styles.image}
            source={{
              uri: place.image,
            }}
          />
          <View style={styles.containerText}>
            <Text style={styles.nameText}>{place.name}</Text>
            <View style={styles.placeInfo}>
              <View style={[styles.tag, styles.tagMargin]}>
                <Text style={styles.tagLabel}>SPACE ACCESS</Text>
              </View>
              <Text style={styles.descriptionText}>
                {moment(reservation.date).utc(false).format('dddd, DD MMM YYYY')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ReservedPlaceCard);

const styles = ScaledSheet.create({
  image: {
    width: '100%',
    height: scale(160),
    borderRadius: 8,
  },
  root: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 24,
  },
  containerText: {
    paddingRight: 16,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  nameText: {
    fontSize: 16,
    ...fontsConfig.blackDia,
    letterSpacing: -0.75,
    color: Colors.primaryBlue,
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 15,
    ...fontsConfig.regularDia,
    fontWeight: '400',
    color: Colors.primaryBlue,
  },
  placeInfo: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
    marginRight: 8,
    backgroundColor: Colors.primaryGray,
    marginBottom: 16,
  },
  tagLabel: {
    fontSize: 12,
    ...fontsConfig.lightDia,
    fontWeight: '300',
    textTransform: 'uppercase',
    color: Colors.primaryBlue,
  },
  tagMargin: {
    marginRight: 8,
  },
});
