import React, { useMemo, useCallback, FC } from 'react';
import { View, TouchableOpacity, Modal, TextInput, FlatList, Platform, Text } from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import * as svg from 'assets/svg';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import { DEFAULT_TOP_PADDING } from 'src/constants/layout';
import { usePlacesApi } from 'src/utils/google-places';
import Config from 'react-native-config';
import { PlacePrediction } from 'src/types/google-places';

type CityListItem = {
  value: PlacePrediction;
  id: number;
};

type Props = {
  isOpen: boolean;
  onSelect: (city: PlacePrediction) => void;
  onClose: () => void;
  placeholderCity?: string;
  backgroundColor?: string;
  textColor?: string;
  placeholderTextColor?: string;
  autoFocus?: boolean;
};

const GooglePlacesCitiesModal: FC<Props> = ({
  isOpen,
  onSelect,
  onClose,
  placeholderCity,
  backgroundColor,
  textColor,
  placeholderTextColor,
  autoFocus = false,
}) => {
  const { query, onQueryChange, places, reset } = usePlacesApi(Config.GOOGLE_API_KEY);

  const handleSelectCity = (city: PlacePrediction) => {
    onSelect?.(city);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const renderOption = ({ item }: { item: CityListItem }) => {
    return (
      <TouchableOpacity key={item.id} style={styles.listItem} onPress={() => handleSelectCity(item.value)}>
        <Text style={[styles.cityTitle, { color: textColor ? textColor : Colors.primaryBlue, lineHeight: 46 }]}>
          {item.value?.description || ''}
        </Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = useCallback((item: CityListItem, index: number) => {
    return `${item.value.place_id}`;
  }, []);

  const options = useMemo(() => {
    return places.length > 0
      ? [...places]
          .sort((a, b) => a.structured_formatting.main_text.localeCompare(b.structured_formatting.main_text))
          .map((city, i) => ({ value: city, id: i }))
        : [];
  }, [places]);

  return (
    <Modal animationType='fade' transparent={false} visible={isOpen}>
      <View style={[styles.modalWrap, { backgroundColor: backgroundColor ? backgroundColor : Colors.grayBackground }]}>
        <TextInput
          style={[styles.input, styles.cityTitle, { color: textColor ? textColor : Colors.primaryBlue }]}
          onChangeText={val => onQueryChange(val)}
          value={query}
          placeholder={placeholderCity}
          placeholderTextColor={placeholderTextColor ? placeholderTextColor : Colors.primaryBlue}
          autoFocus={autoFocus}
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
});

export default GooglePlacesCitiesModal;
