import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as svg from 'assets/svg';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';

const DEFAULT_TITLE = 'Adjust filter settings to discover more experiences.';

const EmptyListPlaceholder = ({ title = DEFAULT_TITLE }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <svg.emptyListIcon width={78} height={78} color={Colors.black} />
      </View>
      <View style={styles.messageWrap}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default EmptyListPlaceholder;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageWrap: {
    maxWidth: 217,
  },
  iconWrap: {
    marginBottom: 50,
  },
  title: {
    ...fontsConfig.regularBeaufort,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 24,
    color: Colors.black,
    textAlign: 'center',
  },
});
