import React from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const LegoButton: () => React$Node = ({title, onPress}) => {
  return (
    <Button
      title={title}
      onPress={onPress}
    />
  )
}

export default LegoButton;
