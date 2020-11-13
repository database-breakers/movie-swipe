import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import "../config"
import BaseUrl from '../config';

export default class HomeScreen extends Component {
    componentDidMount() {
        const apiUrl = BaseUrl()+'/api/movies/v1/tt0120737';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
            </View>
        );
    }
}