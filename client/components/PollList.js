import React, {
    Component
} from 'react';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import BaseUrl from '../config';

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

export default class PollList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polls: {},
            members: {},
        }
        const apiPollsUrl = BaseUrl() + '/api/group/v1/' + this.props.route.params.group_id + "/polls"
        const apiMembersUrl = BaseUrl() + '/api/group/v1/' + this.props.route.params.group_id + "/members"
        console.log("attemping to get polls: " + apiPollsUrl)
        fetch(apiPollsUrl, { credentials: "include" })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    // Couldn't fetch groups.
                    return
                }
                else {
                    // Logged in.
                    console.log(data);
                    this.setState({ polls: data })
                }
            })
        console.log("attemping to get members: " + apiMembersUrl)
        fetch(apiMembersUrl, { credentials: "include" })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    // Couldn't fetch groups.
                    return
                }
                else {
                    // Logged in.
                    console.log(data);
                    this.setState({ members: data })
                }
            })
    }
    groupOnClick(poll_id) {
        console.log(poll_id + " was pressed");
    }
    renderPoll = ({ item }) => {
        return (
            <PollItem
                item={item}
                onPress={() => this.props.navigation.navigate('Poll', {
                    poll_id: item.poll_id,
                    navigation: this.props.navigation,
                    profile: this.props.route.params.profile
                })}
            />
        );
    };
    renderMember = ({ item }) => {
        return (
            <MemberItem
                item={item}
            />
        );
    };
    render() {
        console.log(this.props)
        return (
            <SafeAreaView style={styles.container}>
                <Text>Here are your groups! Click on one to see the polls for that group.</Text>
                <TouchableOpacity 
                    onPress={() => console.log("new poll!")}
                    style={[styles.add_item]}>
                    <Text style={[styles.add_title]}>New group</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.polls}
                    renderItem={this.renderPoll}
                    keyExtractor={(item) => String(item.poll_id)}
                />
                <Text>Group members</Text>
                <TouchableOpacity 
                    onPress={() => console.log("new poll!")}
                    style={[styles.add_item]}>
                    <Text style={[styles.add_title]}>New group</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.members}
                    renderItem={this.renderMember}
                    keyExtractor={(item) => String(item)}
                    horizontal={true}
                />
            </SafeAreaView>
        );
    }
}