import React from "react";
import Register from "./Register";
import Loader from "react-native-modal-loader";
import { ScrollView, StyleSheet, Alert, View } from "react-native";
import {connect} from "react-redux";
import {compose} from "redux";
import { translate } from "../../../util/tools";
import * as QRRegistrationAction from "../../../redux/action/QRRegistrationAction";

const enumLoading = {
  REGISTERING: 0,
  REGISTERED: 1,
  ERROR: 2
}

const register = (setLoadingFunc, save, navigation) => async (first_name, last_name, mobileno, email, address, postal_code, co_name) => {
  setLoadingFunc(enumLoading.REGISTERING);
  await save(first_name, last_name, mobileno, email, address, postal_code, co_name);
  setLoadingFunc(enumLoading.REGISTERED);
  navigation.replace("InstructionFirstLogin");
  // Alert.alert(
  //   translate("unauthorized.applicationScreen.success"),
  //   translate("unauthorized.applicationScreen.registered"),
  //   [{ text: translate("OK")}],
  //   {cancelable: false}
  // );
}

const cancelCallback = (navigation) => () => {
  navigation.pop();
}

const ApplicationScreen: () => React$Node = (props) => {
  const [loadState, setLoading] = React.useState(enumLoading.INIT);
  const registerCallback = React.useCallback(() => {
    register(setLoading, props.save);
  }, [props.QRRegisterReducer, loadState]);

  const isLoading = () => {
    return loadState === enumLoading.REGISTERING;
  }

  return (
    <React.Fragment>
      <Loader loading={isLoading()} color="#333333" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <Register
          registerCallback={ register(setLoading, props.save, props.navigation) }
          cancelCallback={ cancelCallback(props.navigation) }
          />
      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({

});

export default compose(
  connect(QRRegistrationAction.mapStateToProps, QRRegistrationAction.mapDispatchToProps)
)(ApplicationScreen);
