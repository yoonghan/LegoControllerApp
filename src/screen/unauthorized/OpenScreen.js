import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {compose} from "redux";
import {connect} from "react-redux";
import * as TranslationAction from "../../redux/action/TranslationAction";
import * as LoginAction from "../../redux/action/LoginAction";
import * as QRRegistrationAction from "../../redux/action/QRRegistrationAction";
import {getImageSource} from "../../util/source";
import { Button } from 'react-native-elements';
import { VERSION } from "../../util/const";
import auth from '@react-native-firebase/auth';
import BiometricAccess from "../../native/BiometricAccess";

_buttonPressScanBiometric = (login, translationState) => async () => {
  try {
    const result = await BiometricAccess.showBiometricPrompt({
      title: translationState.translate("Login_Bio_Title"),
      subTitle: translationState.translate("Login_Bio_SubTitle"),
      cancel: translationState.translate("Login_Bio_Cancel")
    });
    if(result && result.success) {
      login(
         "Anonymous",
         "101001010101",
      );
    };
  }
  catch (e) {
    console.warn(`Cancelled - ${e}`);
  }
}

_buttonPressLogin = (navigation) => () => {
  navigation.navigate('ApplicationScreen');
}

_buttonQRPressed = (navigation) => () => {
  navigation.navigate('QRScreen');
}

_buttonPressLearnMore = (navigation) => () => {
  navigation.navigate('LearnMore');
}

_buttonPressLanguage = (navigation) => () => {
  navigation.navigate('Language');
}

const _renderLoginButton = (isLoggedIn, translationState, login, navigation, qrState) => {
  // if(isLoggedIn) {
  //   return <Button
  //     title={translationState.translate("Use Biometric")}
  //     onPress={_buttonPressScanBiometric(login, translationState)}
  //     />
  // }
  if(qrState.registered) {
      return <Button
        title={translationState.translate("unauthorized.openscreen.Get QRCode")}
        onPress={_buttonQRPressed(navigation)}
        />
  }
  else {
    return <Button
      title={translationState.translate("Enter")}
      onPress={_buttonPressLogin(navigation)}
      />
  }
}

const _renderSecondButton = (isLoggedIn, signoff, navigation, translationState) => {
  if(isLoggedIn) {
    return <Button
      title={translationState.translate("Logout")}
      type={"outline"}
      onPress={signoff}
    />
  }
  else {
    return <Button
      title={translationState.translate("Learn More")}
      type={"outline"}
      onPress={_buttonPressLearnMore(navigation)}
    />
  }
}

const OpenScreen: () => React$Node = ({translationState, login, signoff, navigation, qrState}) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user && !isLoggedIn) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
   });
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        source={getImageSource("SCREEN_ENTRY")}
        style={styles.backgroundImageContainer}>
        <View style={styles.container}>
          <View
            style={styles.buttonContainer}>
            {_renderLoginButton(isLoggedIn, translationState, login, navigation, qrState)}
          </View>
          <View
            style={styles.learnmoreContainer}
          >
            {_renderSecondButton(isLoggedIn, signoff, navigation, translationState)}
          </View>
          <View
            style={styles.languageContainer}>
            <Button
              title={translationState.translate("Language")}
              containerStyle={styles.languageBtn}
              type={"outline"}
              onPress={_buttonPressLanguage(navigation)}
            />
          </View>
        </View>
        <View
          style={styles.versionContainer}
        >
          <Text>ver {VERSION}</Text>
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
    bottom: "40%",
    width: "100%",
    padding: 1,
    backgroundColor: "#FFFFFF"
  },
  learnmoreContainer: {
    position: "absolute",
    bottom: "30%",
    width: "100%",
    padding: 1,
    backgroundColor: "#FFFFFF"
  },
  languageBtn: {
    backgroundColor:"#FFFFFF"
  },
  languageContainer: {
    position: "absolute",
    bottom: "20%",
    width: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  versionContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(199,199,199,0.5)"
  }
});

export default compose(
  connect(QRRegistrationAction.mapStateToProps, QRRegistrationAction.mapDispatchToProps),
  connect(LoginAction.mapStateToProps, LoginAction.mapDispatchToProps),
  connect(TranslationAction.mapStateToProps, TranslationAction.mapDispatchToProps)
)(OpenScreen);
