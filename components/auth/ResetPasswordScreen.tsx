import { View, Text } from "react-native";
import React from "react";
import { AuthState } from "../../lib/types";

export default function ResetPasswordScreen({
  setState,
}: {
  setState: (state: AuthState) => void;
}) {
  return (
    <View>
      <Text>ResetPasswordScreen</Text>
    </View>
  );
}
