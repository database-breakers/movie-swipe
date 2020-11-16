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

export default class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group_name: "",
        };
    }
    newGroup() {
        let add_user = {
            method: 'POST',
            body: JSON.stringify({
                group_name: this.state.group_name,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        const apiUrl = BaseUrl() + '/api/group/v1/create';
        fetch(apiUrl, add_user)
            .then((response) => response.json())
            .then((data) => {
                console.log("Group created?", data)
                if (data.success) {
                    console.log("success")
                    this.props.navigation.navigate("Home")
                }
                else {
                    console.log("failed")
                }
            });
    }
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'Center', alignItems: 'center'}}>
                <Text>Name:</Text>
                <TextInput 
                mode="flat"
                style={styles.item}
                label="group_name"
                value={this.state.group_name}
                    onChangeText={(group_name) => this.setState({group_name})}
                />
                <TouchableOpacity
                    onPress={() => this.newGroup()}
                    style={[styles.add_item]}>
                    <Text style={[styles.add_title]}>Create</Text>
                </TouchableOpacity>
            </View>
        );
    }
}