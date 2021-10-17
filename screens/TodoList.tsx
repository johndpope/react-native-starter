import * as React from "react";
import { Text, View, SafeAreaView } from "react-native";
import tailwind from "tailwind-rn";

import List from "../components/TodoList";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"ToDo">) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
        <Text style={tailwind("text-blue-800 font-semibold")}>Tab One</Text>
      </View>
      <List />
    </SafeAreaView>
  );
}
