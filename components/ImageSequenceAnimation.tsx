import { FC, useEffect, useRef, useState } from 'react';
import { Animated, ImageStyle, ImageURISource, StyleProp } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';

type Props = {
  imageSequence: ImageURISource[];
  duration?: number;
  style?: StyleProp<ImageStyle>;
};

const ImageSequenceAnimation: FC<Props> = ({ imageSequence, duration = 800, style }) => {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const changeImage = () => {
      // Animated interface: In case if fade or scale transition is needed
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }).start(() => {
        setIndex(prevIndex => (prevIndex + 1) % imageSequence.length);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }).start();
      });
    };

    const interval = setInterval(changeImage, duration);
    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.Image
      resizeMode='cover'
      style={[styles.image, { opacity: fadeAnim, transform: [{ scaleX: fadeAnim }, { scaleY: fadeAnim }] }, style]}
      source={imageSequence[index]}
    />
  );
};

const styles = ScaledSheet.create({
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
});

export default ImageSequenceAnimation;
