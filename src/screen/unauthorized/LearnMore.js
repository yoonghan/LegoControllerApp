`use strict`

import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import { getImageSource } from "../../util/source";
import HorizontalLine from "../../component/HorizontalLine";
import { translate } from "../../util/tools";

const LearnMore: () => React$Node = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text h3>{translate("Getting Started")}</Text>
        <Text>
          {translate("GettingStarted1")}
          {"\n\n"}
          {translate("GettingStarted2")}
          {"\n"}
          1) {translate("GettingStarted3")}
          {"\n"}
          2) {translate("GettingStarted4")}
        </Text>
        <HorizontalLine/>
        <Text h3>{translate("About This App")}</Text>
        <Text>
          {translate("AboutThisApp1")}
        </Text>
      </View>

      <ImageBackground
        source={getImageSource("FOOTER")}
        style={styles.backgroundImageContainer}>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    margin: 5,
    marginHorizontal: 15
  },
  backgroundImageContainer: {
    width: "100%",
    height: 90,
    bottom: 0,
    position: 'absolute'
  }
});

export default LearnMore;
