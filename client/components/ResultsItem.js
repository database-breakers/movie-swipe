import React, {
    Component
} from 'react';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';
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

export default class ResultsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            details: {}
        }
    }

    componentDidMount(){
        const apiUrl = BaseUrl()+'/api/movies/v1/'+this.props.imdb_id;
        fetch(apiUrl, { credentials: "include" })
        .then((response) => response.json())
        .then((data) => {
            this.setState({loaded: true, details: data})
            console.log(data);
        });
    }

    render() {
        var percent = parseFloat(this.props.percentage)/100.0 
        if(this.state.loaded)
            return (
                <View style={{padding: 10, borderBottomWidth: 1, flex:1, flexDirection:'row', alignItems: 'flex-start'}}>
                    <View style={{flex:2, maxWidth:100}}>
                        <Image source={{uri: this.state.details.poster}} style={{height:150}}/>
                    </View>
                    <View style={{flex:8}}>
                        <View style={{padding: 10, width: "100%"}}>
                            <Text>{this.state.details.title}</Text>
                            <View style={{flex:1, flexDirection:'row', alignItems: 'flex-start', paddingBottom: 10}}>
                                <View style={{flex:85}}>
                                    <ProgressBar progress={percent} color={Colors.greed800} style={{height:20}} />
                                </View>
                                <View style={{flex:15, paddingLeft:10, minWidth:100}}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Octicons name="thumbsup" size={16} color="green" />
                                        <Text style={{paddingLeft: 10}}>Likes: {this.props.likes}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1, flexDirection:'row', alignItems: 'flex-start'}}>
                                <View style={{flex:85}}>
                                    <ProgressBar progress={1-percent} color={Colors.red800} style={{height:20}} />
                                </View>
                                <View style={{flex:15, paddingLeft:10, minWidth:100}}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Octicons name="thumbsdown" size={16} color="red" />
                                        <Text style={{paddingLeft: 10}}>Dislikes: {this.props.dislikes}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            );
        else{
            return (
                <Text>Loading...</Text>
            )
        }
    }
}