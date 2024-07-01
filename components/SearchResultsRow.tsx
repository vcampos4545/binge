import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Movie } from "../lib/types";

const SearchResultRow = ({
  movie,
  onRate,
  onMovieSelect,
}: {
  movie: Movie;
  onRate: (movie: Movie) => void;
  onMovieSelect: (movie: Movie) => void;
}) => {
  const getImageUrl = (path: string) => `https://image.tmdb.org/t/p/w92${path}`;
  return (
    <View style={styles.rowContainer}>
      <Image
        // source={{ uri: getImageUrl(movie.coverImage) }}
        source={{ uri: movie.coverImage }}
        style={styles.coverImage}
      />
      <TouchableOpacity
        style={styles.movieInfo}
        onPress={() => onMovieSelect(movie)}
      >
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.detailsRowContainer}>
          <Text style={styles.details}>{movie.release_date}</Text>
          <Text style={styles.details}>{movie.genre_ids}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => onRate(movie)}>
          <Icon name="add" size={30} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

/*------>>>> Code stored for bookmaring tab <<<<--------<<<<


<TouchableOpacity onPress={() => onBookmark(movie)}>
<Icon name="bookmark-o" size={20} style={styles.icon}/>
</TouchableOpacity>


>>>>-----------------------------------------------------<<<<*/

const styles = StyleSheet.create({
  rowContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 3,
    borderRadius: 10,
  },
  detailsRowContainer: {
    flexDirection: "row",
  },
  coverImage: {
    width: 90,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
  },
  movieInfo: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 5,
    //marginTop: "auto",
    //marginBottom: "auto",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  details: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#CC7F67",
    paddingRight: 13,
    paddingTop: 5,
  },
  iconsContainer: {
    flexDirection: "row",
    //marginTop: "auto",
    //marginBottom: "auto",
    marginTop: 90,
  },
  icon: {
    marginLeft: 10,
    color: "#CC7F67",
  },
});

export default SearchResultRow;
