import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class HomeScreen extends Component {
    componentDidMount() {
        const apiUrl = '/api/group/v1/';
        fetch(apiUrl)
            .then((response) => response.text())
            .then((data) => console.log('This is your data', data));
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
            </View>
        );
    }
}