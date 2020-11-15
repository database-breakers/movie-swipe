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
    voteYes(item) {
        console.log("voting yes on " + item)
        let vote_yes = {
            method: 'POST',
            body: JSON.stringify({
                poll_id: this.props.route.params.poll_id,
                imdb_id: this.state.movies[item]
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        const apiUrl = BaseUrl()+'/api/poll/v1/swipe/right';
        fetch(apiUrl, vote_yes)
            .then((response) => response.json())
            .then((data) => {
                console.log("Vote counted?", data)
                if (data.success){
                    console.log("success")
                }
                else{
                    console.log("failed")
                }
            });
    }
    voteNo(item) {
        console.log("voting no on " + item)
        let vote_no = {
            method: 'POST',
            body: JSON.stringify({
                poll_id: this.props.route.params.poll_id,
                imdb_id: this.state.movies[item]
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        const apiUrl = BaseUrl()+'/api/poll/v1/swipe/left';
        fetch(apiUrl, vote_no)
            .then((response) => response.json())
            .then((data) => {
                console.log("Vote counted?", data)
                if (data.success){
                    console.log("success")
                }
                else{
                    console.log("failed")
                }
            });
    }
    render() {
        console.log(this.props.route.params.profile)
        console.log("length: " + this.state.movies.length)
        return (
            <SafeAreaView style={styles.container}>
            { (this.state.movies.length != undefined && this.state.movies.length > 0) ? 
                <Swiper
                    cards={this.state.movies}
                    renderCard={this.renderMovie}
                    backgroundColor="lightgrey"
                    disableTopSwipe={true}
                    disableBottomSwipe={true}
                    onSwipedLeft={(cardIndex) => this.voteNo(cardIndex)}
                    onSwipedRight={(cardIndex) => this.voteYes(cardIndex)}
                >
                </Swiper>
                : <View>
                    <Text>
                        results go here
                    </Text>
                </View> }
            </SafeAreaView>
        );
    }
}