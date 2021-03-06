// @flow

import React, { PureComponent } from "react";
import { AppState } from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import * as LoginAction from "../redux/action/LoginAction";
import type {LoginStateType, LoginActionType} from "../redux/action/LoginAction";
import * as TranslationAction from "../redux/action/TranslationAction";
import type {TranslationStateType, TranslationActionType} from "../redux/action/TranslationAction";
import Loading from "../component/Loading";
import UnauthorizedMainScreen from "./unauthorized/MainScreen";
import AuthorizedMainScreen from "./authorized/MainScreen";

type Props = LoginStateType & LoginActionType & TranslationActionType;

class Main extends PureComponent<Props> {

  constructor(props:Props) {
    super(props);
    //props.loginLoad();
    props.translateLoad();
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _something = (test:number)  => {

  }

  _isLoggedIn = () => {
    const {loginState} = this.props;
    return loginState && loginState.loggedIn;
  }

  _isGettingThrownToBackground = (nextAppState) => {
    return nextAppState.match(/inactive|background/);
  }

  _handleAppStateChange = (nextAppState) => {
    if(this._isLoggedIn() && this._isGettingThrownToBackground(nextAppState)) {
      this.props.logout();
    }
  };

  _isLogonQueried = () => {
    const {loginState} = this.props;
    return loginState && loginState.query && !loginState.loggedIn;
  }

  _determineScreen = () => {
    const {loginState} = this.props;

    if(this._isLogonQueried()) {
      return <Loading/>
    }
    else if(this._isLoggedIn()) {
      return <AuthorizedMainScreen/>
    }
    else {
      return <UnauthorizedMainScreen/>
    }
  }

  render() {
    return this._determineScreen();
  }
}

export default compose(
  connect(LoginAction.mapStateToProps, LoginAction.mapDispatchToProps),
  connect(TranslationAction.mapStateToProps, TranslationAction.mapDispatchToProps)
)(Main)
