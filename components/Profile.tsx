import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { supabase } from "../lib/initSupabase";
import { useUser } from "../components/UserContext";
import tailwind from "tailwind-rn";

import { Button } from "react-native-elements";
import "react-native-url-polyfill/auto";

const image = {
  uri: "https://images.pexels.com/photos/246121/pexels-photo-246121.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
};

export default function Profile() {
  const { user } = useUser();
  return (
    <ImageBackground
      source={image}
      style={tailwind("flex-1 p-4 justify-center")}
    >
      {user && (
        <View style={tailwind("border p-4 rounded bg-white")}>
          <Text style={tailwind("text-center text-lg font-bold mb-4")}>
            {user.email}
          </Text>
          <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
        </View>
      )}
    </ImageBackground>
  );
}
