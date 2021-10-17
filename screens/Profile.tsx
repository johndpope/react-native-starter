import * as React from "react";
import { SafeAreaView } from "react-native";
import tailwind from "tailwind-rn";

import Profile from "../components/Profile";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <Profile />
    </SafeAreaView>
  );
}
