import React, { FC } from 'react';
import { View, Pressable, Image } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from 'assets/images';
import { baseFontStyle, tagsStyles } from 'src/constants/reachText';
import Colors from 'src/constants/colors';

type Props = {
  html?: string;
  onPress: () => void;
};

const ReachText: FC<Props> = ({ html, onPress }) => {
  if (!html) {
    return null;
  }

  const { width, height } = useWindowDimensions();

  const cleanedHTML = html.replace(/ style="[^"]*"/g, '');

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={styles.container}>
      <View
        style={{
          maxHeight: height - 700 < 20 ? 20 : height - 700,
          overflow: 'hidden',
        }}>
        <RenderHtml
          contentWidth={width - 20}
          source={{
            html: cleanedHTML,
          }}
          tagsStyles={tagsStyles}
          baseStyle={baseFontStyle}
          enableExperimentalMarginCollapsing={true}
          enableExperimentalBRCollapsing={true}
          enableExperimentalGhostLinesPrevention={true}
          systemFonts={['Dia', 'BeaufortPro']}
        />
      </View>
      <View style={styles.icon}>
        <Image source={Images.arrowDescription} />
      </View>
    </TouchableOpacity>
  );
};

export default ReachText;

const styles = ScaledSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: Colors.primaryGray,
    borderRadius: 8,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    marginTop: 8,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
