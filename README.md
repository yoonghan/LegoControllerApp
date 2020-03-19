# Lego Controller
Creating an app that can control both physical and logical world that we lives in.

# Goal
This app is to be connected to web via Socket IO and each process send are
ideally sent as events to be queue. Each events will then trigger a Lego
created device to be controller.

## Installation
Run

```
  npm install
  react-native run-android
  react-native run-ios
```

## Know issues
1. If Android emulator shows a problem loaded with incompatible v6.X Native vs v6.X, delete node_modules folder and restart.
2. If Android emulator leave a blank screen, start react-native start before deploying the android app.
3. If ViewPagerAndroid error appear run this:

  1. deleted node_modules folder
  2. Run npm cache clean --force
  3. Run npm install
  4. Run npm start -- --reset-cache

## IDE integration
1. When using Atom, install "flow-ide" package helps for autosuggest and code check.

## Release
run
```
#deploy to phone
react-native run-android --variant=release
#gen with key signed
$ cd android
$ ./gradlew bundleRelease
```
