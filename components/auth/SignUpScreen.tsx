import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { AuthState } from "../../lib/types";

export default function SignUpScreen({
  setState,
}: {
  setState: (state: AuthState) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpStep, setSignUpStep] = useState<number>(0);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  function textContent(step: number) {
    switch (step) {
      case 0:
        return `Welcome to Binge! Designed for people who love watching shows and movies with their friends and family.`;
      case 1:
        return `Track what you have watched. Rate your favorite films and TV shows against the others to track what you have seen.`;
      case 2:
        return `See how your ratings stack up. Share your reviews and ratings with everyone, your friends, or nobody.`;
      case 3:
        return `Decide what to watch. Discover new shows and movies with custom recommendations based on your ratings.`;
    }
  }

  return (
    <View style={styles.container}>
      {signUpStep === 0 && <Text style={styles.brand}>Binge</Text>}
      <Text
        style={{
          width: "100%",
        }}
      >
        Welcome to <Text style={{ color: "#CC7F67" }}>Binge!</Text>
      </Text>
      {signUpStep > 0 && signUpStep < 4 && (
        <View
          style={{
            width: 313,
            height: 316,
            backgroundColor: "#D9D9D9",
            marginBottom: 31,
          }}
        />
      )}
      {signUpStep < 4 && (
        <Text style={styles.textContent}>{textContent(signUpStep)}</Text>
      )}

      {signUpStep === 4 && (
        <>
          <Text style={{ fontSize: 16, width: 313, marginBottom: 50 }}>
            {`It’s easy to register for an account!\n\nJust add your email address, and then create a username and password.`}
          </Text>
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={styles.inputLabel}>Email:</Text>
              <TextInput
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={styles.inputLabel}>Password:</Text>
              <TextInput
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
              />
            </View>
            {/* <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={styles.inputLabel}>Username:</Text>
              <TextInput
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(username) => setUsername(username)}
              />
            </View>
            
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={styles.inputLabel}>First Name:</Text>
              <TextInput
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(firstName) => setFirstName(firstName)}
              />
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={styles.inputLabel}>Last Name:</Text>
              <TextInput
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(lastName) => setLastName(lastName)}
              />
            </View> */}
          </View>
        </>
      )}

      <View style={styles.bottomContainer}>
        {signUpStep < 4 && (
          <View
            style={{
              flexDirection: "row",
              width: 91,
              justifyContent: "space-between",
            }}
          >
            {[0, 1, 2, 3].map((i) => {
              return (
                <View
                  key={i}
                  style={{
                    borderRadius: 3.5,
                    height: 7,
                    width: 7,
                    backgroundColor: i === signUpStep ? "black" : "#D1D1D1",
                  }}
                />
              );
            })}
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (signUpStep === 4) {
              signUpWithEmail();
            } else {
              setSignUpStep((p) => p + 1);
            }
          }}
        >
          <Text style={styles.buttonText}>
            {signUpStep < 4 ? "Next" : "Sign Up"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => setState(AuthState.SIGN_IN)}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FAF7F1",
    height: "100%",
    paddingHorizontal: 40,
    paddingTop: 94,
    paddingBottom: 76,
  },
  bottomContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "flex-end",
    marginRight: 40,
    marginLeft: 30,
  },
  brand: {
    marginTop: 100,
    color: "#CC7F67",
    fontSize: 40,
    fontWeight: "700",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    borderBottomColor: "black",
    borderWidth: 0,
    borderBottomWidth: 1,
    width: "100%",
    marginLeft: 10,
    backgroundColor: "#FAF7F1",
  },
  textContent: {
    width: "100%",
    marginHorizontal: 40,
    textAlign: "left",
  },
  button: {
    backgroundColor: "#CC7F67",
    height: 35,
    borderRadius: 12,
    width: 197,
    marginTop: 33,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
  error: {
    color: "#CE3434",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "500",
    marginTop: 10,
  },
  signInButton: {
    color: "black",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 31,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: "400",
  },
});
