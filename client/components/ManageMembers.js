import React, {
    Component
} from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';
import BaseUrl from '../config';

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

export default class ManageMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        };
    }
    addUser() {
        let add_user = {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                group_id: this.props.route.params.group_id,
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        const apiUrl = BaseUrl()+'/api/group/v1/add';
        fetch(apiUrl, add_user)
            .then((response) => response.json())
            .then((data) => {
                console.log("User added?", data)
                if (data.success){
                    console.log("success")
                    DeviceEventEmitter.emit('pollMembersUpdate', {})
                }
                else{
                    console.log("failed")
                }
            });
    }
    removeUser() {
        let remove_user = {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                group_id: this.props.route.params.group_id,
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        const apiUrl = BaseUrl()+'/api/group/v1/remove';
        fetch(apiUrl, remove_user)
            .then((response) => response.json())
            .then((data) => {
                console.log("User removed?", data)
                if (data.success){
                    console.log("success")
                    DeviceEventEmitter.emit('pollMembersUpdate', {})
                }
                else{
                    console.log("failed")
                }
            });
    }
    render() {
        console.log(this.props.route.params.group_id)
        console.log(this.state)
        return (
            <View style={{flex: 1, justifyContent: 'Center', alignItems: 'center'}}>
                <Text>Username:</Text>
                <TextInput 
                mode="flat"
                style={styles.item}
                label="username"
                value={this.state.username}
                    onChangeText={(username) => this.setState({username})}
                />
                <TouchableOpacity
                    onPress={() => this.addUser()}
                    style={[styles.add_item]}>
                    <Text style={[styles.add_title]}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.removeUser()}
                    style={[styles.add_item]}>
                    <Text style={[styles.add_title]}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => 
                        this.props.navigation.navigate('Poll List', {
                            group_id: this.props.route.params.group_id,
                        })}
                    style={[styles.add_item]}>
                    <Text style={[styles.add_title]}>Done</Text>
                </TouchableOpacity>
            </View>
        );
    }
}