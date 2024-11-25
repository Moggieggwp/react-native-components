import React, { useState, useMemo, useCallback, FC } from 'react';
import { View, TouchableOpacity, Modal, TextInput, FlatList, Platform, Text } from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import * as svg from 'assets/svg';
import Colors from 'src/constants/colors';
import { City } from 'src/models/city';
import fontsConfig from 'src/constants/fonts';
import { DEFAULT_TOP_PADDING } from 'src/constants/layout';

type CityListItem = {
  value: City;
  id: number;
};

type Props = {
  cities: City[];
  isOpen: boolean;
  onSelect: (city: City) => void;
  onClose: () => void;
  placeholderCity?: string;
  backgroundColor?: string;
  textColor?: string;
  placeholderTextColor?: string;
};

const CitiesModal: FC<Props> = ({
  isOpen,
  onSelect,
  onClose,
  cities,
  placeholderCity,
  backgroundColor,
  textColor,
  placeholderTextColor,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSelectCity = (city: City) => {
    setSearchValue('');
    onSelect?.(city);
  };

  const handleClose = () => {
    setSearchValue('');
    onClose?.();
  };

  const renderOption = ({ item }: { item: CityListItem }) => {
    const disabled = !item.value.isGuideExist && !item.value.y5PdfUrl;
    return item?.value?.name.toLowerCase().includes(searchValue.toLowerCase()) || !searchValue.length ? (
      <TouchableOpacity disabled={disabled} key={item.id} style={styles.listItem} onPress={() => handleSelectCity(item.value)}>
        <Text style={[styles.cityTitle, { color: textColor ? textColor : Colors.primaryBlue, lineHeight: 46 }, disabled && styles.disabled]}>
          {item.value?.name || ''}
        </Text>
      </TouchableOpacity>
    ) : null;
  };

  const keyExtractor = useCallback((item: CityListItem, index: number) => {
    return `${item.value._id}`;
  }, []);

  const options = useMemo(() => {
    return cities.length > 0
      ? [...cities].sort((a, b) => a.name.localeCompare(b.name)).map((city, i) => ({ value: city, id: i }))
      : [];
  }, [cities]);

  return (
    <Modal animationType='fade' transparent={false} visible={isOpen}>
      <View style={[styles.modalWrap, { backgroundColor: backgroundColor ? backgroundColor : Colors.grayBackground }]}>
        <TextInput
          style={[styles.input, styles.cityTitle, { color: textColor ? textColor : Colors.primaryBlue }]}
          onChangeText={val => setSearchValue(val)}
          value={searchValue}
          placeholder={placeholderCity}
          placeholderTextColor={placeholderTextColor ? placeholderTextColor : Colors.primaryBlue}
        />
        <FlatList
          data={options}
          renderItem={renderOption}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          style={styles.optionsList}
        />
      </View>
      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
        style={styles.modalClose}
        onPress={handleClose}>
        <svg.closeIcon width={20} height={20} color={textColor ? textColor : Colors.primaryBlue} />
      </TouchableOpacity>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modalWrap: {
    paddingHorizontal: 24,
    height: '100%',
    paddingTop: verticalScale(Platform.OS === 'ios' ? DEFAULT_TOP_PADDING + 2 : DEFAULT_TOP_PADDING - 50),
  },
  modalClose: {
    position: 'absolute',
    top: verticalScale(Platform.OS === 'ios' ? DEFAULT_TOP_PADDING + 2 : DEFAULT_TOP_PADDING - 43),
    right: scale(24),
    width: scale(25),
    height: scale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityTitle: {
    ...fontsConfig.regularBeaufort,
    fontSize: 28,
    letterSpacing: -0.28,
  },
  optionsList: {
    marginTop: verticalScale(18),
    flex: 1,
  },
  input: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    width: '90%',
    paddingLeft: 0,
  },
  listItem: {
    marginBottom: 15,
  },
  disabled: {
    opacity: 0.3,
  }
});

export default CitiesModal;
