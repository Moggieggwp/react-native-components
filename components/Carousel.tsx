import React, { JSXElementConstructor, ReactElement, useRef, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Carousel from 'react-native-reanimated-carousel';
import { useEffect } from 'react';
import Colors from 'src/constants/colors';

type Props<T> = {
  data: T[];
  style?: StyleProp<ViewStyle>;
  height: number;
  width: number;
  renderItem: (item: T, index: number) => ReactElement<any, string | JSXElementConstructor<any>>;
  pagingEnabled?: boolean;
};

function CustomCarousel<T>({ data, style, height, width, renderItem, pagingEnabled }: Props<T>) {
  const ref = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    setKey(prevKey => prevKey + 1);
    ref.current?.scrollTo?.({ index: 0, animated: false });
  }, [data]);

  const renderPagination = () => {
    return data.map((_, index: number) => (
      <View
        key={index}
        style={[
          styles.dot,
          {
            backgroundColor: currentIndex === index ? Colors.primaryBlue : Colors.blueMinorLight,
          },
        ]}
      />
    ));
  };

  return (
    <View style={[{ width: '100%' }, style]}>
      <Carousel
        key={key}
        ref={ref}
        width={width || 250}
        height={height || 160}
        vertical={false}
        loop={false}
        pagingEnabled={pagingEnabled}
        autoPlay={false}
        style={{ width: '100%' }}
        data={data}
        onScrollEnd={index => setCurrentIndex(index)}
        scrollAnimationDuration={300}
        panGestureHandlerProps={{
          activeOffsetX: [-data.length, data.length],
        }}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
      {pagingEnabled && (
        <View style={[{ width: '100%', alignItems: 'center' }, style]}>
          <View style={styles.paginationContainer}>{renderPagination()}</View>
        </View>
      )}
    </View>
  );
}

export default CustomCarousel;

const styles = ScaledSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    marginHorizontal: 2,
    backgroundColor: Colors.primaryBlue,
  },
});
