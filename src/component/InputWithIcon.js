import React from 'react';
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const InputWithIcon: () => React$Node = (props) => {
  const {leftIcon, ...otherProps} = props;
  const inputRef = React.useRef(null);

  if(props.focus) {
    if(inputRef.current !== null && !inputRef.current.isFocused())
      inputRef.current.focus()
  }

  return (
    <Input
      ref={inputRef}
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
