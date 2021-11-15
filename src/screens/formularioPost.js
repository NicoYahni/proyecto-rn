import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import { Text, ReactFragment, TouchableOpacity, View, StyleSheet, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import {auth} from '../firebase/config'
import { db } from '../firebase/config';
import MyCamera from '../components/MyCamera'



  const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        
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
        borderColor: '#28a745'
    },
    buttonDisabled:{
        backgroundColor:'grey',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    alerta:{
      color: 'red'
    }

})

class formularioPost extends Component {
  constructor(props){
    super(props),
    this.state={
      email:'',
      textoPost: '',
      userName: '',
      likes: {},
      comments: {},
      showCamera: true,
      url: ''
    } }
 

onSubmit(){
      console.log('posteando');
      db.collection('Posts').add({
          owner:auth.currentUser.email,
        createdAt: Date.now(),
        textoPost: this.state.textoPost,
        likes: [],
        comentarios: [],
        photo : this.state.url

      })
      .then(()=>{
        console.log('posteado ok');
        this.setState({
          textoPost:'',
          showCamera: true
        })
      //redirect
      this.props.drawerProps.navigation.navigate('Home')
      })
      .catch( error => console.log(error))

}

onImageUpload(url){
this.setState({
  showCamera: false,
  url : url
})
}

 render(){
   return(
     <React.Fragment>
       {
         this.state.showCamera ? 
         <MyCamera onImageUpload = {(url) => this.onImageUpload(url)}/>
         :

         <View style={styles.formContainer}>
    <Text>Crea un nuevo post</Text>
  
     <TextInput
     style={styles.input} 
     keyboardType='default'
     placeholder='Escriba aqui'
     secureTextEntry={true}
     onChangeText={ text => this.setState({textoPost:text}) }
     multiline
     value= {this.state.textoPost}/> 
    
     
     <TouchableOpacity disabled={this.state.textoPost == ''} style={this.state.textoPost == ''? styles.buttonDisabled : styles.button} onPress={() => this.onSubmit()}>
         <Text> Postear </Text> 
     </TouchableOpacity> 

    
     
</View>
       }
    
</React.Fragment>
   
  )}
}
 



export default formularioPost; 