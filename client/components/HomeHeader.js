import * as React from 'react';
import { Surface, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import swipelogo from '../assets/swipelogo.svg'
const HomeHeader = () => (
  <Surface style={styles.surface}>
    
     <Text style={{ 
       fontWeight: 'bold', 
       color: '#FFFFFF',
       fontSize: 40
       }}>
         <img src={swipelogo} alt = "movie swipe logo" style = {{height: 50}} />
  Movie Swipe {"\n"}
  
  <Text style={{ 
    fontWeight: 'bold', 
    color: '#FFBB12',
    fontSize: 20
    }}>Swipe to agree on what to watch</Text>
</Text>
  </Surface>
);

export default HomeHeader;

const styles = StyleSheet.create({
  surface: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    color: '#FFFFFF',
    backgroundColor: '#0E4DA4',
    
    baseText: {
      fontWeight: 'bold'
    },
    innerText: {
      color: 'red'
    }
  },
});
