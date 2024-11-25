import React, { FC } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import * as svg from 'assets/svg';
import { TagCategoryEnum, TagType } from 'src/types/tags';
import { getTagIconByCategory } from 'src/helpers/tags';

type Props = {
  onPress?: () => void;
  tag: TagType;
  iconSize?: number;
  color?: string;
  onRemove?: (tag: TagType) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};
const Tag: FC<Props> = ({ onPress, tag, style, iconSize, onRemove, color, textStyle }) => {
  const icon = getTagIconByCategory(tag.category, iconSize, tag.category === TagCategoryEnum.ADD ? '#FBF6EF' : color);
  return (
    <TouchableOpacity
      hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
      disabled={!onPress}
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.5}>
      <View style={styles.btnContent}>
        {icon ? icon({}) : null}
        <Text
          style={[
            styles.title,
            { color: color || Colors.black },
            textStyle,
            tag.category === TagCategoryEnum.ADD && { color: '#FBF6EF' },
          ]}>
          {tag.value}
        </Text>
        {!!onRemove && (
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            style={styles.closeBtn}
            onPress={() => onRemove(tag)}>
            <svg.closeIcon width={scale(11)} height={scale(11)} color={color || Colors.black} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.primaryGray,
    backgroundColor: Colors.grayPost,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...fontsConfig.regularDia,
    fontSize: 16,
    lineHeight: 16,
    color: Colors.black,
    marginHorizontal: 12,
  },
  closeBtn: {},
});

export default Tag;
