import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { Profile } from "../lib/types";
import useSession from "./useSession";
import * as ImagePicker from "expo-image-picker";

const Context = createContext<null | any>(null);

export const ProfileContext = ({ children }: { children: React.ReactNode }) => {
  const { user, session } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  useEffect(() => {
    if (profile) downloadImage(profile.avatar_url);
  }, [profile?.avatar_url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {};
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(profile: Profile) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { error } = await supabase.from("profiles").upsert(profile);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function uploadAvatar() {
    try {
      setLoading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
        allowsMultipleSelection: false, // Can only select one image
        allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
        quality: 1,
        exif: false, // We don't want nor need that data.
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];
      console.log("Got image", image);

      if (!image.uri) {
        throw new Error("No image uri!"); // Realistically, this should never happen, but just in case...
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      updateProfile({
        ...profile,
        avatar_url: data.path,
        updated_at: new Date(),
      } as Profile);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Context.Provider value={{ profile, updateProfile, uploadAvatar, loading }}>
      {children}
    </Context.Provider>
  );
};

const useProfile = () =>
  useContext<{
    profile: Profile;
    updateProfile: (profile: Profile) => void;
    uploadAvatar: () => void;
    loading: boolean;
  }>(Context);
export default useProfile;
