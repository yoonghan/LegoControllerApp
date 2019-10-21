import React, {PureComponent} from 'react';

import {connect} from "react-redux";
import * as LoginAction from "../redux/action/LoginAction";

import Loading from "../component/Loading";
import NonAuth from "./NonAuth";
import MainContainer from "./MainContainer";

class Main extends PureComponent {

  constructor(props) {
    super(props);
  }

  _determineScreen = () => {
    const {loginState} = this.props;

    if(loginState && loginState.query && !loginState.loggedIn) {
      return <Loading/>
    }
    else if(loginState && loginState.loggedIn) {
      return <MainContainer/>
    }
    else {
      return <NonAuth/>
    }
  }

  render() {
    return this._determineScreen();
  }
}

export default connect(LoginAction.mapStateToProps, LoginAction.mapDispatchToProps)(Main)
