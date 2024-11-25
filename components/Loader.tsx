import React from 'react';
import { View, Modal } from 'react-native';
import { useState } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { ScaledSheet, scale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import LoadingDots from '@apolloeagle/loading-dots';

const Loader = forwardRef(({}, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
    isModalVisible: () => {
      return visible;
    },
  }));

  if (!visible) return null;

  return (
    <View style={styles.loader}>
      <View style={styles.container}>
        <LoadingDots color={Colors.blackLight} size={25} />
      </View>
    </View>
  );
});

export default Loader;

const styles = ScaledSheet.create({
  loader: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    top: 0,
    left: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.33)',
  },
  txtLoading: {
    minWidth: 250,
    textAlign: 'center',
    marginBottom: scale(8),
  },
  fitContent: {
    flex: 0,
    opacity: 1,
  },
});
