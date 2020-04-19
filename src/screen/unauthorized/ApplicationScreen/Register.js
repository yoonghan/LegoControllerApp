import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import { Formik } from "formik";
import { Button } from "react-native-elements";
import { View, StyleSheet, Modal } from "react-native";
import * as TranslationAction from "../../../redux/action/TranslationAction";
import { ApplicationSchema } from "../../../util/schemaValidator";
import auth from '@react-native-firebase/auth';
import { translate } from "../../../util/tools";
import InputWithIcon from "../../../component/InputWithIcon";
import * as QRRegistrationAction from "../../../redux/action/QRRegistrationAction";

const Register: () => React$Node = ({translationState, registerCallback, cancelCallback, qrState}) => {
  const [focusIdx, setFocusIdx] = React.useState(0);

  const getInitialData = () => {
    const {info} = qrState;
    if(isNew()) {
      return {
        first_name: "",
        last_name: "",
        mobileno: "",
        email: "",
        address: "",
        postal_code: "",
        co_name: ""
      }
    }
    else {
      const infoInJson = JSON.parse(info);
      const {first_name, last_name, mobileno, email, address, postal_code, co_name} = infoInJson;
      return {
        first_name: first_name,
        last_name: last_name,
        mobileno: mobileno,
        email: email,
        address: address,
        postal_code: postal_code,
        co_name: co_name
      }
    }
  }

  const isNew = () => {
    const {info} = qrState;
    return (Object.keys(info).length === 0 && info.constructor === Object);
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={getInitialData()}
          validationSchema={ ApplicationSchema }
          onSubmit={(values, {setFieldValue}) => {
            setFocusIdx(0);
            registerCallback(isNew(), values.first_name, values.last_name, values.mobileno, values.email, values.address, values.postal_code, values.co_name);
          }}
          >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <React.Fragment>
              <InputWithIcon
                label={translationState.translate("unauthorized.applicationScreen.First/Given name")}
                placeholder={translationState.translate("unauthorized.applicationScreen.First/Given name")}
                onChangeText={handleChange('first_name')}
                onBlur={()=>{setFocusIdx(0);handleBlur('first_name')}}
                value={values.first_name}
                errorMessage={errors.first_name}
                leftIcon="envelope"
                maxLength={50}
                autoCompleteType = { "name" }
                returnKeyType = { "next" }
                onSubmitEditing={() => { setFocusIdx(1) }}
                blurOnSubmit={false}
                />
              <InputWithIcon
                label={translationState.translate("unauthorized.applicationScreen.Last/Surname name")}
                placeholder={translationState.translate("unauthorized.applicationScreen.Last/Surname name")}
                onChangeText={handleChange('last_name')}
                onBlur={()=>{setFocusIdx(0);handleBlur('last_name')}}
                value={values.last_name}
                errorMessage={errors.last_name}
                leftIcon="envelope"
                maxLength={50}
                focus={focusIdx === 1}
                returnKeyType = { "next" }
                autoCompleteType={'name'}
                onSubmitEditing={() => { setFocusIdx(2) }}
                blurOnSubmit={false}
                />
              <InputWithIcon
                label={translationState.translate("unauthorized.applicationScreen.Mobile No")}
                placeholder="+65 XXXXXXX"
                onChangeText={handleChange('mobileno')}
                onBlur={()=>{setFocusIdx(0);handleBlur('mobileno')}}
                value={values.mobileno}
                errorMessage={errors.mobileno}
                leftIcon="phone"
                maxLength={8}
                keyboardType={"phone-pad"}
                autoCompleteType={"tel"}
                focus={focusIdx === 2}
                returnKeyType = { "next" }
                onSubmitEditing={() => { setFocusIdx(3) }}
                blurOnSubmit={false}
                />
              <InputWithIcon
                label={translationState.translate("unauthorized.applicationScreen.Email Address")}
                placeholder="email@address.com"
                onChangeText={handleChange('email')}
                onBlur={()=>{setFocusIdx(0);handleBlur('email')}}
                value={values.email}
                errorMessage={errors.email}
                focus={focusIdx === 3}
                leftIcon="envelope"
                maxLength={100}
                keyboardType={"email-address"}
                autoCompleteType={"email"}
                returnKeyType = { "next" }
                onSubmitEditing={() => { setFocusIdx(4) }}
                blurOnSubmit={false}
                />
              <InputWithIcon
                label={translationState.translate("unauthorized.applicationScreen.Address")}
                placeholder={translationState.translate("unauthorized.applicationScreen.Address")}
                onChangeText={handleChange('address')}
                onBlur={()=>{setFocusIdx(0);handleBlur('address')}}
                value={values.address}
                errorMessage={errors.address}
                leftIcon="lock"
                maxLength={400}
                containerStyle={styles.gapContainer}
                focus={focusIdx === 4}
                autoCompleteType={'street-address'}
                returnKeyType = { "next" }
                onSubmitEditing={() => { setFocusIdx(5) }}
                blurOnSubmit={false}
                />
              <InputWithIcon
                label={translationState.translate("unauthorized.applicationScreen.Postal Code")}
                placeholder={translationState.translate("unauthorized.applicationScreen.Postal Code")}
                onChangeText={handleChange('postal_code')}
                onBlur={()=>{setFocusIdx(0);handleBlur('postal_code')}}
                value={values.postal_code}
                errorMessage={errors.postal_code}
                leftIcon="lock"
                maxLength={100}
                containerStyle={styles.gapContainer}
                focus={focusIdx === 5}
                autoCompleteType={'postal-code'}
                returnKeyType = { "next" }
                onSubmitEditing={() => { setFocusIdx(6) }}
                blurOnSubmit={false}
                />
              <InputWithIcon
                label={translationState.translate("unauthorized.applicationScreen.Company Name")}
                placeholder={translationState.translate("unauthorized.applicationScreen.Company Name")}
                onChangeText={handleChange('co_name')}
                onBlur={()=>{setFocusIdx(0);handleBlur('co_name')}}
                value={values.co_name}
                errorMessage={errors.co_name}
                leftIcon="lock"
                maxLength={50}
                containerStyle={styles.gapContainer}
                focus={focusIdx === 6}
                returnKeyType = { "next" }
                onSubmitEditing={() => { setFocusIdx(7) }}
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
          onPress={cancelCallback}
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
    marginTop: 50,
    marginBottom: 50
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
  connect(TranslationAction.mapStateToProps, TranslationAction.mapDispatchToProps),
  connect(QRRegistrationAction.mapStateToProps, QRRegistrationAction.mapDispatchToProps)
)(Register);
