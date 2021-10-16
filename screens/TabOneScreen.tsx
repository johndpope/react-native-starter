import * as React from "react";
import { Text, View } from "react-native";
import tailwind from "tailwind-rn";

import Auth from "../components/Auth";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View>
      <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
        <Text style={tailwind("text-blue-800 font-semibold")}>Tab One</Text>
      </View>
      <View />
      <Auth />
    </View>
  );
}
