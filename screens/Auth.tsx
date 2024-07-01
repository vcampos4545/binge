import React, { useState } from "react";
import { AppState } from "react-native";
import ResetPasswordScreen from "../components/auth/ResetPasswordScreen";
import SignInScreen from "../components/auth/SignInScreen";
import SignUpScreen from "../components/auth/SignUpScreen";
import { supabase } from "../lib/supabase";
import { AuthState } from "../lib/types";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [state, setState] = useState<AuthState>(AuthState.SIGN_IN);

  if (state === AuthState.SIGN_IN) {
    return <SignInScreen setState={setState} />;
  } else if (state === AuthState.SIGN_UP) {
    return <SignUpScreen setState={setState} />;
  } else if (state === AuthState.RESET_PASSWORD) {
    return <ResetPasswordScreen setState={setState} />;
  }
}
