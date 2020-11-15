import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BaseUrl from "../config";
import GroupList from "./GroupList";
import MovieDetail from "./MovieDetail";
import HomeHeader from "./HomeHeader";
import { Button, TextInput, Text, Surface } from "react-native-paper";
import swipelogo from "../assets/swipelogo.svg";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      loggedIn: false,
      profile: {},
      username: "",
      password: "",
      groups: {},
    };
  }

  createAccount(username, password, passwordConfirmed) {
    if (password !== passwordConfirmed){
        this.setState({error: "passwords do not match"});
    }
    let login = {
        method: "POST",
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const apiUrl = BaseUrl() + "/api/user/v1/createUser";
      fetch(apiUrl, login)
        .then((response) => response.json())
        .then((data) => {
          console.log("Signed in?", data);
          if (data.success) {
            this.setState({ loggedIn: true });
          } else {
            this.setState({ loggedIn: false });
          }
        });

  }
  render() {
    return (
      <View>
        <Surface style={styles.surface}>
          <Text
            style={{
              fontWeight: "bold",
              color: "#FFFFFF",
              fontSize: 40,
            }}
          >
            <img
              src={swipelogo}
              alt="movie swipe logo"
              style={{ height: 50 }}
            />
            Movie Swipe {"\n"}
            <Text
              style={{
                fontWeight: "bold",
                color: "#FFBB12",
                fontSize: 20,
              }}
            >
              Create an account
            </Text>
          </Text>
        </Surface>
        <View
          style={{ flex: 1, justifyContent: "Center", alignItems: "center" }}
        >
          <TextInput
            mode="flat"
            style={styles.inputContainerStyle}
            label="Username"
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
          />
          <TextInput
            mode="flat"
            style={styles.inputContainerStyle}
            secureTextEntry
            label="Password"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <Button mode="contained" onPress={() => this.createAccount()}>
            Create
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    color: "#FFFFFF",
    backgroundColor: "#0E4DA4",

    baseText: {
      fontWeight: "bold",
    },
    innerText: {
      color: "red",
    },
  },
});
