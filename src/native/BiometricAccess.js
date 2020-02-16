import {Platform} from 'react-native';

import AndroidBiometricAccess from './android/BiometricAccess';
import IosBiometricAccess from './ios/BiometricAccess';

const nativeModule = (Platform.OS === 'ios'? IosBiometricAccess: AndroidBiometricAccess);

export default nativeModule;
