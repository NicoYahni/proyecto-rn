import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, StyleSheet, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import {auth, db} from '../firebase/config'
import {NavigationContainer} from '@react-navigation/native'
import Post from "../components/Post"
import {Ionicons} from '@expo/vector-icons'
const styles = StyleSheet.create({
  formContainer:{
    flex: '1',
      paddingHorizontal:10,
      marginTop: 20,
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
      backgroundColor:'red',
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: 'center',
      borderRadius:4, 
      borderWidth:1,
      borderStyle: 'solid',
      borderColor: 'red'
  },
  textButton:{
      color: '#fff'
  },
  user:{
    flexDirection: 'row',
    justifyContent : 'space-between'
  },
  userName:{
    fontSize: '30px',
    fontWeight: 'bold'
  },
  modal:{
    width: '90%',
    marginRight : '0px'
  }
})
class miPerfil extends Component {
  constructor(props){
    super(props),
    this.state={
      posts: [],
      cantidadPosts: 0,
      openInfo: false,
      openOptions: false
    
    } }
 
    componentDidMount(){
      // traer datos de la db
      db.collection('Posts').where('owner', '==', this.props.userData.email).onSnapshot(
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
            cantidadPosts: posteos.length
    
          })
        }
      )
    }

  openInfo(){
    
    this.setState({
      openInfo: this.state.openInfo ? false : true

    })
  }
  openOptions(){
    
    this.setState({
      openOptions: this.state.openOptions ? false : true

    })
  }


 render(){
   return(
     
    <View style={styles.formContainer}>
      <View style={styles.user} > 
        <Text style={styles.userName}> {this.props.userData.email} </Text>
      <Ionicons  onPress={()=> this.openOptions()}  name='ellipsis-vertical' size='25px' />
      </View>
      
      {this.state.openOptions ? 
      
      <Modal style={styles.modal} visible={this.state.openOptions}
                    animationType="fade"
                    transparent={false}>
        <Text onPress={()=> this.openInfo()} > INFO </Text>
            {this.state.openInfo ?
              <Modal style={styles.modal} visible={this.state.openInfo}
                    animationType="fade"
                    transparent={false}>
              
              <Text>Ultima vez que inicio sesion: {this.props.userData.metadata.lastSignInTime}  </Text>
              <Text>Usuario creado el:{this.props.userData.metadata.creationTime}  </Text>
        </Modal>
            :
            null}
                   
        <TouchableOpacity style={styles.button} onPress={()=> this.props.logOut()}>
          <Text > Log Out</Text>
        </TouchableOpacity>
        </Modal>
      :
      null}
      
        
       
        <Text>Cantidad de Posteos:{this.state.cantidadPosts}  </Text>
         
        <FlatList data={this.state.posts} keyExtractor={posteo=> posteo.id} renderItem={({item})=>
    <Post id={item.id} comentarios={item.data.comentarios} likes={item.data.likes} item={item} textoPost ={item.data.textoPost} owner ={item.data.owner} textoPost ={item.data.textoPost}/> }>
     
     
       
     </FlatList>
    
    
     
  </View>   
   
  )}

  }

 



export default miPerfil; 