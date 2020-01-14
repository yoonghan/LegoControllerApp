import React from 'react';
import { Text, View, TouchableHighlight} from 'react-native';
import TodoModel from './TodoModel';
import OmniBox from './OmniBox';
import ListViewItem from './ListViewItem';
import Utils from './Utils';
import SortableList from 'react-native-sortable-list';

let dataList = [
  new TodoModel('Hello Koding'),
  new TodoModel('Make a Todo App with React Native'),
  new TodoModel('Check to complete a todo'),
  new TodoModel('Long press, drag and drop a todo to sort'),
  new TodoModel('Save data with Realm'),
  new TodoModel('Sync data with Firebase')
];

function getOrder(list) {
  return Object.keys(list);
}

const ListView = () => {
  const [datas, setDatas] = React.useState(dataList);

  function updateDataList(dataList) {
    setDatas(dataList);
  }

  function renderRow(data, index) {
    return <ListViewItem data={data}/>;
  }

  function renderDatas() {
    if(datas.length === 0) {
      return (<View></View>);
    }
    return datas.map(renderRow);
  }

  return (
      <View >
        <OmniBox
          data={datas}
          updateDataList={updateDataList}/>
        {renderDatas()}
      </View>
  )
}

module.exports = ListView;
