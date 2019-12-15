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
