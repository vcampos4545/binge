import React from "react";
import "react-native-url-polyfill/auto";
import { SessionContext } from "./hooks/useSession";
import Main from "./screens/Main";
import { ProfileContext } from "./hooks/useProfile";
import { MovieContext } from "./hooks/useMovies";

export default function App() {
  return (
    <SessionContext>
      <ProfileContext>
        <MovieContext>
          <Main />
        </MovieContext>
      </ProfileContext>
    </SessionContext>
  );
}
