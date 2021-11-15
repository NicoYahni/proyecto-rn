import React, {Component} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import {auth} from '../firebase/config'
import {NavigationContainer} from '@react-navigation/native'
import Register from '../screens/register'

  const styles = StyleSheet.create({
    formContainer:{
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
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    } ,
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

class Login extends Component {
  constructor(props){
    super(props),
    this.state={
      email:'',
      password: '',
      userName: ''
    
    } }
 

registrar(){
  this.props.drawerProps.navigation.navigate('Register')
}

 render(){
   return(
     
    <View style={styles.formContainer}>
    <Text>Log In</Text>
     <TextInput
     style={styles.input} 
     keyboardType='email-address'
     placeholder={this.state.email === ''? 'email': this.state.email} 
     onChangeText={ text => this.setState({email:text}) }/>
     
  


     <TextInput
     style={styles.input} 
     keyboardType='default'
     placeholder='password'
     secureTextEntry={true}
     onChangeText={ text => this.setState({password:text}) }/> 
    
     {this.props.error !== '' ? 
     this.props.error === 'auth/wrong-password'? <Text style={styles.alerta}>La contraseña es incorrecta</Text> :
     this.props.error === 'auth/user-not-found'? <Text style={styles.alerta}>No hay usuarios registrados con ese mail</Text> :
     this.props.error === 'auth/invalid-email'? <Text style={styles.alerta}>No ingresaste correctamente el formato del mail</Text>:
     this.props.error === 'auth/too-many-requests'? <Text style={styles.alerta}>Demasiados intentos fallidos. Intenta más tarde</Text>
     : null
     : null} 
       
     <TouchableOpacity disabled={this.state.email == '' || this.state.password == ''} style={this.state.email == '' || this.state.password == ''? styles.buttonDisabled :styles.button} onPress={() => this.props.login(this.state.email, this.state.password)}>
         <Text> Log In </Text> 
     </TouchableOpacity> 
     <Text> ¿No tenes cuenta? </Text> 
     <TouchableOpacity style={styles.button}
     onPress={()=> this.registrar()} 
     
     > 
       <Text>Registrarme</Text>
     </TouchableOpacity>
     
</View>
   
  )}
}
 



export default Login; 