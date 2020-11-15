import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import BaseUrl from '../config';
import { ThemeProvider, Button, Card } from 'react-native-elements';
import rtFreshImg from '../assets/rt_fresh.png'
import metaImg from '../assets/metacritic.png'
import imdbImg from '../assets/imdb.png'
export default class MovieDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            movie: {}
          };
    }

    componentDidMount(){
        const apiUrl = BaseUrl()+'/api/movies/v1/'+this.props.id;
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => this.setState({movie: data}));
    }

    render() {
        console.log(this.state.movie)
        return (
            <Card>
            <Card.Title>{this.state.movie.title}</Card.Title>
            <Card.Divider/>
            <Card.Image source={{uri: this.state.movie.poster}} resizeMode = "contain" style={{height: 400}}/>
            <Text style={{marginBottom: 10}}> 
                {this.state.movie.synopsis}
            </Text>
            <Text style={{marginBottom: 10}}> 
                <img src={rtFreshImg} alt = "rotten_fresh" style = {{height: 20}}/>
                {this.state.movie.rating_rotten_tomatoes}
            </Text>
              <Text style={{marginBottom: 10}}> 
                <img src={metaImg} alt = "metacritic" style = {{height: 20}}/>
                {this.state.movie.rating_metacritic}
            </Text>
            <Text style={{marginBottom: 10}}> 
                <img src={imdbImg} alt = "imdb" style = {{height: 20}}/>
                {this.state.movie.rating_imdb}
            </Text>
          </Card>
        )

    }
}