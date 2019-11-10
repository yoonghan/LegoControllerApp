import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import { SafeAreaView, ThemeContext } from 'react-navigation';
import TouchableItem from "./TouchableItem";

class DrawerSidebar extends React.PureComponent {

  static defaultProps = {
    activeTintColor: {
      light: '#2196f3',
      dark: '#fff',
    },
    activeBackgroundColor: {
      light: 'rgba(0, 0, 0, .04)',
      dark: 'rgba(255, 255, 255, .04)',
    },
    inactiveTintColor: {
      light: 'rgba(0, 0, 0, .87)',
      dark: 'rgba(255, 255, 255, .87)',
    },
    inactiveBackgroundColor: {
      light: 'transparent',
      dark: 'transparent',
    },
  };

  static contextType = ThemeContext;

  _getActiveTintColor = () => {
    let { activeTintColor } = this.props;
    if (!activeTintColor) {
      return;
    } else if (typeof activeTintColor === 'string') {
      return activeTintColor;
    }

    return activeTintColor[this.context];
  }

  _getInactiveTintColor = () => {
    let { inactiveTintColor } = this.props;
    if (!inactiveTintColor) {
      return;
    } else if (typeof inactiveTintColor === 'string') {
      return inactiveTintColor;
    }

    return inactiveTintColor[this.context];
  }

  _getActiveBackgroundColor = () => {
    let { activeBackgroundColor } = this.props;
    if (!activeBackgroundColor) {
      return;
    } else if (typeof activeBackgroundColor === 'string') {
      return activeBackgroundColor;
    }

    return activeBackgroundColor[this.context];
  }

  _getInactiveBackgroundColor = () => {
    let { inactiveBackgroundColor } = this.props;
    if (!inactiveBackgroundColor) {
      return;
    } else if (typeof inactiveBackgroundColor === 'string') {
      return inactiveBackgroundColor;
    }

    return inactiveBackgroundColor[this.context];
  }

  _drawTouchableItem = (route, index) => {
    const {
      activeItemKey,
      getLabel,
      renderIcon,
      onItemPress,
      itemsContainerStyle,
      itemStyle,
      labelStyle,
      activeLabelStyle,
      inactiveLabelStyle,
      iconContainerStyle,
      drawerPosition,
    } = this.props;

    const activeTintColor = this._getActiveTintColor();
    const activeBackgroundColor = this._getActiveBackgroundColor();
    const inactiveTintColor = this._getInactiveTintColor();
    const inactiveBackgroundColor = this._getInactiveBackgroundColor();

    const focused = activeItemKey === route.key;
    const color = focused ? activeTintColor : inactiveTintColor;
    const scene = { route, index, focused, tintColor: color };
    const icon = renderIcon(scene);
    const label = getLabel(scene);
    const accessibilityLabel =
      typeof label === 'string' ? label : undefined;
    const backgroundColor = focused
      ? activeBackgroundColor
      : inactiveBackgroundColor;
    const extraLabelStyle = focused
      ? activeLabelStyle
      : inactiveLabelStyle;

    return (

      <TouchableItem
        key={route.key}
        accessible
        accessibilityLabel={accessibilityLabel}
        onPress={() => {
          onItemPress({ route, focused });
        }}
        delayPressIn={0}
      >
        <SafeAreaView
          style={[{ backgroundColor }, styles.item, itemStyle]}
          forceInset={{
            [drawerPosition]: 'always',
            [drawerPosition === 'left' ? 'right' : 'left']: 'never',
            vertical: 'never',
          }}
        >
          {icon ? (
            <View
              style={[
                styles.icon,
                focused ? null : styles.inactiveIcon,
                iconContainerStyle,
              ]}
            >
              {icon}
            </View>
          ) : null}
          <Text
            style={[
              styles.label,
              { color },
              labelStyle,
              extraLabelStyle
            ]}
          >
            {label}
          </Text>
        </SafeAreaView>
      </TouchableItem>
    );
  }


  render() {
    const {
      items
    } = this.props;

    return (
      <View>
        {
          items.map(this._drawTouchableItem)
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  inactiveIcon: {
    /*
     * Icons have 0.54 opacity according to guidelines
     * 100/87 * 54 ~= 62
     */
    opacity: 0.62,
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
  },
});

export default DrawerSidebar;
