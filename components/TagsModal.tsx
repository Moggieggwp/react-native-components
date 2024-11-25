import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import * as svg from 'assets/svg';
import React, { FC, useState } from 'react';
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import { getTagCategoryTitle, getTagIconByCategory } from 'src/helpers/tags';
import { TagCategoryEnum, TagType } from 'src/types/tags';

const sortOrder = {
  [TagCategoryEnum.INDUSTRY]: 0,
  [TagCategoryEnum.PROFESSIONAL]: 1,
  [TagCategoryEnum.INTEREST]: 2,
  [TagCategoryEnum.TRAVEL_GROUP]: 3,
  [TagCategoryEnum.COMMUNITY]: 4,
  [TagCategoryEnum.LANGUAGE]: 5,
  [TagCategoryEnum.CITY]: 6,
  [TagCategoryEnum.ADD]: 7,
};

type Props = {
  tags: TagType[];
  isOpen: boolean;
  onSelect: (tag: TagType) => void;
  onClose: () => void;
  placeholderTag?: string;
  backgroundColor?: string;
  textColor?: string;
  tagColor?: string;
  iconsColor?: string;
  checkedTags?: TagType[];
  inputPlaceholderTextColor?: string;
  animationType?: 'none' | 'slide' | 'fade';
};

const TagsModal: FC<Props> = ({
  isOpen,
  onSelect,
  onClose,
  tags,
  backgroundColor,
  textColor,
  checkedTags,
  tagColor = '#E6DFD5',
  iconsColor = Colors.black,
  animationType = 'fade',
}) => {
  const [categories, setCategoties] = useState<TagCategoryEnum[]>(
    Array.from(new Set(tags.map(item => item.category))).sort((a, b) => sortOrder[a] - sortOrder[b]),
  );

  const handleSelectTag = (tag: TagType) => {
    onSelect?.(tag);
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal animationType={animationType} transparent={false} visible={isOpen}>
      <View style={[styles.modalWrap, { backgroundColor: backgroundColor ? backgroundColor : Colors.grayBackground }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {categories.map(category => {
            const icon = getTagIconByCategory(category, 32, textColor);
            const tagsForCategory = tags.filter(tag => tag.category === category);
            const itemsPerRow = 10; // Change this value to set the number of items per row

            // Split the tags into rows
            const tagRows = [];
            for (let i = 0; i < tagsForCategory.length; i += itemsPerRow) {
              tagRows.push(tagsForCategory.slice(i, i + itemsPerRow));
            }

            return (
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                  <View style={styles.iconWrap}>{icon({})}</View>
                  <Text style={styles.categoryTitle}>{getTagCategoryTitle(category)?.toUpperCase()}</Text>
                </View>
                <View>
                  <ScrollView
                    nestedScrollEnabled={true}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView}>
                    {tagRows.map((row, index) => (
                      <View key={index} style={styles.tagRow}>
                        {row.map(tag => {
                          const checked = checkedTags?.find(t => t.value === tag.value);

                          return (
                            <TouchableOpacity
                              key={tag.key}
                              style={[styles.tagItem, { backgroundColor: tagColor }]}
                              onPress={() => handleSelectTag(tag)}>
                              <Text style={styles.tagText}>{tag.value}</Text>
                              {checked ? (
                                <svg.okBlackIcon width={scale(20)} height={scale(20)} color={iconsColor} />
                              ) : (
                                <svg.iconPlusRound width={scale(20)} height={scale(20)} color={iconsColor} />
                              )}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
        style={styles.modalClose}
        onPress={handleClose}>
        <svg.closeIcon width={16} height={16} color={Colors.black} />
      </TouchableOpacity>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modalWrap: {
    paddingHorizontal: 20,
    height: '100%',
    paddingTop: verticalScale(100),
    paddingBottom: verticalScale(30),
  },
  modalClose: {
    position: 'absolute',
    top: verticalScale(Platform.OS === 'ios' ? 68 : 26),
    left: scale(SCREEN_WIDTH / 2 - 48),
    width: scale(16),
    height: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    marginRight: 12,
  },
  categoryTitle: {
    ...fontsConfig.blackDia,
    color: Colors.black,
    fontSize: 22,
  },
  scrollView: {
    flexDirection: 'column',
  },
  tagRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tagItem: {
    padding: 6,
    borderRadius: 4,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    fontFamily: 'Dia',
    color: Colors.black,
    fontSize: 16,
    marginRight: 12,
  },
});

export default TagsModal;
