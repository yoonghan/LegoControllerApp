import React from 'react';
import {
  View,
  Text
} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";
import * as LoginAction from "../redux/action/LoginAction";

class Logout extends React.PureComponent {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <>
      </>
    );
  }
}

Logout.navigationOptions = {
  drawerLabel: 'Notifications',
  drawerIcon: ({ tintColor }) => (
    <Text>Not</Text>
  ),
};

export default compose(
  connect(LoginAction.mapStateToProps, LoginAction.mapDispatchToProps)
)(Logout);
