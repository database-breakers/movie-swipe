import { useNavigation } from '@react-navigation/native';
import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BaseUrl from '../config';
import GroupList from './GroupList';
import MovieDetail from './MovieDetail'
import HomeHeader from './HomeHeader'
import {Button, TextInput, Text} from 'react-native-paper';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
    },
    helpersWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    wrapper: {
      flex: 1,
    },
    helper: {
      flexShrink: 1,
    },
    counterHelper: {
      textAlign: 'right',
    },
    fontSize: {
      fontSize: 24,
    },
    textArea: {
      height: 80,
    },
  });
export default class HomeScreen extends Component {
    constructor(props){
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
                    this.getGroups();
                }
            })
    }

    getGroups() {
        if (this.state.loggedIn) {
            const apiUrl = BaseUrl()+'/api/group/v1/'
            fetch(apiUrl, {credentials: "include"})
                .then((response) => response.json())
                .then((data) => {
                    if (data.error){
                        // Couldn't fetch groups.
                        return
                    }
                    else{
                        // Logged in.
                        console.log(data);
                        this.setState({groups: data})
                    }
                })
        }
        return
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
                    this.getGroups();
                }
                else{
                    this.setState({loggedIn: false})
                }
            });
    }

    signOut(){
        let login = {
            method: 'POST',
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        const apiUrl = BaseUrl()+'/api/user/v1/signout';
        fetch(apiUrl, login)
            .then((response) => response.json())
            .then((data) => {
                if (data.success){
                    this.setState({loggedIn: false, password: '', username: ''})
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
                    <GroupList
                        groups={this.state.groups}
                        navigation={this.props.navigation}
                        profile={this.state.profile}
                    />
                    <Button mode="contained" onPress={() => this.signOut()}> Sign out
                    </Button>
                    <MovieDetail id={"tt0120737"} />
                </View>
            )
        }
        else{
            return (
                <View><HomeHeader/>
                
                <View style={{flex: 1, justifyContent: 'Center', alignItems: 'center'}}>
                    <TextInput 
                    mode="flat"
                    style={styles.inputContainerStyle}
                    label="Username"
                    value={this.state.username}
                        onChangeText={(username) => this.setState({username})}
                    />
                    <TextInput
                        mode="flat"
                        style={styles.inputContainerStyle}
                        secureTextEntry
                        label="Password"
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                    />
                      <Button 
                      mode="contained" 
                      onPress={() => this.signIn()}
                      >
                          Log In</Button>
                </View>
                </View>
            );
        }
    }
}
