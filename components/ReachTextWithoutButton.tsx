import React, { FC } from 'react';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import { baseFontStyle, tagsStyles } from 'src/constants/reachText';

type Props = {
  html?: string;
}

const ReachTextWithoutButton: FC<Props> = ({ html }) => {
  if (!html) {
    return null;
  }
  const {width} = useWindowDimensions();
  const cleanedHTML = html.replace(/ style="[^"]*"/g, '');

  return (
    <RenderHtml
      contentWidth={width}
      source={{
        html: cleanedHTML,
      }}
      tagsStyles={tagsStyles}
      baseStyle={{...baseFontStyle, fontSize: 16}}
      enableExperimentalMarginCollapsing={true}
      enableExperimentalBRCollapsing={true}
      enableExperimentalGhostLinesPrevention={true}
      systemFonts={['Dia', 'Beaufort Pro']}
    />
  );
};

export default ReachTextWithoutButton;
