package com.legocontroller.module.auth;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricPrompt;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

public class SignatureCallback extends BiometricPrompt.AuthenticationCallback {
    private final Promise promise;

    public SignatureCallback(Promise promise) {
        super();
        this.promise = promise;
    }

    @Override
    public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
        super.onAuthenticationError(errorCode, errString);
        if (errorCode == BiometricPrompt.ERROR_NEGATIVE_BUTTON) {
            WritableMap resultMap = new WritableNativeMap();
            resultMap.putBoolean("success", false);
            resultMap.putString("error", "User cancellation");
            this.promise.resolve(resultMap);
        } else {
            this.promise.reject(errString.toString(), errString.toString());
        }
    }

    @Override
    public void onAuthenticationSucceeded(@NonNull BiometricPrompt.AuthenticationResult result) {
        super.onAuthenticationSucceeded(result);

        try {
            WritableMap resultMap = new WritableNativeMap();
            resultMap.putBoolean("success", true);
            promise.resolve(resultMap);
        } catch (Exception e) {
            promise.reject("Error creating signature: " + e.getMessage(), "Error creating signature");
        }
    }
}
