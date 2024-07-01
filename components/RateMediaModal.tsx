import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Movie, Profile } from "../lib/types";

interface Props {
  movie: Movie;
  isVisible: boolean;
  onClose: () => void;
}

const RateMovieModal = ({ movie, isVisible, onClose }: Props) => {
  const [rateModalContent, updateRateModalContent] = useState("overall");
  const [ratingOpinion, updateRatingOpinion] = useState(null);
  const [comparisonMovie, updateComparisonMovie] = useState<Movie | null>(null);
  const [activeRatingList, updateActiveRatingList] = useState<Movie[]>(ratedList);

  const getImageUrl = (path: string) => `https://image.tmdb.org/t/p/w92${path}`;

  const handleContentChange = (newContent, overallOpinion) => {
    updateRateModalContent(newContent);
    updateRatingOpinion(overallOpinion);
  };

  const selectComparisonMovie = () => {
    const randomIndex = Math.floor(Math.random() * activeRatingList.length); // Get a random index
    updateComparisonMovie(activeRatingList[randomIndex]); // Set the random item
  };

  const handleProgressRating = (activeRatingList) => {
    if (activeRatingList.length > 0) {
      selectComparisonMovie();
      activeRatingList;
    } else {
      addNewRanking("abc123", movie.id, movieRanking, ratingOpinion);
    }
  };

  const removeMovie = (id: string) => {
    // Use .filter() to exclude the item with the matching id
    const filteredRatingList = activeRatingList.filter(
      (item) => item.id !== id
    );
    updateActiveRatingList(filteredRatingList); // Update the state with the filtered list
  };

  const addNewRanking = async (username: Profile["username"], movie_id: string, rank: number, opinion: string) => {
    const apiUrl = `http://192.168.1.243:8000/rated/movierank/rank/?username=${encodeURIComponent(
      username
    )}&tmdb_id=${encodeURIComponent(tmdb_id)}&rank=${encodeURIComponent(
      rank
    )}&opinion=${encodeURIComponent(opinion)}`;
    try {
      const response = await fetch(url, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  //const handleUndo = () => {

  //};

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
                  <Text style={styles.buttonText}>Bad</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.ratingGroupButton, styles.fineButton]} // Apply shared style and color for 'Fine' button
                  onPress={() => handleContentChange("compare", "Fine")}
                >
                  <Text style={styles.buttonText}>Fine</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.ratingGroupButton, styles.goodButton]} // Apply shared style and color for 'Good' button
                  onPress={() => handleContentChange("compare", "Good")} // Example: Rating 'Good' is set to 4
                >
                  <Text style={styles.buttonText}>Good</Text>
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
