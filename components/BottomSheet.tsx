import React, { FC, PropsWithChildren, useCallback, useRef } from 'react';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import Colors from 'src/constants/colors';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

const DEFAULT_SNAPPOINTS = ['25%', '50%'];

type Props = {
  snapPoints: (string | number)[];
  isOpen: boolean;
  onClose?: () => void;
};

const BottomSheet: FC<PropsWithChildren<Props>> = ({ children, snapPoints, isOpen = false, onClose }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (!bottomSheetModalRef?.current) return;
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
    onClose?.();
  }, [bottomSheetModalRef]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} opacity={0.3} disappearsOnIndex={-1} onPress={handleClose} />
    ),
    [bottomSheetModalRef],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints || DEFAULT_SNAPPOINTS}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: Colors.grayBackground,
      }}
      index={1}>
      <View style={styles.container}>{children}</View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default BottomSheet;
