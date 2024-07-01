import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import type { Movie, Rating } from "../lib/types";
import { DUMMY_MOVIES } from "../lib/DATA";

enum ListFilter {
  All = "All",
  Watched = "Watched",
  Saved = "Saved",
  Recs = "Recs",
}

type ListItem = {
  movie: Movie;
  rating: Rating | null;
};

export default function Lists() {
  const [filter, setFilter] = useState<ListFilter>(ListFilter.All);
  const [listItems, setListItems] = useState<ListItem[]>([]);

  useEffect(() => {
    // TODO: Fetch list items
    // setListItems(response.data)
    let temp: ListItem[] = [];
    DUMMY_MOVIES.forEach((movie) => {
      temp.push({ movie, rating: null });
    });
  }, [filter]);

  return (
    <View style={styles.container}>
      <FlatList
        data={listItems}
        renderItem={({ item }) => (
          <View>
            <Text>{item.movie.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.movie.id}
      />

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={styles.listFilter}
          onPress={() => setFilter(ListFilter.All)}
        >
          <Text
            style={
              filter == ListFilter.All
                ? styles.buttonTextSelected
                : styles.buttonText
            }
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listFilter}
          onPress={() => setFilter(ListFilter.Watched)}
        >
          <Text
            style={
              filter == ListFilter.Watched
                ? styles.buttonTextSelected
                : styles.buttonText
            }
          >
            Watched
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listFilter}
          onPress={() => setFilter(ListFilter.Saved)}
        >
          <Text
            style={
              filter == ListFilter.Saved
                ? styles.buttonTextSelected
                : styles.buttonText
            }
          >
            Saved
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listFilter}
          onPress={() => setFilter(ListFilter.Recs)}
        >
          <Text
            style={
              filter == ListFilter.Recs
                ? styles.buttonTextSelected
                : styles.buttonText
            }
          >
            Recs
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#F0F0F0",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#CC7F67",
  },
  listFilter: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonTextSelected: {
    color: "white",
    fontSize: 16,
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
  },
});
