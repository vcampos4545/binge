import React from "react";
import "react-native-url-polyfill/auto";
import { SessionContext } from "./hooks/useSession";
import Main from "./screens/Main";
import { ProfileContext } from "./hooks/useProfile";

export default function App() {
  return (
    <SessionContext>
      <ProfileContext>
        <Main />
      </ProfileContext>
    </SessionContext>
  );
}
