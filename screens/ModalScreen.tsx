import * as React from "react";
import { Text, View } from "react-native";
import tailwind from "tailwind-rn";

export default function ModalScreen() {
  return (
    <View style={tailwind("p-4")}>
      <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
        <Text style={tailwind("text-blue-800 font-semibold p-4 text-center")}>
          Modal
        </Text>
      </View>
      <View />
    </View>
  );
}
