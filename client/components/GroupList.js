import React, {
    Component,
    useState
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
});

export default class GroupList extends Component {
    constructor(props) {
        super(props);
    };
    renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => console.log(item.group_id + " was pressed")}
            />
        );
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Here are your groups! Click on one to see the polls for that group.</Text>
                <FlatList
                    data={this.props.groups}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => String(item.group_id)}
                />
            </SafeAreaView>
        );
    }
}