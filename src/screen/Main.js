import React, {PureComponent} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import * as LoginAction from "../redux/action/LoginAction";
import * as TranslationAction from "../redux/action/TranslationAction";

import Loading from "../component/Loading";
import UnauthorizedMainScreen from "./unauthorized/MainScreen";
import AuthorizedMainScreen from "./authorized/MainScreen";

class Main extends PureComponent {

  constructor(props) {
    super(props);
    props.loginLoad();
    props.translateLoad();
  }

  _determineScreen = () => {
    const {loginState, translationState} = this.props;

    if(loginState && loginState.query && !loginState.loggedIn) {
      return <Loading/>
    }
    else if(loginState && loginState.loggedIn) {
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
