import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: "10px",
  },
  boton1:{
    backgroundColor: "#ccc",
    padding: "4px", 
    // borderradius: "4px",
    // marginbottom: "10px",
    fontWeight:"bold",
  },
  boton2:{
    backgroundColor: "rgba(0, 255, 0, 0.5)",
    padding: "7px", 
    // borderradius: "4px",
    margin: "10px",
    fontWeight:"bold",
  }
});


class Contador extends Component{
  constructor(){
    super();
    this.state= {
      valor: 0,
      color:' '
    
    }

    
  }


  decrementar(){
    this.setState({
      valor : this.state.valor -1,
      

    })
  }

  aumentar(){
    this.setState({
      valor : this.state.valor +1,
      
      
    })
  }

  resetear(){
    this.setState({
      valor : 0,
      
    })
    
  }
  

  
      render(){
        return(

          <View > 
            <Text> Cantidad de clicks:{this.state.valor}</Text>
            {/* <TouchableOpacity style={this.props.boton1} onPress= {()=> this.decrementar()}>
             <Text>Decrementar</Text> 
              </TouchableOpacity> */}
            <TouchableOpacity  style={styles.boton2} onPress = {()=> this.aumentar()}><Text>Click Aquí para Contar</Text></TouchableOpacity>
            {/* <TouchableOpacity  onPress = {()=> this.resetear()}><Text>Resetear</Text></TouchableOpacity> */}
          </View>
        )
      }


}


export default Contador;

