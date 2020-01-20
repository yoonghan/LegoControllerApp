import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import { Formik } from "formik";
import Loader from "react-native-modal-loader";
import { Input, Button } from "react-native-elements";
import { View, StyleSheet, Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import * as TranslationAction from "../../../redux/action/TranslationAction";
import { ForgotPasswordSchema } from "../../../util/schemaValidator";
import InputWithIcon from "../../../component/InputWithIcon";
import { translate } from "../../../util/tools";

const filterTranslateError = (errorMessage) => {
  switch(errorMessage) {
    case "auth/network-request-failed":
    case "auth/too-many-requests":
      return translate("auth/tryagainlater");
    case "auth/email-already-in-use":
      return translate("auth/email-already-in-use");
    case "auth/user-not-found":
      return translate("auth/user-not-found");
    default:
      return translate("auth/appError");
  }
}

const enumLoadState = {
  INIT: 0,
  SENDING: 1,
  SENT: 2,
  ERROR: 3
}

const ForgotPassword: () => React$Node = ({navigation, translationState, onLoginPageCall, loginCallback}) => {

  const [loadingState, setLoadingState] = React.useState(enumLoadState.INIT);

  async function callForgotPassword(email) {
    setLoadingState(enumLoadState.SENDING);
    auth().sendPasswordResetEmail(email)
    .then(
      ()=> {
        setLoadingState(enumLoadState.SENT);
      }
    )
    .catch(e => {
      console.warn(e.code);
      console.warn(e.message);
      setLoadingState(enumLoadState.ERROR);
      Alert.alert(
        "Error",
        filterTranslateError(e.code),
        [
          {text: "OK"}
        ],
        {cancelable: false}
      );
    });
  }

  function isLoading() {
    switch(loadingState) {
      case enumLoadState.SENDING:
        return true;
      default:
        return false;
    }
  }

  React.useEffect(() => {
    if(loadingState === enumLoadState.SENT) {
      Alert.alert(
        "Success",
        translate("auth/email-sent"),
        [
          {
            text: "OK",
            onPress: () => {navigation.navigate('LoginScreen');}
          }
        ],
        {cancelable: false}
      );
    }
  }, [loadingState]);

  return (
    <View>
      <View style={styles.inputContainer}>
        <Loader loading={isLoading()} color="#333333" />
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ email: ''}}
          validationSchema={ ForgotPasswordSchema }
          onSubmit={values => {
            callForgotPassword(values.email);
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
              <Button
                title={translationState.translate("Send email")}
                containerStyle={styles.btnContainer}
                onPress={handleSubmit}
              />
            </React.Fragment>
          )}
        </Formik>
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
  btnContainer: {
    marginTop: 30
  }
});

export default compose(
  connect(TranslationAction.mapStateToProps, TranslationAction.mapDispatchToProps)
)(ForgotPassword);
