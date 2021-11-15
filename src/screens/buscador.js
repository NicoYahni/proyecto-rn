import React, {Component} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import Contador from "../components/contador"
import Card from "../components/Card"
import Post from "../components/Post"
import Menu from "../components/menu"
import {NavigationContainer} from '@react-navigation/native'
import { db, auth } from '../firebase/config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: "10px",
  },
  boton1:{
    backgroundColor: "#ccc",
    padding: "4px", 
    fontWeight:"bold",
  },
  boton2:{
    backgroundColor: "rgba(0, 255, 0, 0.5)",
    padding: "7px", 
    margin: "10px",
    fontWeight:"bold",
    
    },
    image:{
      height:"300px",
      width:"300px"
  },
  input:{
    height:20,
    paddingVertical:15,
    paddingHorizontal: 10,
    borderWidth:1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical:10,
},
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        width: '30%',
        justifyContent: 'center',
    },
    buttonDisabled:{
        backgroundColor:'grey',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        width: '30%',
        justifyContent: 'center',
    }
});
class Buscador extends Component {
  constructor(props){
    super(props),
    this.state={
      posts: [],
      postsManipulables: [],
      textoBuscado: '',
      usuarioBuscado:'',
      usuarioBuscado1:'',
      disabled: true,
      busqueda: false
    } }

buscar(){
db.collection('Posts').where('owner', '==', this.state.textoBuscado).onSnapshot(
    docs => {
      let posteos = [];
      docs.forEach( doc => {
        posteos.push({
          id: doc.id,
          data: doc.data()
        })
      })
      console.log(posteos);
      
      this.setState({
        posts: posteos,
        textoBuscado: '',
        usuarioBuscado: this.state.textoBuscado,
        busqueda: true,

        

      })
    }
  )

  
}

desHacerBusqueda(){
  
      this.setState({
        posts: [],
        textoBuscado: '',
        usuarioBuscado: '',
        busqueda: false
      })


}
 render(){
  //  console.log(auth.currentUser);
   return(

     
   <View style={styles.container}>
      <TextInput
     style={styles.input} 
     keyboardType='default'
     placeholder='buscar'
     value= {this.state.textoBuscado}
     onChangeText={  
       text => this.setState({
         textoBuscado:text,
      
       
        },
        this.setState({
          disabled: this.textoBuscado == ''
        }))
    
        // ,  ()=>this.buscar()
       }
     
       /> 

     <TouchableOpacity disabled={this.state.textoBuscado == ''} style={this.state.textoBuscado == '' ? styles.buttonDisabled:styles.button}
     onPress={()=> this.buscar()} >
     <Text>Buscar</Text>
     </TouchableOpacity>
     <TouchableOpacity 
      style={styles.button}
     onPress={()=> this.desHacerBusqueda()} >
     <Text>Resetear</Text>
     </TouchableOpacity>
    {/* <Text>{this.state.usuarioBuscado}</Text> */}

    {this.state.busqueda ? 

    this.state.posts.length == 0 ?
    <Text>No hay posteos para el usuario buscado</Text>
  
  :
  <View>
  <Text>Mostrando los resultados de {this.state.usuarioBuscado}</Text>
  <FlatList data={this.state.posts} keyExtractor={posteo=> posteo.id} renderItem={({item})=>
    <Post id={item.id} comentarios={item.data.comentarios} likes={item.data.likes} item={item} textoPost ={item.data.textoPost} owner ={item.data.owner} textoPost ={item.data.textoPost}/> }>
     
     
       
     </FlatList>
     </View>
     :
     <Text>Busca con el mail del usuario para ver sus posteos</Text>
  }
    
     
   </View>
   
  )}
}
export default Buscador; 