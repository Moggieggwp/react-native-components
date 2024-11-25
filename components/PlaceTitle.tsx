import React, { FC } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import { Place } from 'src/models/places';

type Props = {
  place: Place;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  withoutName?: boolean;
};

const PlaceTitle: FC<Props> = ({ place, style, onPress, withoutName = false }) => {
  if (!place) return null;

  return (
    <TouchableOpacity disabled={!onPress} onPress={() => onPress?.()} style={[styles.placeContainer, style]}>
      <View style={styles.cityWrap}>
        <Text style={styles.cityText}>{place.city.name}</Text>
      </View>
      {!withoutName ? (
        <Text style={[styles.nameText, { textDecorationLine: !!onPress ? 'underline' : 'none' }]}>{place.name}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  cityWrap: {
    borderRadius: 2,
    borderWidth: 0.5,
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    marginRight: 8,
    borderColor: Colors.primaryBlue,
  },
  cityText: {
    fontSize: 12,
    color: Colors.primaryBlue,
    ...fontsConfig.regularDia,
    fontWeight: '300',
    textTransform: 'uppercase',
  },
  placeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameText: {
    fontSize: 15,
    color: Colors.primaryBlue,
    ...fontsConfig.regularDia,
    fontWeight: '400',
    lineHeight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlaceTitle;
