import React, { useEffect, useState } from "react";
import { Alert, View, ImageBackground } from "react-native";
import { supabase } from "../lib/initSupabase";
import tailwind from "tailwind-rn";

import { Button, Input } from "react-native-elements";

const image = {
  uri: "https://images.pexels.com/photos/246121/pexels-photo-246121.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
};

export default function Auth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<string>("");

  const handleLogin = async (type: string, email: string, password: string) => {
    setLoading(type);
    const { error, user } =
      type === "LOGIN"
        ? await supabase.auth.signIn({ email, password })
        : await supabase.auth.signUp({ email, password });
    if (!error && !user) Alert.alert("Check your email for the login link!");
    if (error) Alert.alert(error.message);
  };

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
      setLoading("");
    };
  }, []);

  return (
    <ImageBackground
      source={image}
      style={tailwind("p-4 h-full justify-center")}
    >
      <View style={tailwind("p-4 border rounded bg-white")}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
        <Button
          title="Sign in"
          disabled={!!loading.length}
          loading={loading === "LOGIN"}
          onPress={() => handleLogin("LOGIN", email, password)}
          style={tailwind("my-4 w-full")}
        />
        <Button
          title="Sign up"
          disabled={!!loading.length}
          loading={loading === "SIGNUP"}
          onPress={() => handleLogin("SIGNUP", email, password)}
        />
      </View>
    </ImageBackground>
  );
}
