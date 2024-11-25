import { FC } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface PaginationDotsProps {
  totalItems: number;
  currentIndex: number;
}

const PaginationDots: FC<PaginationDotsProps> = ({ totalItems, currentIndex }) => {
  const dots = [];

  for (let i = 0; i < totalItems; i++) {
    dots.push(<View key={i} style={[styles.dot, i === currentIndex ? styles.activeDot : styles.inactiveDot]} />);
  }

  return <View style={{ flexDirection: 'row' }}>{dots}</View>;
};

export default PaginationDots;

const styles = ScaledSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  activeDot: {
    backgroundColor: 'black',
  },
  inactiveDot: {
    backgroundColor: 'transparent',
  },
});
