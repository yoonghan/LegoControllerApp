"use strict"

//NOTE: Currently not in used.

import React from 'react';
import {
  View,
  Text
} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";
import * as LoginAction from "../../redux/action/LoginAction";
import Icon from 'react-native-vector-icons/FontAwesome';

class Logout extends React.PureComponent {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <>
        <Text>Logging out</Text>
      </>
    );
  }
}

export default compose(
  connect(LoginAction.mapStateToProps, LoginAction.mapDispatchToProps)
)(Logout);
