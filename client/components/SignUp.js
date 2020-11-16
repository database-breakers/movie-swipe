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
      confirmPassword: "",
      groups: {},
    };
  }

  createAccount() {
    if (this.state.password !== this.state.confirmPassword){
        this.setState({error: "Passwords do not match"});
        return;
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
          if (!data.error) {
            console.log()
            this.setState({ loggedIn: true });
            this.props.navigation.replace("Home", {created: "Sign in to access account."});
          } else {
            this.setState({error: data.error, loggedIn: false });
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
        <View style={{ flex: 1, justifyContent: "Center", alignItems: "center", paddingTop:100 }} >
          {(this.state.error) ? <Text mode="bold" style={{color:"red"}}>{this.state.error}</Text> : <View/>}
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
          <TextInput
            mode="flat"
            style={styles.inputContainerStyle}
            secureTextEntry
            label="Confirm Password"
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          />
          <Button style={{margin:10}} mode="contained" onPress={() => this.createAccount()}>
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
