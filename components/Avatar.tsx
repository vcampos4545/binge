import { Image, Pressable, StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";
import { Profile } from "../lib/types";

interface Props {
  profile: Profile;
  size: number;
  onClick?: () => void;
}

export default function AvatarComponent({
  profile,
  size = 150,
  onClick,
}: Props) {
  const avatarSize = { height: size, width: size };

  return (
    <View>
      {profile.avatar_url ? (
        <Pressable onPress={onClick}>
          <Avatar.Image source={{ uri: profile.avatar_url }} size={size} />
        </Pressable>
      ) : (
        <Pressable onPress={onClick}>
          <Avatar.Text
            label={
              profile.full_name.split(" ")[0].slice(0, 1) +
              profile.full_name.split(" ")[1].slice(0, 1)
            }
            size={size}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 5,
  },
});
