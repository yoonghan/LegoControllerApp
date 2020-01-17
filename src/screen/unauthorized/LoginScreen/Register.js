import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import { Input, Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as TranslationAction from "../../../redux/action/TranslationAction";

const Register: () => React$Node = ({translationState, onLoginPageCall}) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <Input
          label={translationState.translate("Your email address")}
          placeholder="email@address.com"
          leftIcon={
            <Icon
              name="envelope"
              size={24}
              color="#86939e"
            />
          }
          />
        <Input
          label={translationState.translate("Password")}
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
        <Input
          label={translationState.translate("Retype Password")}
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
          title="Register"
          containerStyle={styles.btnContainer}
        />
        <Button
          title="Cancel"
          type="outline"
          containerStyle={styles.btnContainer}
          onPress={onLoginPageCall}
        />
      </View>
    </View>
  );
}

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

export default compose(
  connect(TranslationAction.mapStateToProps, TranslationAction.mapDispatchToProps)
)(Register);
