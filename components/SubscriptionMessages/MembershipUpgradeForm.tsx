import React, { FC, useRef } from 'react';
import { KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import Button from 'src/components/Button';
import fontsConfig from 'src/constants/fonts';
import { SCREEN_HEIGHT } from 'src/constants/window';

type Props = {
  inputValue: string;
  onChangeText: (value: string) => void;
  onSubmitMembershipRequest: () => void;
};

const MembershipUpgradeForm: FC<Props> = ({ inputValue, onChangeText, onSubmitMembershipRequest }) => {
  const ref = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View>
        <Text style={styles.reservationsCountText}>{`Upgrade`}</Text>
        <Pressable onPress={() => ref?.current?.focus()} style={styles.viewBody}>
          <TextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor={Colors.primaryBlue}
            value={inputValue}
            onChangeText={text => onChangeText(text)}
            multiline={true}
            // @ts-ignore
            minHeight={verticalScale(100)}
          />
          <Text style={styles.placeholderText}>MESSAGE TO YAYEM</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <Button
          style={styles.sheetFormBtn}
          textStyle={styles.sheetFormBtnText}
          title={'Submit Request'}
          onPress={onSubmitMembershipRequest}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default MembershipUpgradeForm;

const styles = ScaledSheet.create({
  sheetFormBtn: {
    backgroundColor: Colors.rareBlue,
    position: 'absolute',
    zIndex: 2,
    bottom: SCREEN_HEIGHT * 0.42,
  },
  sheetFormBtnText: {
    ...fontsConfig.boldDia,
    fontSize: 16,
    color: Colors.primaryBlue,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  reservationsCountText: {
    ...fontsConfig.regularDia,
    fontSize: 32,
    color: Colors.primaryBlue,
  },
  viewBody: {
    marginTop: 32,
    width: '100%',
    position: 'relative',
  },
  input: {
    ...fontsConfig.regularBeaufort,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.primaryBlue,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: verticalScale(36),
    borderRadius: 4,
    borderWidth: 1,
    textAlignVertical: 'top',
    borderColor: Colors.primaryBlue,
  },
  placeholderText: {
    ...fontsConfig.regularDia,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.primaryBlue,
    position: 'absolute',
    left: 1.2,
    top: 1.2,
    paddingLeft: scale(16),
    paddingTop: scale(12),
    paddingBottom: scale(2),
    backgroundColor: Colors.grayBackground,
    width: '99.2%'
  },
});