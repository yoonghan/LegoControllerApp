import React from "react";
import Swiper from "react-native-swiper";
import Login from "./Login";
import Register from "./Register";
import { ScrollView, StyleSheet, Alert } from "react-native";
import Loader from "react-native-modal-loader";
import auth from '@react-native-firebase/auth';
import { translate } from "../../../util/tools";

const filterTranslateError = (errorMessage) => {
  switch(errorMessage) {
    case "auth/network-request-failed":
    case "auth/too-many-requests":
      return translate("auth/tryagainlater");
    case "auth/wrong-password":
      return translate("auth/wrong-password");
    case "auth/email-already-in-use":
      return translate("auth/email-already-in-use");
    case "auth/user-not-found":
      return translate("auth/user-not-found");
    default:
      return translate("auth/appError");
  }
}

const enumLoading = {
  REGISTERING: 0,
  REGISTERED: 1,
  ERROR: 2,
  LOGININ: 3,
  LOGGEDIN: 4,
  INIT: 5
}

const login = (setLoadingFunc) => async (email, password) => {
  setLoadingFunc(enumLoading.LOGININ);

  auth()
  .signInWithEmailAndPassword(email, password)
  .then(user => {
    setLoadingFunc(enumLoading.LOGGEDIN);
  })
  .catch(e => {
    setLoadingFunc(enumLoading.ERROR);
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


const register = (setLoadingFunc) => async (email, password) => {
  setLoadingFunc(enumLoading.REGISTERING);
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    await auth().currentUser.sendEmailVerification();
    await auth().signOut();
    setLoadingFunc(enumLoading.REGISTERED);
    Alert.alert(
      "Success",
      translate("auth/success"),
      [{ text: "OK"}],
      {cancelable: false}
    );
  }
  catch (e) {
    setLoadingFunc(enumLoading.ERROR);
    Alert.alert(
      "Error",
      filterTranslateError(e.code),
      [
        {text: "OK"}
      ],
      {cancelable: false}
    );
  }
}

const LoginScreen: () => React$Node = ({navigation}) => {
  const swiperRef = React.createRef();
  const [loadState, setLoading] = React.useState(enumLoading.INIT);

  function swipeToRegisterPage() {
    if(swiperRef !== null && swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  }

  function swipeToLoginPage() {
    if(swiperRef !== null && swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  }

  function gotoForgotPasswordScreen(navigation){
    return function() {
      navigation.navigate('ForgotPassword');
    }
  }

  function isLoading() {
    switch(loadState) {
      case enumLoading.REGISTERING:
      case enumLoading.LOGININ:
        return true;
      default:
        return false;
    }
  }

  React.useEffect(() => {
    if(loadState === enumLoading.REGISTERED) {
      swipeToLoginPage();
    }
  }, [loadState]);

  return (
    <React.Fragment>
      <Loader loading={isLoading()} color="#333333" />
      <ScrollView>
        <React.Fragment>
          <Swiper ref={swiperRef} style={styles.swiperContainer}>
            <Login
              onForgotPasswordCall={gotoForgotPasswordScreen(navigation)}
              onRegisterPageCall={swipeToRegisterPage}
              loginCallback={login(setLoading)}
              />
            <Register onLoginPageCall={swipeToLoginPage} registerCallback={register(setLoading)}/>
          </Swiper>
        </React.Fragment>
      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  swiperContainer: {
    height: 600
  }
});

export default LoginScreen;
