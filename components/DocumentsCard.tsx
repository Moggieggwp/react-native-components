import React, { FC } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import * as svg from 'assets/svg';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import { DocumentCardType } from 'src/types/common';

const DEFAULT_COLOR = Colors.primaryBlue;

const renderIconByType = (type: DocumentCardType, color: string) => {
  switch (type) {
    case DocumentCardType.Y5:
      return <Text style={[styles.title, { color: color, fontSize: 18 }]}>Y5</Text>;
    case DocumentCardType.PERK:
      return <svg.ratingIcon width={scale(25)} height={scale(25)} color={color} />;
    default:
      return <svg.ratingIcon width={scale(25)} height={scale(25)} color={color} />;
  }
};

type Props = {
  title: string;
  subtitle: string;
  onPress: () => void;
  type: DocumentCardType;
  style?: StyleProp<ViewStyle>;
  color?: string;
  backgroundColor?: string;
};

const DocumentsCard: FC<Props> = ({
  title,
  subtitle,
  onPress,
  type,
  style,
  color = DEFAULT_COLOR,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      key={title}
      style={[
        styles.externalBtn,
        { backgroundColor: backgroundColor || Colors.grayOverlayLight, borderColor: color },
        style,
      ]}>
      <View style={styles.container}>
        <View style={styles.contentWrap}>
          <View>{renderIconByType(type, color)}</View>
          <View style={styles.textWrap}>
            <Text style={[styles.title, { color: color }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: color }]}>{subtitle}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  externalBtn: {
    backgroundColor: Colors.grayOverlayLight,
    borderRadius: 8,
    borderWidth: 0.5,
  },
  container: {
    paddingHorizontal: scale(21),
    paddingVertical: verticalScale(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWrap: {
    marginLeft: scale(21),
  },
  title: {
    fontSize: 16,
    ...fontsConfig.blackDia,
    lineHeight: 24,
    letterSpacing: -0.75,
    color: Colors.primaryBlue,
    textTransform: 'uppercase',
  },
  subtitle: {
    ...fontsConfig.regularDia,
    lineHeight: 24,
    fontSize: 13,
    fontWeight: '400',
    color: Colors.primaryBlue,
  },
  contentWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DocumentsCard;
