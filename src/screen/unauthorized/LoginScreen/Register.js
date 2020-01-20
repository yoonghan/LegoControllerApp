import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import { Formik } from "formik";
import { Button } from "react-native-elements";
import { View, StyleSheet, Modal, Alert } from "react-native";
import * as TranslationAction from "../../../redux/action/TranslationAction";
import { RegisterSchema } from "../../../util/schemaValidator";
import auth from '@react-native-firebase/auth';
import { translate } from "../../../util/tools";
import InputWithIcon from "../../../component/InputWithIcon";

const Register: () => React$Node = ({translationState, onLoginPageCall, registerCallback}) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ email: "", password: "", retypePassword: ""}}
          validationSchema={ RegisterSchema }
          onSubmit={(values, {setFieldValue}) => {
            registerCallback(values.email, values.password)
            .catch(e =>{
              console.log("Exception")
            })
            .finally(()=> {
              setFieldValue("password", "", false);
              setFieldValue("retypePassword", "", false);
            });
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
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errorMessage={errors.password}
                secureTextEntry={true}
                leftIcon="lock"
                containerStyle={styles.gapContainer}
                />
              <InputWithIcon
                label={translationState.translate("Retype Password")}
                placeholder='Password'
                onChangeText={handleChange('retypePassword')}
                onBlur={handleBlur('retypePassword')}
                value={values.retypePassword}
                errorMessage={errors.retypePassword}
                secureTextEntry={true}
                leftIcon="lock"
                containerStyle={styles.gapContainer}
                />
              <Button
                title="Register"
                containerStyle={styles.btnContainer}
                onPress={handleSubmit}
              />
            </React.Fragment>
          )}
        </Formik>
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
