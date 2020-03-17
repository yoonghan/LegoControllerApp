import React, { Component } from 'react';
import { TextInput } from 'react-native';
import TodoModel from './TodoModel';
import { findTodo, move } from './Utils';

class OmniBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newValue: ""
    };
  }


  onChange = (event) => {
    const title = event.nativeEvent.text;
    const dataList = this.props.data.filter((item) => item.title.match(new RegExp('.*' + title +'.*', 'gi')));
    this.setState({
      newValue: title
    });
    this.props.updateDataList(dataList);
  }

  onSubmitEditing = () => {
    if (this.state.newValue) {
      var newDataItem = new TodoModel(this.state.newValue);

      var dataList = this.props.data;
      var dataItem = findTodo(newDataItem, dataList);
      if(dataItem) {
        move(dataList, (dataList.indexOf(dataItem)), 0);

        this.setState({
          newValue: ''
        });
        this.props.updateDataList(dataList);
        return;
      }

      dataList.unshift(newDataItem);

      this.setState({
        newValue: ''
      });
      this.props.updateDataList(dataList);
    }
  }

  render() {
    return (
      <TextInput style={{height: 36, padding: 4, marginBottom: 0, fontSize: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#fff'}}
        placeholder='Add a todo or Search'
        blurOnSubmit={true}
        value={this.state.newValue}
        onSubmitEditing={this.onSubmitEditing}
        returnKeyType="done"
        onChange={this.onChange}>
      </TextInput>
    );
  }
}

export default OmniBox;
