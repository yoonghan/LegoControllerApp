import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";
import { Text } from 'react-native-elements';
import { Button, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Frame from "../../../component/Frame";
import { VERSION } from "../../../util/const";
import { styles } from "../../../util/style";
import HorizontalLine from "../../../component/HorizontalLine";
import * as TranslationAction from "../../../redux/action/TranslationAction";

const onPressAction = (translateChangeAction, languageCode) => () => {
  translateChangeAction(languageCode);
}

const renderIcon = (defaultLanguage, languageCode) => {
  if(defaultLanguage === languageCode) {
    return { name: "check", color: '#55CC55', size: 24 }
  }
}

const Language: () => React$Node = (props) => {
  const {translationState, translateChange} = props;
  return (
    <View style={languageStyles.container}>
      {
        [
          {key: 'en', keyword: "English"},
          {key: 'my', keyword: "Malay"}
        ].map((item, i) => (
          <ListItem
            key={`language_${i}`}
            title={item.keyword}
            rightIcon={renderIcon(translationState.locale, item.key)}
            bottomDivider
            onPress={onPressAction(translateChange, item.key)}
          />
        ))
      }
    </View>
  );
}

const languageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  itemContainer: {
    flex: 1,
    width: "100%"
  },
  itemTitle: {
    fontSize: 20,
    padding: 20,
    textAlign: "left"
  }
});

export default compose(
  connect(TranslationAction.mapStateToProps, TranslationAction.mapDispatchToProps)
)(Language);
