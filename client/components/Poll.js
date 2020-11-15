
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
import MovieDetail from './MovieDetail'
import Swiper from 'react-native-deck-swiper'

const MemberItem = ({ item, onPress, style }) => (
    <View>
        <Text style={styles.title}>{"  " + item}</Text>
    </View>
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

export default class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: {},
        }
        const apiPollsUrl = BaseUrl() + '/api/poll/v1/' + this.props.route.params.poll_id + "/movies"
        console.log("attemping to get movies: " + apiPollsUrl)
        fetch(apiPollsUrl, { credentials: "include" })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    // Couldn't fetch movies.
                    return
                }
                else {
                    // Logged in.
                    console.log(data);
                    this.setState({ movies: data })
                }
            })
    }
    groupOnClick(poll_id) {
        console.log(poll_id + " was pressed");
    }
    renderMovie = ( item ) => {
        if (this.state.movies != {}) {
            return (
                <MovieDetail
                    id={item}
                />
            );
        } else {
            return (
                <View></View>
            );
        }
    };
    render() {
        console.log(this.state.movies)
        console.log("length: " + this.state.movies.length)
        return (
            <SafeAreaView style={styles.container}>
            { (this.state.movies.length != undefined) ? 
                <Swiper
                    cards={this.state.movies}
                    renderCard={this.renderMovie}
                    backgroundColor="red"
                    disableTopSwipe={true}
                    disableBottomSwipe={true}
                >
                </Swiper>
                : <View></View> }
            </SafeAreaView>
        );
    }
}