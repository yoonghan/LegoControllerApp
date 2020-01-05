import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DrawerButton: () => React$Node = (props) => {
  return (
    <View style={drawButtonStyles.container}>
      <TouchableOpacity onPress={props.navigation.toggleDrawer}>
        <Icon name="bars" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  )
}


const drawButtonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 15
  }
});

export default DrawerButton;
