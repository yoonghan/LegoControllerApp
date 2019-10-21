import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const DrawerButton: () => React$Node = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={props.navigation.toggleDrawer}>
        <Text>Press</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DrawerButton;
