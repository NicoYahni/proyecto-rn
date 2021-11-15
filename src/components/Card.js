import React, {Component} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: "10px",
  },
    image:{
      height:"300px",
      width:"300px"
  },
  texto:{
    width:'fitcontent',
    justifyContent: 'center',
    fontStyle: 'bold',
  
  }
});
class Card extends Component {
  constructor(props){
    super(props),
    this.state={
      
    } }
 
  


 render(){
  //  console.log(this.props)
   return(
     
     
    <TouchableOpacity>
        
    <Text style={styles.texto}>{this.props.item.name}</Text>
    <Image style={styles.image}
  source={{uri: this.props.item.image}}
  resizeMode={'contain'}/>
    </TouchableOpacity>
   
  )}
}
 



export default Card; 