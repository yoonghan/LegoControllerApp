import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import { Formik } from "formik";
import { Button } from "react-native-elements";
import { View, StyleSheet, Modal } from "react-native";
import * as TranslationAction from "../../../redux/action/TranslationAction";
import { RegisterSchema } from "../../../util/schemaValidator";
import auth from '@react-native-firebase/auth';
import { translate } from "../../../util/tools";
import InputWithIcon from "../../../component/InputWithIcon";

const Register: () => React$Node = ({translationState, onLoginPageCall, registerCallback}) => {
  const [focusIdx, setFocusIdx] = React.useState(0);

  return (
    <View>
      <View style={styles.inputContainer}>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ email: "", password: "", retypePassword: ""}}
          validationSchema={ RegisterSchema }
          onSubmit={(values, {setFieldValue}) => {
            setFocusIdx(0);
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
                onBlur={()=>{setFocusIdx(0);handleBlur('email')}}
                value={values.email}
                errorMessage={errors.email}
                leftIcon="envelope"
                keyboardType={"email-address"}
                returnKeyType = { "next" }
                onSubmitEditing={() => { setFocusIdx(1) }}
                blurOnSubmit={false}
                />
              <InputWithIcon
                label={translationState.translate("Password")}
                placeholder='Password'
                onChangeText={handleChange('password')}
                onBlur={()=>{setFocusIdx(0);handleBlur('password')}}
                value={values.password}
                errorMessage={errors.password}
                secureTextEntry={true}
                leftIcon="lock"
                containerStyle={styles.gapContainer}
                focus={focusIdx === 1}
                returnKeyType = { "next" }
                onSubmitEditing={() => { setFocusIdx(2) }}
                blurOnSubmit={false}
                />
              <InputWithIcon
                label={translationState.translate("Retype Password")}
                placeholder='Password'
                onChangeText={handleChange('retypePassword')}
                onBlur={()=>{setFocusIdx(0);handleBlur('retypePassword')}}
                value={values.retypePassword}
                errorMessage={errors.retypePassword}
                secureTextEntry={true}
                leftIcon="lock"
                containerStyle={styles.gapContainer}
                focus={focusIdx === 2}
                onSubmitEditing={() => { setFocusIdx(3) }}
                blurOnSubmit={true}
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
