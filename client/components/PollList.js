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
  SafeAreaView,
  DeviceEventEmitter,
} from "react-native";
import BaseUrl from "../config";

const PollItem = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.poll_name}</Text>
  </TouchableOpacity>
);
const MemberItem = ({ item, onPress, style }) => (
  <View>
    <Text style={styles.title}>{"  " + item}</Text>
  </View>
);

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
  delete_title: {
    fontSize: 16,
    color: "darkred",
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
  delete_group: {
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
    borderColor: "red",
  },
});

export default class PollList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: {},
      members: {},
    };
    this.getUsers();
    DeviceEventEmitter.addListener("pollMembersUpdate", () => {
      this.getUsers();
    });
    DeviceEventEmitter.addListener("pollUpdate", () => {
      this.getUsers();
    });
  }

  getUsers() {
    const apiPollsUrl =
      BaseUrl() +
      "/api/group/v1/" +
      this.props.route.params.group_id +
      "/polls";
    const apiMembersUrl =
      BaseUrl() +
      "/api/group/v1/" +
      this.props.route.params.group_id +
      "/members";
    console.log("attemping to get polls: " + apiPollsUrl);
    fetch(apiPollsUrl, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // Couldn't fetch groups.
          return;
        } else {
          // Logged in.
          console.log(data);
          this.setState({ polls: data });
        }
      });
    console.log("attemping to get members: " + apiMembersUrl);
    fetch(apiMembersUrl, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // Couldn't fetch groups.
          return;
        } else {
          // Logged in.
          console.log(data);
          // this.setState({ members: data })
          this.getDisplayNames(data);
        }
      });
  }

  getDisplayNames(members) {
    for (const member of members) {
      const apiNamesUrl = BaseUrl() + "/api/user/v1/profile/" + member;
      var display_names = [];
      fetch(apiNamesUrl, { credentials: "include" })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            // Couldn't fetch groups.
            return;
          } else {
            // Logged in.
            display_names.push(data);
            this.setState({ members: display_names });
          }
        });
    }
  }
  groupOnClick(poll_id) {
    console.log(poll_id + " was pressed");
  }
  renderPoll = ({ item }) => {
    return (
      <PollItem
        item={item}
        onPress={() =>
          this.props.navigation.navigate("Poll", {
            poll_id: item.poll_id,
            group_id: this.props.route.params.group_id,
            profile: this.props.route.params.profile,
          })
        }
      />
    );
  };
  renderMember = ({ item }) => {
    return <MemberItem item={item.display_name} />;
  };
  deleteGroup() {
    let delete_group = {
      method: "POST",
      body: JSON.stringify({
        group_id: this.props.route.params.group_id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    const apiUrl = BaseUrl() + "/api/group/v1/delete";
    fetch(apiUrl, delete_group)
      .then((response) => response.json())
      .then((data) => {
        console.log("Group deleted?", data);
        if (data.success) {
          console.log("success");
          DeviceEventEmitter.emit("groupUpdate", {});
          this.props.navigation.navigate("Home", {});
        } else {
          console.log("failed");
        }
      });
  }
  render() {
    console.log(this.props);
    return (
      <SafeAreaView style={styles.container}>
        <Text>Click on a poll to vote on movies!</Text>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("New Poll", {
              group_id: this.props.route.params.group_id,
            })
          }
          style={[styles.add_item]}
        >
          <Text style={[styles.add_title]}>New Poll</Text>
        </TouchableOpacity>
        {this.state.polls != undefined && this.state.polls.length > 0 ? (
          <FlatList
            data={this.state.polls}
            renderItem={this.renderPoll}
            keyExtractor={(item) => String(item.poll_id)}
          />
        ) : (
          <View />
        )}
        <Text>Group members</Text>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Manage Members", {
              group_id: this.props.route.params.group_id,
            })
          }
          style={[styles.add_item]}
        >
          <Text style={[styles.add_title]}>Manage members</Text>
        </TouchableOpacity>
        {this.state.members != undefined && this.state.members.length > 0 ? (
          <FlatList
            data={this.state.members}
            renderItem={this.renderMember}
            keyExtractor={(item) => String(item.username)}
            horizontal={false}
          />
        ) : (
          <View />
        )}
        <TouchableOpacity
          onPress={() => this.deleteGroup()}
          style={[styles.delete_group]}
        >
          <Text style={[styles.delete_title]}>Delete Group</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
