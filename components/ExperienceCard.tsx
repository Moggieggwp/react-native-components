import React, { FC, memo } from 'react';
import { View, TouchableOpacity, Image, Text, StyleProp, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import Images from 'assets/images';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import { Experience, ExperienceListItem, TimeSlot } from 'src/models/experience';
import DateTitle from 'src/components/DateTitle';
import PlaceTitle from 'src/components/PlaceTitle';

type Props = {
  item: ExperienceListItem | Experience;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  timeSlot: TimeSlot;
  hasMultipleSlots?: boolean;
  label?: string;
};

const ExperienceCard: FC<Props> = ({ item, onPress, style, disabled, timeSlot, hasMultipleSlots, label }) => {
  const handleOnPress = () => {
    onPress?.();
  };

  if (!item) return;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handleOnPress}
      style={[styles.itemContainer, style]}
      activeOpacity={1}>
      <FastImage
        source={{
          uri: item.imageUrl || '',
          priority: FastImage.priority.high,
        }}
        style={styles.itemImage}
      />
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 8,
        }}>
        {item.operator === 'yayem' ? (
          <View style={styles.subLabelWrap}>
            <Image style={styles.logoImage} source={Images.yayemLogo} />
            <Text style={styles.subLabelText}>yayem event</Text>
          </View>
        ) : (
          <View style={styles.subLabelWrap}>
            <Text style={styles.subLabelText}>partner event</Text>
          </View>
        )}
        {item.isRitual && (
          <View style={styles.subLabelWrap}>
            <Text style={styles.subLabelText}>ritual</Text>
          </View>
        )}
        {item.isFree && (
          <View style={styles.subLabelWrap}>
            <Text style={styles.subLabelText}>free</Text>
          </View>
        )}
      </View>
      {label && label?.length > 0 && (
        <View style={styles.labelWrap}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      )}
      <View style={{ paddingVertical: 8, width: '100%' }}>
        <View style={styles.topView}>
          {!!item?.title && (
            <Text numberOfLines={2} style={styles.nameText}>
              {item?.title}
            </Text>
          )}
        </View>
        <DateTitle
          recurringType={item.recurringType}
          timeSlot={timeSlot}
          hasMultipleSlots={hasMultipleSlots}
          standartSlotFormatting={'D MMM'}
        />
        <PlaceTitle place={item.place} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(ExperienceCard);

const styles = ScaledSheet.create({
  itemImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemContainer: {
    marginBottom: 25,
    backgroundColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden',
  },
  nameText: {
    marginRight: 10,
    ...fontsConfig.regularBeaufort,
    fontSize: 24,
    lineHeight: 24,
    color: Colors.primaryBlue,
  },
  labelWrap: {
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    backgroundColor: Colors.grayOverlay,
    position: 'absolute',
    top: 12,
    right: 12,
  },
  labelText: {
    ...fontsConfig.regularDia,
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 12,
    color: Colors.white,
    textTransform: 'uppercase',
  },
  subLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryGray,
    borderRadius: 2,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 4,
  },
  subLabelText: {
    ...fontsConfig.lightDia,
    fontWeight: '300',
    fontSize: 12,
    color: Colors.primaryBlue,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  logoImage: {
    width: 4,
    height: 8,
    marginRight: 4,
    alignSelf: 'center',
  },
});
