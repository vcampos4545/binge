import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MovieInfoModal({
  movie,
  isVisible,
  onClose,
  onRate,
}: {
  movie: any;
  isVisible: any;
  onClose: any;
  onRate?: any;
}) {
  const {
    title,
    release_date,
    genre_ids,
    poster_path,
    rating,
    overview,
    popularity,
    director,
    runtime,
    staring,
  } = movie;
  const getImageUrl = (path: string) => `https://image.tmdb.org/t/p/w92${path}`;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={0.5}
        onPressOut={onClose}
      >
        <View style={styles.movieInfoView}>
          <View>
            <View style={styles.rowFlex}>
              <Image
                source={{ uri: getImageUrl(poster_path) }}
                style={styles.coverImage}
              />
              <View style={styles.columnFlex}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.rowFlex}>
                  <Text style={styles.details}>{release_date}</Text>
                  <Text style={[styles.details, styles.ratingDetails]}>
                    {runtime}
                  </Text>
                </View>
                <Text style={styles.details}>{genre_ids}</Text>
                <Text style={styles.details}>Directed by: {director}</Text>
                <Text style={styles.details}>Cast: {staring}</Text>
              </View>
            </View>
            <View style={[styles.rowFlex, styles.centered]}>
              <Text style={[styles.details]}>Rating: 4.2 {rating}</Text>
              <Text style={[styles.details, styles.ratingDetails]}>
                Popularity: {popularity}
              </Text>
            </View>
            <Text>{overview}</Text>
            <View style={[styles.rowFlex, styles.centered]}>
              <Text style={[styles.details, styles.detailsIcon]}>Netflix</Text>
              <Text style={[styles.details, styles.detailsIcon]}>MAX</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  movieInfoView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  rowFlex: {
    flexDirection: "row",
  },
  columnFlex: {
    flexDirection: "column",
  },
  coverImage: {
    width: 120,
    height: 160,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  details: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#CC7F67",
    paddingTop: 5,
  },
  centered: {
    alignContent: "center",
    marginRight: "auto",
    marginLeft: "auto",
    paddingBottom: 10,
    paddingTop: 10,
  },
  ratingDetails: {
    marginLeft: 10,
  },
  detailsIcon: {
    marginLeft: 10,
  },
});
