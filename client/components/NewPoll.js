import React, { Component } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import BaseUrl from "../config";

const styles = StyleSheet.create({
  container: {
    flex: "1",
    marginTop: StatusBar.currentHeight || "0",
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: "lightgrey",
  },
  title: {
    fontSize: 16,
    color: "darkblue",
  },
  add_title: {
    fontSize: 16,
    color: "darkgreen",
  },
  add_item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: "lightgrey",
    borderWidth: "thick",
    borderColor: "lightgreen",
  },
});

export default class NewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll_name: "",
      numMovies: "",
      minYear: "",
      maxYear: "",
      minRuntime: "",
      maxRuntime: "",
      rating: "",
      critic: "", // RottenTomatoes, IMDB, Metacritic
      ratingParent: "",
      director: "",
      writer: "",
      actor: "",
      genre: "",
      all_genres: {},
    };
  }
  createPoll() {
    let create_poll = {
      method: "POST",
      body: JSON.stringify({
        poll_name: this.state.poll_name,
        group_id: this.props.route.params.group_id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    const apiUrl = BaseUrl() + "/api/poll/v1/create";
    fetch(apiUrl, create_poll)
      .then((response) => response.json())
      .then((data) => {
        console.log("Poll created?", data);
        if (data.success) {
          console.log("success");
          this.populatePoll(data.poll_id);
        } else {
          console.log("failed");
        }
      });
  }
  populatePoll(poll_id) {
    var rating = this.state.rating != "" ? parseInt(this.state.rating) : null;
    let populatePoll = {
      method: "POST",
      body: JSON.stringify({
        poll_id: poll_id,
        numMovies:
          this.state.numMovies != "" ? parseInt(this.state.numMovies) : null,
        minYear: this.state.minYear != "" ? parseInt(this.state.minYear) : null,
        maxYear: this.state.maxYear != "" ? parseInt(this.state.maxYear) : null,
        minRuntime:
          this.state.minRuntime != "" ? parseInt(this.state.minRuntime) : null,
        maxRuntime:
          this.state.maxRuntime != "" ? parseInt(this.state.maxRuntime) : null,
        ratingTomato:
          this.state.critic.value == "Rotten Tomatoes" ? rating : null,
        ratingMeta: this.state.critic.value == "Metacritic" ? rating : null,
        ratingIMDB: this.state.critic.value == "IMDB" ? rating : null,
        ratingParent:
          this.state.ratingParent.value != ""
            ? this.state.ratingParent.value
            : null,
        director: this.state.director != "" ? this.state.director : null,
        writer: this.state.writer != "" ? this.state.writer : null,
        actor: this.state.actor != "" ? this.state.actor : null,
        genre: this.state.genre.value != "" ? this.state.genre.value : null,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    const apiUrl = BaseUrl() + "/api/poll/v1/populate";
    fetch(apiUrl, populatePoll)
      .then((response) => response.json())
      .then((data) => {
        console.log("Poll populated?", data);
        if (data.success) {
          console.log("success");
          this.props.navigation.replace("Poll", {
            poll_id: poll_id,
          });
          DeviceEventEmitter.emit("pollUpdate", {});
        } else {
          console.log("failed");
        }
      });
  }
  componentDidMount() {
    const apiUrl = BaseUrl() + "/api/movies/v1/genre/";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ all_genres: data }));
  }
  render() {
    console.log(this.props.route.params.group_id);
    console.log(this.state);
    const critics = ["Metacritic", "Rotten Tomatoes", "IMDB"];
    const parentalRatings = ["G", "PG", "PG-13", "R"];
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
      >
        <Text>Name of poll?</Text>
        <TextInput
          mode="flat"
          style={styles.item}
          label="poll_name"
          value={this.state.poll_name}
          onChangeText={(poll_name) => this.setState({ poll_name })}
        />
        <Text>How many movies?</Text>
        <TextInput
          mode="flat"
          style={styles.item}
          label="numMovies"
          value={this.state.numMovies}
          onChangeText={(numMovies) => this.setState({ numMovies })}
        />
        <Text>The following fields are optional.</Text>
        <View
            style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 2,
                width:"25%",
                marginBottom: 10,
                marginTop: 10,
            }}
        />
          <Text>Release date:</Text>
          <TextInput
            mode="flat"
            style={styles.item}
            label="minYear"
            value={this.state.minYear}
            onChangeText={(minYear) => this.setState({ minYear })}
          />
          <Text>to</Text>
          <TextInput
            mode="flat"
            style={styles.item}
            label="maxYear"
            value={this.state.maxYear}
            onChangeText={(maxYear) => this.setState({ maxYear })}
          />

          <Text>Length:</Text>
          <TextInput
            mode="flat"
            style={styles.item}
            label="minRuntime"
            value={this.state.minRuntime}
            onChangeText={(minRuntime) => this.setState({ minRuntime })}
          />
          <Text>to</Text>
          <TextInput
            mode="flat"
            style={styles.item}
            label="maxRuntime"
            value={this.state.maxRuntime}
            onChangeText={(maxRuntime) => this.setState({ maxRuntime })}
          />
        <Text>Minimum rating</Text>
        <TextInput
          mode="flat"
          style={styles.item}
          label="rating"
          value={this.state.rating}
          onChangeText={(rating) => this.setState({ rating })}
        />
        <Text>on:</Text>
        <Dropdown
          options={critics}
          onChange={(critic) => this.setState({ critic })}
          value={this.state.critic.value}
        />
        <Text>Parental Rating</Text>
        <Dropdown
          options={parentalRatings}
          onChange={(ratingParent) => this.setState({ ratingParent })}
          value={this.state.ratingParent.value}
        />
        <Text>Genre:</Text>
        <Dropdown
          options={this.state.all_genres}
          onChange={(genre) => this.setState({ genre })}
          value={this.state.genre.value}
        />
        <Text>Directed by:</Text>
        <TextInput
          mode="flat"
          style={styles.item}
          label="director"
          value={this.state.director}
          onChangeText={(director) => this.setState({ director })}
        />
        <Text>Written by:</Text>
        <TextInput
          mode="flat"
          style={styles.item}
          label="writer"
          value={this.state.writer}
          onChangeText={(writer) => this.setState({ writer })}
        />
        <Text>Starring:</Text>
        <TextInput
          mode="flat"
          style={styles.item}
          label="actor"
          value={this.state.actor}
          onChangeText={(actor) => this.setState({ actor })}
        />
        <TouchableOpacity
          onPress={() => this.createPoll()}
          style={[styles.add_item]}
        >
          <Text style={[styles.add_title]}>Create Poll</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
