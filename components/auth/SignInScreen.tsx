import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Input } from "react-native-elements";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { AuthState } from "../../lib/types";

export default function SignInScreen({
  setState,
}: {
  setState: (state: AuthState) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Binge</Text>
      <View style={{ flexDirection: "column", width: "60%" }}>
        <Input
          style={styles.input}
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={{ flexDirection: "column", width: "60%" }}>
        <Input
          style={styles.input}
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <TouchableOpacity style={styles.signInButton} onPress={signInWithEmail}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.register}
        onPress={() => setState(AuthState.SIGN_UP)}
      >
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  brand: {
    color: "#CC7F67",
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 85,
    marginTop: 100,
  },
  input: {
    borderWidth: 0,
    width: "100%",
    marginLeft: 10,
    backgroundColor: "#ffffff",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  signInButton: {
    backgroundColor: "#CC7F67",
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
  register: {
    color: "black",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 40,
  },
});
