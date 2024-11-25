import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

type RowProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default ({ children, style }: RowProps) => <View style={[styles.container, style]}>{children}</View>;

const styles = StyleSheet.create({ container: { flexDirection: 'row' } });
