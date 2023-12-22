import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Caption, TextInput } from "react-native-paper";
import { useToast } from "react-native-paper-toast";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { Image } from "react-native";
import Color from "../../common/Color";
import { API_URL, APP_IDENTITY, PUBLIC_ID } from "@env";

const LoginScreen = () => {
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const toaster = useToast();

  const handleLogin = () => {
    if (!username || !password) {
      toaster.show({
        message: "Harap isi username dan password terlebih dahulu",
      });
      return;
    }

    setLoading(true);
    login(username, password)
      .then((result) => {
        const msg = result.data.message;
        if (msg) {
          toaster.show({
            message: msg,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        toaster.show({ message: error.toString() });
        setLoading(false);
      });
  };

  return (
    <View style={styles.screen}>
      {loading && <LoadingOverlay />}
      <View style={{ marginTop: "40%", marginBottom: "12%" }}>
        <Image
          style={{ width: "100%", height: 70, marginBottom: 50 }}
          source={{
            uri: API_URL + "/images/app_image/" + APP_IDENTITY + ".png",
          }}
        />
      </View>
      <Caption>Username</Caption>
      <TextInput
        style={[styles.textInput, { backgroundColor: "white" }]}
        value={username}
        mode="outlined"
        placeholder="Masukan Username"
        placeholderTextColor={"#999999"}
        underlineColor="transparent"
        onChangeText={(text) => setUsername(text)}
      />
      <Caption>Password</Caption>
      <TextInput
        style={[styles.textInput, { backgroundColor: "white" }]}
        secureTextEntry={!showPassword}
        value={password}
        mode="outlined"
        placeholder="Masukan Password"
        placeholderTextColor={"#999999"}
        underlineColor="transparent"
        onChangeText={(text) => setPassword(text)}
        right={
          <TextInput.Icon
            style={styles.showPasswordIcon}
            icon={showPassword ? "eye-off" : "eye"}
            color="black"
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        }
      />
      <Caption
        style={{
          ...Color.primaryTextColor,
          marginBottom: "1%",
          marginTop: "3%",
          fontWeight: "bold",
          fontSize: 13,
        }}
      >
        Lupa Password?
      </Caption>
      <Button
        style={{
          marginTop: "5%",
          marginBottom: "5%",
          ...Color.primaryBackgroundColor,
        }}
        mode="contained"
        onPress={() => handleLogin()}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 18,
    marginTop: "3%",
    marginBottom: "5%",
  },
  textInput: {
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  showPasswordIcon: {
    marginTop: 15,
  },
});

export default LoginScreen;
