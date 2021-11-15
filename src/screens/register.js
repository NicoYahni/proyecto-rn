import React, {Component} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { auth } from '../firebase/config'
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
  }
  ,
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
class Register extends Component {
  constructor(props){
    super(props),
    this.state={
      email: '',
      userName: '',
      password:''
    
    } }
 
    
  onSubmit(){
    console.log(`El mail ingresado es: ${this.state.email}`);
    console.log(`El usuario ingresado es: ${this.state.userName}`);
    console.log(`La contraseña ingresado es: ${this.state.password}`);

  }
 
  login(){
    this.props.drawerProps.navigation.navigate('Login')
  }


 render(){
   return(
     
    <View style={styles.formContainer}>
              <Text>Register</Text>
               <TextInput 
                style={styles.input} 
               keyboardType='email-address'
               placeholder='email'
               onChangeText={ text => this.setState({email:text}) }/>
               
               {/* <TextInput
               style={styles.input} 
               keyboardType='default'
               placeholder='user name'
               onChangeText={ text => this.setState({userName:text}) }/>  */}


               <TextInput
                style={styles.input} 
               keyboardType='default'
               placeholder='password'
               secureTextEntry={true} 
               onChangeText={ text => this.setState({password:text}) }/> 


                {this.props.error !== '' ? 
                  this.props.error === 'auth/weak-password'? <Text style={styles.alerta}>La contraseña debe tener al menos 6 caracteres</Text> :
                  this.props.error === 'auth/email-already-in-use'? <Text style={styles.alerta}>Ya existe un usuario registrado con ese mail</Text> :
                  this.props.error === 'auth/invalid-email'? <Text style={styles.alerta}>No ingresaste correctamente el formato del mail</Text>
                 
                  : <Text>{this.props.error} </Text>
                  : null} 

               <TouchableOpacity disabled={this.state.email == '' || this.state.password == ''} style={this.state.email == '' || this.state.password == ''? styles.buttonDisabled :styles.button}onPress={() => this.props.register(this.state.email,  this.state.password)}>
                   <Text> Register </Text> 
               </TouchableOpacity> 
               <Text> ¿Ya tenes cuenta?</Text> 
     <TouchableOpacity style={styles.button}
     onPress={()=> this.login()} 
     
     > 
       <Text>Log In</Text>
     </TouchableOpacity>
               
  </View>
   
  )}
}
 



export default Register; 