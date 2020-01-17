import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const Login: () => React$Node = () => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <Input
          label="Your email address"
          placeholder="email@address.com"
          leftIcon={
            <Icon
              name="user"
              size={24}
              color="#86939e"
            />
          }
          />
        <Input
          label="Password"
          placeholder='Password'
          leftIcon={
            <Icon
              name="lock"
              size={24}
              color="#86939e"
            />
          }
          containerStyle={styles.gapContainer}
        />
        <Button
          title="Login"
          containerStyle={styles.btnContainer}
        />
        <Button
          title="Sign up"
          type="outline"
          containerStyle={styles.btnContainer}
        />
      </View>
      <View style={styles.miscContainer}>
        <Button
          title="Forgot password"
          type="clear"
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: 15,
    marginTop: 50
  },
  loginContainer: {
    margin: 30
  },
  gapContainer: {
    marginTop: 20
  },
  btnContainer: {
    marginTop: 30
  },
  miscContainer: {
    marginTop: 30,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Login;
