import {Platform} from 'react-native';

import AndroidMessenger from './android/Messenger';
import IosMessenger from './ios/Messenger';

const nativeModule = (Platform.OS === 'ios'? IosMessenger: AndroidMessenger);

export default nativeModule;
