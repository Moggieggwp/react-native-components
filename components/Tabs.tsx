import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ViewStyle } from 'react-native';
import theme from 'src/navigation/theme';
import Colors from 'src/constants/colors';

type TabsProps = {
  values: string[];
  selectedIndexes?: number[];
  handleOnChangeIndex: (index: number) => void;
  tabsContainerStyle?: ViewStyle;
  activeIndex?: number;
  activeTabStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  firstTabStyle?: ViewStyle;
  lastTabStyle?: ViewStyle;
  selectedTabStyles?: ViewStyle[];
}

const Tabs: FC<TabsProps> = ({
  values,
  selectedIndexes,
  handleOnChangeIndex,
  tabsContainerStyle,
  activeIndex,
  activeTabStyle,
  tabStyle,
  firstTabStyle,
  lastTabStyle,
  selectedTabStyles,
}) => {
  return (
    <View style={[styles.tabsContainerStyle, { ...tabsContainerStyle }]}>
      {values.map((value, index) => {
        const isActive = activeIndex === index;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleOnChangeIndex(index)}
            style={[
              styles.tabStyle,
              selectedIndexes &&
                selectedTabStyles &&
                selectedTabStyles[index] &&
                (selectedIndexes.includes(index) ? selectedTabStyles[index] : {}),
              isActive && styles.activeTabStyle,
              activeTabStyle && (isActive ? activeTabStyle : {}),
              styles.firstTabStyle,
              firstTabStyle && (index === 0 ? firstTabStyle : {}),
              lastTabStyle && (values.length - 1 === index ? lastTabStyle : {}),
              styles.tabStyle,
              tabStyle ? tabStyle : {},
            ]}>
            <View style={styles.labelWrapper}>
              <Text style={[styles.label, isActive && styles.activeLabel]}>{value}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabsContainerStyle: {
    flexDirection: 'row',
    width: '100%',
    height: 35,
  },
  activeTabStyle: {
    borderBottomColor: Colors.primaryBlue,
    borderBottomWidth: 3,
    zIndex: 1,
  },
  firstTabStyle: {
    backgroundColor: theme.colors.background,
  },
  tabStyle: {
    flex: 1,
    borderColor: 'transparent',
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  activeLabel: {
    color: Colors.primaryBlue,
  },
  label: {
    color: Colors.gray,
    fontSize: 13,
  },
});
