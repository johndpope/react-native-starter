import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { Platform } from "react-native";
import { colors } from "react-native-elements";
import { UserContextProvider, useUser } from "./components/UserContext";
import Auth from "./components/Auth";

const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

const Container = () => {
  const { user } = useUser();
  const colorScheme = useColorScheme();
  return user ? <Navigation colorScheme={colorScheme} /> : <Auth />;
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <UserContextProvider>
        <SafeAreaProvider>
          <Container />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </UserContextProvider>
    );
  }
}
