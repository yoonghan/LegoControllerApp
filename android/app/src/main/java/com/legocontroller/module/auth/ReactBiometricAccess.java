package com.legocontroller.module.auth;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class ReactBiometricAccess extends ReactContextBaseJavaModule {
    private static final String TAG = ReactBiometricAccess.class.getName();
    private final Executor executor = Executors.newSingleThreadExecutor();

    public ReactBiometricAccess(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "ReactBiometricAccess";
    }

    @ReactMethod
    public void getAvailableAuthenticationMethods() {
        BiometricManager biometricManager = BiometricManager.from(this.getReactApplicationContext());
        switch (biometricManager.canAuthenticate()) {
            case BiometricManager.BIOMETRIC_SUCCESS:
                Log.d(TAG, "App can authenticate using biometrics.");
                break;
            case BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE:
                Log.e(TAG, "No biometric features available on this device.");
                break;
            case BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE:
                Log.e(TAG, "Biometric features are currently unavailable.");
                break;
            case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
                Log.e(TAG, "The user hasn't associated any biometric credentials " +
                        "with their account.");
                break;
            default:
                Log.e(TAG, "Not available");
        }
    }

    @ReactMethod
    public void showBiometricPrompt(final ReadableMap params, final Promise promise) {
        UiThreadUtil.runOnUiThread(
            new Runnable() {
                @Override
                public void run() {
                    try {
                        BiometricPrompt.PromptInfo promptInfo =
                                new BiometricPrompt.PromptInfo.Builder()
                                        .setTitle("Biometric login for my app")
                                        .setSubtitle("Log in using your biometric credential")
                                        .setNegativeButtonText("Cancel")
                                        .build();

                        FragmentActivity fragment = (FragmentActivity)getCurrentActivity();
                        BiometricPrompt biometricPrompt = new BiometricPrompt(fragment,
                                executor, new SignatureCallback(promise));

                        biometricPrompt.authenticate(promptInfo);
                    } catch (Exception e) {
                        promise.reject("Error signing payload: " + e.getMessage(),
                                "Error generating signature: " + e.getMessage());
                    }
                }
            }
        );
    }
}
