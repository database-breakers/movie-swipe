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
import ResultsItem from './ResultsItem';

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

export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: {},
        }
    }

    componentDidMount(){
        const apiUrl = BaseUrl()+'/api/poll/v1/'+this.props.poll_id+"/results";
        fetch(apiUrl, { credentials: "include" })
        .then((response) => response.json())
        .then((data) => {
            this.setState({results: data})
            console.log(data);
        });
    }

    renderItem = ({ item }) => (
        <ResultsItem imdb_id={item.imdb_id} percentage={item.Percentage} likes={item.Likes} dislikes={item.Dislikes} />
    );

    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.results}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.imdb_id}
                />
            </SafeAreaView>
        );
    }
}