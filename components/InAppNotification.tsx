import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useCallback,
} from 'react';
import { Pressable, Text } from 'react-native';
import { Gesture, GestureDetector, State, TapGestureHandler } from 'react-native-gesture-handler';
import { ScaledSheet, scale } from 'react-native-size-matters';
import Colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/window';
import fontsConfig from 'src/constants/fonts';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const TOP_VALUE = 60;
const HIDE_VALUE = -208;
const DEFAULT_DURATION = 350;

export enum InAppNotificationEnum {
  ERROR = 'error',
  INFO = 'info',
}

const DEFAULT_OPTIONS: NotificationOptions = {
  title: '',
  message: '',
  duration: 4000,
  autoHide: true,
  hideStatusBar: false,
  type: InAppNotificationEnum.INFO,
};

export type NotificationOptions = {
  title?: string;
  message?: string | unknown;
  duration?: number;
  autoHide?: boolean;
  hideStatusBar?: boolean;
  type?: InAppNotificationEnum;
};

type InAppNotificationProps = {};

const InAppNotification: ForwardRefRenderFunction<unknown, InAppNotificationProps> = (props, ref): ReactNode => {
  const toastTopAnimation = useSharedValue(HIDE_VALUE);
  const context = useSharedValue(0);
  const [showing, setShowing] = useState<boolean | null>(null);
  const [options, setOptions] = useState<NotificationOptions>(DEFAULT_OPTIONS);
  const isError = options.type === InAppNotificationEnum.ERROR;

  useImperativeHandle(
    ref,
    () => ({
      show,
    }),
    [],
  );

  const onPress = () => {
    setShowing(false);
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = toastTopAnimation.value;
    })
    .onUpdate(event => {
      if (event.translationY < 50) {
        toastTopAnimation.value = withSpring(context.value + event.translationY, {
          damping: 600,
          stiffness: 100,
        });
      }
    })
    .onEnd(event => {
      if (event.translationY < 0) {
        // @ts-ignore
        toastTopAnimation.value = withTiming(HIDE_VALUE, null, finish => {
          if (finish) {
            runOnJS(setShowing)(false);
          }
        });
      } else if (event.translationY > 0) {
        toastTopAnimation.value = withSequence(
          withTiming(TOP_VALUE),
          withDelay(
            options.duration || DEFAULT_DURATION,
            // @ts-ignore
            withTiming(HIDE_VALUE, null, finish => {
              if (finish) {
                runOnJS(setShowing)(false);
              }
            }),
          ),
        );
      }
    });

  const show = useCallback(
    (newOptions: NotificationOptions) => {
      setOptions({ ...options, ...newOptions });
      setShowing(true);
      toastTopAnimation.value = withSequence(
        withTiming(TOP_VALUE),
        withDelay(
          options.duration || DEFAULT_DURATION,
          // @ts-ignore
          withTiming(HIDE_VALUE, null, finish => {
            if (finish) {
              runOnJS(setShowing)(false);
            }
          }),
        ),
      );
    },
    [TOP_VALUE, toastTopAnimation],
  );

  const animatedTopStyles = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    };
  });

  const onTapHandlerStateChange = (event: any) => {
    const { state } = event.nativeEvent;
    if (state === State.END) setShowing(false);
  };

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.notification, animatedTopStyles]}>
        <TapGestureHandler onHandlerStateChange={onTapHandlerStateChange}>
          <Pressable
            onPress={onPress}
            style={[styles.content, { backgroundColor: isError ? Colors.redLight : Colors.rareBlue }]}>
            <Text style={[styles.title, { color: isError ? Colors.redText : Colors.darkBlue }]}>
              {options.title || 'Error'}
            </Text>
            <Text style={[styles.description, { color: isError ? Colors.redText : Colors.darkBlue }]}>
              {typeof options.message == 'string' ? options.message : 'Something went wrong'}
            </Text>
          </Pressable>
        </TapGestureHandler>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = ScaledSheet.create({
  notification: {
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    elevation: 6,
    zIndex: 1000,
  },
  content: {
    width: SCREEN_WIDTH - scale(40),
    marginTop: 0,
    borderRadius: 12,
    paddingVertical: scale(26),
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...fontsConfig.boldDia,
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    ...fontsConfig.regularBeaufort,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default forwardRef(InAppNotification);
