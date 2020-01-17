import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import { Formik } from "formik";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import * as TranslationAction from "../../../redux/action/TranslationAction";
import { LoginSchema } from "../../../util/schemaValidator";

const Login: () => React$Node = ({translationState, onRegisterPageCall}) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ email: '', password: ''}}
          validationSchema={ LoginSchema }
          onSubmit={values => {
            console.warn("P")
          }}
          >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <React.Fragment>
              <Input
                label={translationState.translate("Your email address")}
                placeholder="email@address.com"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={errors.email}
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
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errorMessage={errors.password}
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
                title={translationState.translate("Login")}
                containerStyle={styles.btnContainer}
                onPress={handleSubmit}
              />
            </React.Fragment>
          )}
        </Formik>
        <Button
          title={translationState.translate("Register")}
          type="outline"
          containerStyle={styles.btnContainer}
          onPress={onRegisterPageCall}
        />
      </View>
      <View style={styles.miscContainer}>
        <Button
          title={translationState.translate("Forgot Password")}
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

export default compose(
  connect(TranslationAction.mapStateToProps, TranslationAction.mapDispatchToProps)
)(Login);
