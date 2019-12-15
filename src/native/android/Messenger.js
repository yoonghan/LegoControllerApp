/**
 * Use HOC Messenger version.
 **/
import { NativeEventEmitter, NativeModules } from 'react-native';

const _messenger = NativeModules.ReactMessenger;
const _messengerEmitter = new NativeEventEmitter(_messenger);

export default {
  messenger: _messenger,
  messengerEmitter: _messengerEmitter
};
