import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as svg from 'assets/svg';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';

type QuantityButtonsProps = {
  quantity: number;
  slotsAvailableForMember: number;
  onMinus: () => void;
  onPlus: (maxValue: number) => void;
}

export const useQuantityButtons = (defaultQuantity: number): {
  quantity: number;
  onMinus: () => void;
  onPlus: (maxValue: number) => void;
} => {
  const [quantity, setQuantity] = useState(defaultQuantity || 1);

  const onMinus = useCallback(() => {
    setQuantity((value) => Math.max(value - 1, 1));
  }, []);

  const onPlus = useCallback((maxValue: number) => {
    setQuantity((value) => Math.min(value + 1, maxValue));
  }, []);

  return {
    quantity,
    onMinus,
    onPlus,
  };
};

export const QuantityButtons: React.FC<QuantityButtonsProps> = ({
  quantity,
  slotsAvailableForMember,
  onMinus,
  onPlus,
}) => {
  const isDisabledMinus = quantity <= 1;
  const isDisabledPlus = quantity >= slotsAvailableForMember;

  const handlePlusPress = () => {
    onPlus(slotsAvailableForMember);
  };

  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        style={[styles.buttonQuanity, isDisabledMinus ? styles.disabled : {}]}
        disabled={isDisabledMinus}
        onPress={onMinus}>
        <View style={styles.quantityButtonText}>
          <svg.iconMinus width={10} height={10} color={Colors.primaryBlue} />
        </View>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity
        style={[styles.buttonQuanity, isDisabledPlus ? styles.disabled : {}]}
        disabled={isDisabledPlus}
        onPress={handlePlusPress}>
        <View style={styles.quantityButtonText}>
          <svg.iconPlus width={10} height={10} color={Colors.primaryBlue} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonQuanity: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 20 / 2,
    borderColor: Colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: Colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    ...fontsConfig.regularDia,
    marginLeft: 8,
    marginRight: 8,
    minWidth: 20,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primaryBlue,
    fontWeight: '400',
    lineHeight: 19,
  },
  disabled: {
    opacity: 0.5,
  },
});
