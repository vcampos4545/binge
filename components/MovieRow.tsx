import { Text, TouchableOpacity, View, Image } from "react-native";
import React, { Component } from "react";
import type { Movie } from "../lib/types";

export default function MovieRow({ movie }: { movie: Movie }) {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", justifyContent: "space-between" }}
    >
      <Image source={{ uri: movie.coverImage }} style={styles.coverImage} />
      <View style={{ flex: 1 }}>
        <Text>{movie.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  coverImage: {
    width: 90,
    height: 105,
    borderRadius: 5,
    marginRight: 10,
  },
};
