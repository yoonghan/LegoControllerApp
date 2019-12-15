import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";
import * as LoginAction from "../redux/action/LoginAction";
import {getImageSource} from "../util/source";
import LegoButton from "../component/LegoButton";
import BiometricAccess from "../native/android/BiometricAccess";

_buttonPressLogin = ({login}) => async () => {
  const result = await BiometricAccess.showBiometricPrompt({});
  if(result && result.success) {
    login(
       "Anonymous",
       "101001010101",
    );
  };
}

const NonAuth: () => React$Node = (props) => {
  BiometricAccess.getAvailableAuthenticationMethods();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        source={getImageSource("SCREEN_ENTRY")}
        style={styles.backgroundImageContainer}>
        <View style={styles.container}>
          <View
            style={styles.buttonContainer}>
            <LegoButton
              title={"Start"}
              onPress={this._buttonPressLogin(props)}
              />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 40
  },
  backgroundImageContainer: {
    ...StyleSheet.absoluteFill
  },
  buttonContainer: {
    position: "absolute",
    bottom: "30%",
    width: "100%",
  }
});

export default compose(
  connect(LoginAction.mapStateToProps, LoginAction.mapDispatchToProps)
)(NonAuth);
