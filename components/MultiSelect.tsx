import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import { useEffect } from 'react';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';

type Props = {
  items: { key: string; value: string }[];
  title: string;
  style?: StyleProp<ViewStyle>;
  onChange: (selected: { key: string; value: string }[]) => void;
  selectedValue: { key: string; value: string }[];
  defaultSelected?: { key: string; value: string }[];
};

const MultiSelect: FC<Props> = ({ items, title, style, onChange, selectedValue, defaultSelected }) => {
  const [selectedOptions, setSelectedOptions] = useState(defaultSelected || []);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    if (!selectedValue) return;
    setSelectedOptions(selectedValue);
  }, [selectedValue]);

  const setOption = (option: { key: string; value: string }) => {
    setIsAllSelected(false);

    //const copied = new Set(selectedOptions);
    if (selectedOptions.find(x => x.key === option.key)) {
      onChange([...selectedOptions.filter(x => x.key !== option.key)]);
      return;
    } else {
      onChange([...selectedOptions, option]);
      return;
    }
  };

  const handleSelectAll = () => {
    if (!isAllSelected) {
      onChange(items);
    } else {
      onChange([]);
    }

    setIsAllSelected(!isAllSelected);
  };

  return (
    <View style={style}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{title}</Text>
        <BouncyCheckbox
          isChecked={isAllSelected}
          disableBuiltInState
          text='Select all'
          onPress={handleSelectAll}
          textStyle={styles.checkboxLabel}
          style={{ flexDirection: 'row-reverse' }}
          innerIconStyle={{
            borderColor: 'transparent',
          }}
          size={scale(15)}
          fillColor={Colors.primaryBlue}
          unfillColor={Colors.grayLight}
        />
      </View>
      <View style={styles.itemsWrap}>
        {items.map(item => (
          <TouchableOpacity
            key={item.key}
            onPress={() => setOption(item)}
            style={[
              styles.item,
              selectedOptions && selectedOptions?.find(s => s.key === item.key) && styles.selectedItem,
            ]}>
            <Text style={styles.itemText}>{item.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
  },
  title: {
    ...fontsConfig.blackDia,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.primaryBlue,
    textTransform: 'uppercase',
  },
  checkboxLabel: {
    ...fontsConfig.regularDia,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.primaryBlue,
    textDecorationLine: 'none',
    textTransform: 'uppercase',
    marginRight: 8,
  },
  itemsWrap: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.primaryGray,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedItem: {
    borderColor: Colors.primaryBlue,
  },
  itemText: {
    ...fontsConfig.regularDia,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 1,
    color: Colors.primaryBlue,
    textTransform: 'uppercase',
  },
});

export default MultiSelect;
