import React, {Component} from 'react';
import {TouchableHighlight, View, Text} from 'react-native';
import CheckBox from './CheckBox';

class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.state.data !== prevState.data) {
      this.setState({
        data: this.props.data
      })
    }
  }

  _onCheckBoxPressed = () => {
    var data = this.state.data;
    data.completed = !data.completed;
    this.setState({
      data: data
    });
  }

  render() {
    let data = this.state.data;
    let color = data.completed ? '#C5C8C9' : '#000';
    let textDecorationLine = data.completed ? 'line-through' : 'none';
    return (
      <TouchableHighlight underlayColor={'#eee'} style={{paddingTop: 6, paddingBottom: 6, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}} {...this.props.sortHandlers}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 3, paddingLeft: 15}}>
          <CheckBox data={data} color={color} onCheckBoxPressed={this._onCheckBoxPressed}></CheckBox>
          <Text style={{fontSize:18, color: color, textDecorationLine: textDecorationLine}}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = ListViewItem;
