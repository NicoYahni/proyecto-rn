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
    // alignItems: 'center',
    // justifyContent: 'center',
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
class Home extends Component {
  constructor(props){
    super(props),
    this.state={
      personajes: [],
      activityIndicator: true,
      email: '',
      password:'',
      posts: [],
      postsManipulables: [],
      textoBuscado: '',
      disabled: true
    } }

// buscar(){

// db.collection('Posts').where('owner', '==', this.state.textoBuscado).onSnapshot(
//     docs => {
//       let posteos = [];
//       docs.forEach( doc => {
//         posteos.push({
//           id: doc.id,
//           data: doc.data()
//         })
//       })
//       console.log(posteos);
//       // console.log(userData);
//       this.setState({
//         posts: posteos,

//       })
//     }
//   )

  
// }
componentDidMount(){
  // traer datos de la db
  db.collection('Posts').orderBy('createdAt', 'desc').onSnapshot(
    docs => {
      let posteos = [];
      docs.forEach( doc => {
        posteos.push({
          id: doc.id,
          data: doc.data()
        })
      })
      console.log(posteos);
      // console.log(userData);
      this.setState({
        posts: posteos,
        postsManipulables: posteos

      })
    }
  )
}
// componentDidMount(){
// this.traerPosteos()
// }

// desHacerBusqueda(){
//   this.traerPosteos()

// }
 render(){
   console.log(auth.currentUser);
   return(

     
   <View style={styles.container}>
      {/* <TextInput
     style={styles.input} 
     keyboardType='default'
     placeholder='buscar'
     onChangeText={   text => this.setState({ textoBuscado:text},
        this.setState({ disabled: this.textoBuscado == ''})),
        ()=>this.buscar()
       }/>  */}

     {/* <TouchableOpacity disabled={this.state.textoBuscado == ''} style={this.state.textoBuscado == '' ? styles.buttonDisabled:styles.button}
     onPress={()=> this.buscar()
     } >
     <Text>Buscar</Text>
     </TouchableOpacity>
     <TouchableOpacity 
      style={styles.button}
     onPress={()=> this.desHacerBusqueda()} >
     <Text>Cancelar</Text>
     </TouchableOpacity> */}
    
    <FlatList data={this.state.posts} keyExtractor={posteo=> posteo.id} renderItem={({item})=>
    <Post id={item.id} comentarios={item.data.comentarios} likes={item.data.likes} item={item} textoPost ={item.data.textoPost} owner ={item.data.owner} textoPost ={item.data.textoPost}/> }>
     
     
       
     </FlatList>
     
   </View>
   
  )}
}
export default Home; 