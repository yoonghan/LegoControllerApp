import React from 'react';
import {
  Platform,
  View,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';

const ANDROID_VERSION_LOLLIPOP = 21;

const TouchableItem: () => React$Node = (props) => {
  if (
    Platform.OS === 'android' &&
    Platform.Version >= ANDROID_VERSION_LOLLIPOP
  ) {
    const { style, ...rest } = props;
    return (
      <TouchableNativeFeedback
        {...rest}
        style={null}
        background={TouchableNativeFeedback.Ripple(
          props.pressColor,
          props.borderless
        )}
      >
        <View style={style}>{React.Children.only(props.children)}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
  );
}

export default TouchableItem;
