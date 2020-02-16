`use strict`

import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import { View, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import {getImageSource} from "../../util/source";
import * as TranslationAction from "../../redux/action/TranslationAction";

const clickToConfirm = (navigation) => () => {
  navigation.popToTop();
}

const InstructionFirstLogin: () => React$Node = ({navigation, translationState}) => {
  return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
          <Text h3>{translationState.translate("unauthorized.instruction.Welcome")}</Text>
          <Text h4>{translationState.translate("unauthorized.instruction.You are logged in")}</Text>
          <View style={styles.spaceContainer}/>
          <Text h4>{translationState.translate("unauthorized.instruction.One more step")}</Text>
          <View style={styles.spaceContainer}/>
          <Text>{translationState.translate("unauthorized.instruction.instruction1")}</Text>
          <Text>{translationState.translate("unauthorized.instruction.instruction2")}</Text>
          <View style={styles.spaceContainer}/>
          <Button
            title={translationState.translate("OK")}
            onPress={clickToConfirm(navigation)}
            />
        </View>
        <ImageBackground
          source={getImageSource("FOOTER")}
          style={styles.backgroundImageContainer}>
        </ImageBackground>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent:'center',
    flex:1,
    marginHorizontal: 40
  },
  spaceContainer: {
    paddingBottom: 40
  },
  backgroundImageContainer: {
    width: "100%",
    height: 90,
    bottom: 0,
    position: 'absolute'
  }
});

export default compose(
  connect(TranslationAction.mapStateToProps, TranslationAction.mapDispatchToProps)
)(InstructionFirstLogin);
