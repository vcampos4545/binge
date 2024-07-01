import React, { useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MovieInfoModal from "../components/MovieInfoModal";
import RateMediaModal from "../components/RateMediaModal";
import SearchResultsRow from "../components/SearchResultsRow";
import useMovies from "../hooks/useMovies";
import { Movie } from "../lib/types";

export default function Search() {
  const { movies, filteredMovies, searchQuery, setSearchQuery } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [movieInfoModalVisible, setMovieInfoModalVisible] = useState(false);

  const handleRateMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setRateModalVisible(true);
  };

  const handleShowInfo = (movie: Movie) => {
    setSelectedMovie(movie);
    setMovieInfoModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#696969" style={styles.icon} />
        <TextInput
          placeholder="Search movies..."
          style={styles.input}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SearchResultsRow
            movie={item}
            onRate={() => handleRateMovie(item)}
            onMovieSelect={() => handleShowInfo(item)}
          />
        )}
      />
      {selectedMovie && (
        <RateMediaModal
          movie={selectedMovie}
          isVisible={rateModalVisible}
          onClose={() => setRateModalVisible(false)}
        />
      )}
      {selectedMovie && (
        <MovieInfoModal
          movie={selectedMovie}
          isVisible={movieInfoModalVisible}
          onClose={() => setMovieInfoModalVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginBottom: 100,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
