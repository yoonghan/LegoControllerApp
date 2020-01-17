"use strict"

import React from "react";
import {
  View,
  Text
} from "react-native";
import Swiper from "react-native-swiper";

const Introduction: () => React$Node = () => {
  return (
    <Swiper style={introductionStyle.wrapper} showsButtons>
      <View style={introductionStyle.slide1}>
        <Text style={introductionStyle.text}>Hello Swiper</Text>
      </View>
      <View style={introductionStyle.slide2}>
        <Text style={introductionStyle.text}>Beautiful</Text>
      </View>
      <View style={introductionStyle.slide3}>
        <Text style={introductionStyle.text}>And simple</Text>
      </View>
    </Swiper>
  );
}


var introductionStyle = {
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

export default Introduction;
