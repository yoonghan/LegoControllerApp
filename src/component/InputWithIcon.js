import React from 'react';
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const InputWithIcon: () => React$Node = (props) => {
  const {leftIcon, ...otherProps} = props;
  return (
    <Input
      {...otherProps}
      leftIcon={
        <Icon
          style={{marginRight: 10}}
          name={leftIcon}
          size={24}
          color="#86939e"
        />
      }
      />
  )
}

export default InputWithIcon;
