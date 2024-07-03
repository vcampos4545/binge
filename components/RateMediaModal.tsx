import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import useMovies from "../hooks/useMovies";
import useSession from "../hooks/useSession";
import { Movie } from "../lib/types";

interface Props {
  movie: Movie;
  isVisible: boolean;
  onClose: () => void;
}

const RateMovieModal = ({ movie, isVisible, onClose }: Props) => {
  const { user } = useSession();
  const { ratedMovies } = useMovies();
  const [rateModalContent, updateRateModalContent] = useState("overall");

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
        <View style={styles.rateModalView}>
          {rateModalContent === "overall" && (
            <View>
              <View style={styles.flexColumnn}>
                <Text style={styles.modalMovieTitleText}>
                  Rating {movie?.title}
                </Text>
                <Text style={styles.ModalOtherText}>
                  How was the movie overall?
                </Text>
              </View>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  style={[styles.ratingGroupButton, styles.badButton]} // Apply shared style and color for 'Bad' button
                  onPress={() => handleContentChange("compare", "Bad")}
                >
                  <Text>Bad</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.ratingGroupButton, styles.fineButton]} // Apply shared style and color for 'Fine' button
                  onPress={() => handleContentChange("compare", "Fine")}
                >
                  <Text>Fine</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.ratingGroupButton, styles.goodButton]} // Apply shared style and color for 'Good' button
                  onPress={() => handleContentChange("compare", "Good")} // Example: Rating 'Good' is set to 4
                >
                  <Text>Good</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {rateModalContent === "compare" && (
            <View>
              <Text style={styles.modalMovieTitleText}>
                Rating {movie?.title}
              </Text>
              <Text style={styles.center}>
                {" "}
                How did it compare to {comparisonMovie?.title}?
              </Text>
              <Image
                source={{ uri: getImageUrl(comparisonMovie?.poster_path) }}
                style={styles.coverImage}
              />
              <View style={[styles.topDivider]}>
                <View style={[styles.flexRow, styles.spaceOut]}>
                  <View style={styles.flexRow}>
                    <Icon name="chevron-back" size={15} style={styles.icon} />
                    <TouchableOpacity onPress={() => handleUndo()}>
                      <Text style={styles.seekButtonText}>Undo</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.ratingMovieTitle}>
                    {movie?.title} is:
                  </Text>
                  <View style={styles.flexRow}>
                    <TouchableOpacity>
                      <Text style={styles.seekButtonText}>Skip</Text>
                    </TouchableOpacity>
                    <Icon
                      name="chevron-forward"
                      size={15}
                      style={styles.icon}
                    />
                  </View>
                </View>
                <View style={[styles.center, styles.flexRow]}>
                  <TouchableOpacity
                    style={[styles.ratingPreferenceButton, styles.badButton]}
                    onPress={() => handleProgressRating()}
                  >
                    <Text> Worse</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.ratingPreferenceButton, styles.goodButton]}
                    onPress={() => handleProgressRating()}
                  >
                    <Text style={styles.goodButton}>Better</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {rateModalContent === "results" && <View></View>}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

//todo: implement rating function
//onPress={() => onRate(Math.ceil(Math.random() * 5))}

{
  /* <TouchableOpacity 
style={styles.centeredView}
activeOpacity={0.5}
onPressOut={onClose}
> */
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },

  rateModalView: {
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
  modalMovieTitleText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  ModalOtherText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 18,
  },
  ratingMovieTitle: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  center: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  topDivider: {
    borderTopColor: "dark-gray",
    borderTopWidth: 1,
    paddingTop: 3,
    marginTop: 5,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexColumnn: {
    flexDirection: "column",
  },
  spaceOut: {
    justifyContent: "space-between",
  },
  ratingGroupButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  ratingPreferenceButton: {
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  seekButtonText: {
    paddingTop: 0,
    textDecorationLine: "underline",
  },
  icon: {
    paddingTop: 0,
  },
  goodButton: {
    backgroundColor: "#CC7F67",
    color: "white",
  },
  fineButton: {
    backgroundColor: "rgba(204, 127, 103, 0.6)",
  },
  badButton: {
    backgroundColor: "rgba(204, 127, 103, 0.2)",
  },
});

export default RateMovieModal;
