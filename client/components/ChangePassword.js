import React, {
    Component
} from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import BaseUrl from '../config';
import { TextInput, Button, Text } from "react-native-paper"

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

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            old_password: "",
        };
    }
    changePassword() {
        console.log("Changing password...1")
        console.log(this.state)
        console.log(this.props.route.params.username)
        let change_password= {
            method: 'POST',
            body: JSON.stringify({
                username: this.props.route.params.username,
                oldpassword: this.state.old_password,
                newpassword: this.state.password
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        console.log("Changing password...2")
        const apiUrl = BaseUrl()+'/api/user/v1/changepassword';
        console.log("Changing password...3")
        fetch(apiUrl, change_password)
            .then((response) => response.json())
            .then((data) => {
                console.log("User added?", data)
                if (data.affectedRows == 1){
                    console.log("success")
                    this.props.navigation.navigate('Home')
                }
                else{
                    console.log("failed")
                }
            });
            console.log("Changing password...4")
    }
    render() {
        console.log(this.state)
        return (
            <View style={{flex: 1, justifyContent: 'Center', alignItems: 'center'}}>
                <TextInput 
                mode="flat"
                style={styles.item}
                secureTextEntry
                label="Old Password"
                value={this.state.old_password}
                    onChangeText={(old_password) => this.setState({old_password})}
                />
                <TextInput 
                mode="flat"
                style={styles.item}
                secureTextEntry
                label="New Password"
                value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                />
                <TouchableOpacity
                    onPress={() => this.changePassword()}
                    style={[styles.add_item]}>
                    <Text style={[styles.add_title]}>Change Password</Text>
                </TouchableOpacity>
            </View>
        );
    }
}