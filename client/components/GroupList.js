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

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.group_name}</Text>
    </TouchableOpacity>
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

export default class GroupList extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    };
    renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                    onPress={() => this.props.navigation.navigate('Poll List', {
                        group_id: item.group_id,
                        navigation: this.props.navigation
                    })
                }
            />
        );
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Here are your groups! Click on one to see the polls for that group.</Text>
                <TouchableOpacity
                    onPress={() => console.log("new group!")}
                    style={[styles.add_item]}>
                    <Text style={[styles.add_title]}>New group</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.props.groups}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => String(item.group_id)}
                />
            </SafeAreaView>
        );
    }
}