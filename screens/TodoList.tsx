import * as React from "react";
import { SafeAreaView } from "react-native";
import tailwind from "tailwind-rn";

import TodoList from "../components/TodoList";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"ToDo">) {
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <TodoList />
    </SafeAreaView>
  );
}
