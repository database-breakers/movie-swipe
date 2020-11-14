import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import BaseUrl from '../config';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            movie: {},
            loggedIn: false,
            profile: {},
            username: "",
            password: "",
        };
    }

    checkLoginStatus(){
        const apiUrl = BaseUrl()+'/api/user/v1/profile'
        fetch(apiUrl, {credentials: "include"})
            .then((response) => response.json())
            .then((data) => {
                console.log("Profile response:", data);
                if (data.error){
                    // Not logged in.
                    this.setState({loggedIn: false})
                }
                else{
                    // Logged in.
                    this.setState({loggedIn: true, profile: {...data}})
                }
            })
    }

    signIn(username, password){
        let login = {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        const apiUrl = BaseUrl()+'/api/user/v1/signin';
        fetch(apiUrl, login)
            .then((response) => response.json())
            .then((data) => {
                console.log("Signed in?", data)
                if (data.success){
                    this.setState({loggedIn: true, profile: data.profile})
                }
                else{
                    this.setState({loggedIn: false})
                }
            });
    }

    componentDidMount() {
        this.checkLoginStatus();
        const apiUrl = BaseUrl()+'/api/movies/v1/tt0120737';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => this.setState({movie: data}));
    }

    render() {
        if(this.state.loggedIn){
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Welcome back, {this.state.profile.display_name}!</Text>
                </View>
                
            )
        }
        else{
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TextInput 
                        placeholder="Username"
                        value={this.state.username}
                        onChangeText={(username) => this.setState({username})}
                    />
                    <TextInput placeholder="Password"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                    />
                    <Button
                        onPress={() => this.signIn()}
                        title="Log In"
                        color="#841584"
                        accessibilityLabel="Log In to the app"
                    />
                </View>
            );
        }
    }
}