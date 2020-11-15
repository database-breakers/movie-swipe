import * as React from 'react';
import { Surface, Text, TextInput, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import swipelogo from '../assets/swipelogo.svg'
const SignUp = () => (
    <View>
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
    }}>Create an account</Text>
</Text>
  </Surface>
<View style={{flex: 1, justifyContent: 'Center', alignItems: 'center'}}>
    <TextInput 
        mode="flat"
        style={styles.inputContainerStyle}
        label="Username"
        />
                    <TextInput
                        mode="flat"
                        style={styles.inputContainerStyle}
                        secureTextEntry
                        label="Password"
                        
                      />
                      <Button 
                      mode="contained" 
                      // onPress={() => }
                      >
                          Next</Button>                      
                </View>

  </View>

  
);

export default SignUp;

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