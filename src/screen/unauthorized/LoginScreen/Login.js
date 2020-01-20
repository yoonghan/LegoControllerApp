import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import { Formik } from "formik";
import { Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import InputWithIcon from "../../../component/InputWithIcon";
import * as TranslationAction from "../../../redux/action/TranslationAction";
import { LoginSchema } from "../../../util/schemaValidator";

const Login: () => React$Node = ({translationState, onRegisterPageCall, loginCallback, onForgotPasswordCall}) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ email: '', password: ''}}
          validationSchema={ LoginSchema }
          onSubmit={(values, {setFieldValue}) => {
            loginCallback(values.email, values.password);
          }}
          >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <React.Fragment>
              <InputWithIcon
                label={translationState.translate("Your email address")}
                placeholder="email@address.com"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={errors.email}
                leftIcon="envelope"
                />
              <InputWithIcon
                label={translationState.translate("Password")}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errorMessage={errors.password}
                leftIcon="lock"
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
          onPress={onForgotPasswordCall}
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
  }
});

export default compose(
  connect(TranslationAction.mapStateToProps, TranslationAction.mapDispatchToProps)
)(Login);
