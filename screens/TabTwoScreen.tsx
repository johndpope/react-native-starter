import * as React from "react";
import { Text, View } from "react-native";
import tailwind from "tailwind-rn";

import List from "../components/TodoList";

export default function TabTwoScreen() {
  return (
    <View>
      <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
        <Text style={tailwind("text-blue-800 font-semibold")}>Tab Two</Text>
      </View>
      <View />
      <List />
    </View>
  );
}
