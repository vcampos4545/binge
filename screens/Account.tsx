import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Input } from "react-native-elements";
import Avatar from "../components/Avatar";
import useProfile from "../hooks/useProfile";
import { supabase } from "../lib/supabase";
import Modal from "react-native-modal";

export default function Account() {
  const { profile, updateProfile, uploadAvatar, loading } = useProfile();
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const updateModal = useDisclosure();

  function useDisclosure() {
    const [isVisible, setIsVisible] = useState(false);
    const onClose = () => setIsVisible(false);
    const onOpen = () => setIsVisible(true);
    return { isVisible, onOpen, onClose };
  }

  return (
    <View style={styles.container}>
      <Avatar profile={profile} size={150} onClick={updateModal.onOpen} />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateModal.onOpen()}
          disabled={loading}
        >
          <Text>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => supabase.auth.signOut()}
          disabled={loading}
        >
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        isVisible={updateModal.isVisible}
      >
        <View style={styles.updateModal}>
          <Avatar profile={profile} size={150} onClick={uploadAvatar} />
          <Input
            label="Username"
            value={username || ""}
            onChangeText={(text) => setUsername(text)}
          />
          <View>
            <Input
              label="Website"
              value={website || ""}
              onChangeText={(text) => setWebsite(text)}
            />
          </View>
          <Button
            title={loading ? "Loading ..." : "Update"}
            onPress={() =>
              updateProfile({
                ...profile,
                username,
                website,
                updated_at: new Date(),
              })
            }
            disabled={loading}
          />
          <Pressable onPress={updateModal.onClose}>
            <Text>Hide Modal</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    alignItems: "center",
    flexDirection: "column",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#CC7F67",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  updateModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
});
