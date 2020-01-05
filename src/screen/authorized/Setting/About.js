import React from 'react';
import { View, StyleSheet, Linking, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';

import Frame from "../../../component/Frame";
import { VERSION } from "../../../util/const";
import { styles } from "../../../util/style";
import { getUrlSource, getImageSource } from "../../../util/source";

const url = "https://"

const onPressLink = () => {
  const url = getUrlSource("FEEDBACK");
  Linking.canOpenURL(url)
  .then((supported) => {
    if (!supported) {
      console.warn("Can't handle url: " + url);
    } else {
      return Linking.openURL(url);
    }
  })
  .catch((err) => console.error('An error occurred', err));
}

const About: () => React$Node = () => {
  return (
    <Frame style={aboutStyles.container}>
      <View style={aboutStyles.textContainer}>
        <Image
          style={aboutStyles.imgLogo}
          source={getImageSource("LOGO")}
        />
        <Text style={styles.releaseContainer}> ────── Release {VERSION} ────── </Text>
      </View>
      <View style={aboutStyles.releaseContainer}>
        <Text>
          <Text style={styles.boldText}>Written by: </Text>
          Han and Lee Wan
        </Text>
        <Text>
          <Text style={styles.boldText}>Licensed under: </Text>
          Walcron Coorperation&copy;
        </Text>
      </View>
      <View style={aboutStyles.feebackContainer}>
        <Text style={aboutStyles.feedbackText}>
          We sincerely thank you for using this application. Hope you had enjoyed
          using the application and we look forward for your feedback.
        </Text>
        <Button
          title="Feedback via Website"
          onPress={onPressLink}
          />
      </View>
    </Frame>
  );
}

const aboutStyles = StyleSheet.create({
  container: {
    flex: 10
  },
  textContainer: {
    flex: 3,
    margin: 15,
    justifyContent: "flex-end"
  },
  releaseContainer: {
    flex: 2,
    justifyContent: "center",
  },
  feedbackText: {
    marginBottom: 20
  },
  feebackContainer: {
    flex: 5,
    marginHorizontal: 40,
    justifyContent: "flex-start"
  },
  imgLogo: {
    width: 100,
    height: 80,
    margin: 20,
    alignSelf: 'center'
  }
});

export default About;
