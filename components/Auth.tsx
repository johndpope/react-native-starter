import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { supabase } from "../lib/initSupabase";

import { Button, Input } from "react-native-elements";

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
    <View>
      <View>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View>
        <Button
          title="Sign in"
          disabled={!!loading.length}
          loading={loading === "LOGIN"}
          onPress={() => handleLogin("LOGIN", email, password)}
        />
      </View>
      <View>
        <Button
          title="Sign up"
          disabled={!!loading.length}
          loading={loading === "SIGNUP"}
          onPress={() => handleLogin("SIGNUP", email, password)}
        />
      </View>
    </View>
  );
}
