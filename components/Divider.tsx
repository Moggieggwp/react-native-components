import React, { FC } from 'react';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';
import Colors from 'src/constants/colors';

type DividerProps = {
  center?: boolean;
  left?: boolean;
  right?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Divider: FC<DividerProps> = ({ center, left, right, style, color }) => {
  const combinedStyle = StyleSheet.flatten([
    styles.container,
    center && styles.center,
    left && styles.left,
    right && styles.right,
    {backgroundColor: color || Colors.primaryGray},
    style,
  ]);

  return <View style={combinedStyle} />;
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: Colors.primaryGray,
    width: '100%',
  },
  center: {
    alignSelf: 'center',
  },
  left: {
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
});
