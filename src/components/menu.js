import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Home from '../screens/home'
import Buscador from '../screens/buscador'
import MiPerfil from '../screens/miPerfil'
import Login from '../screens/login'
import Register from '../screens/register'
import FormularioPost from '../screens/formularioPost'
import { auth } from '../firebase/config'

const Drawer = createDrawerNavigator();

class Menu extends Component{
  constructor(props){
    super(props);
    this.state= {
      valor: 0,
      errorLogin:' ',
      errorRegister:' ',
      loggedIn: false,
      userData:{}
  
    
    }

  
    
  } 
  
  componentDidMount(){
    auth.onAuthStateChanged(
      user=>{
        if(user){
          console.log(user);
           this.setState({
        loggedIn: true,
        userData: user
        })
        
        }
       
        
      }
      
    )
  }
  login(email, pass){
    auth.signInWithEmailAndPassword(email,pass)
    .then((response) => {
      this.setState({
        loggedIn: true,
        // userData: response
      })
      console.log('me loguie');
      console.log(this.state.userData);
      // console.log(this.state.userData.user.email);
      // console.log(this.state.userData.user.metadata.lastSignInTime);
      // console.log(this.state.userData.user.metadata.creationTime);
      
    })
    .catch(error => {
      this.setState({errorLogin : error.code})
      console.log(this.state.errorLogin);
      
     

    })
    }

    logOut(){
      auth.signOut()
      .then((response) => {
        this.setState({
          loggedIn: false,
          userData: {}
        })
        console.log('hice log out');
       
      })
      .catch(error => {
        // this.setState({errorLogin : error.code})
        console.log('error al hacer log out');
        
       
  
      })
      }
  register(email, pass){
    //https://stackoverflow.com/questions/43509021/how-to-add-username-with-email-and-password-in-firebase
      auth.createUserWithEmailAndPassword(email,pass)
      .then((response) => {
        this.setState({
          loggedIn: true,
          userData: response
        })
        console.log('me registre ok');
        console.log(this.state.userData);
        console.log(this.state.userData.user.email);
        console.log(this.state.userData.user.metadata.lastSignInTime);
        console.log(this.state.userData.user.metadata.creationTime);
       

      })
      .catch(error => {
        this.setState({errorRegister : error.code})
        console.log(error.code);
        
      })
      }

      // guardarInfo(userData){
      //   this.setState({

      //   })
      // }
render(){
  return(
    
    <NavigationContainer>
    {this.state.loggedIn ? 
    
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={()=>
      <Home />}/>
      <Drawer.Screen name="Buscador" component={()=>
      <Buscador />}/>
      <Drawer.Screen name="Nuevo Post" component={(drawerProps)=>
      <FormularioPost drawerProps = {drawerProps}/>}/>
      <Drawer.Screen name="Mi Perfil" component={()=>
      <MiPerfil userData={this.state.userData} logOut={()=> this.logOut()}/>}/>
      
      
      
    </Drawer.Navigator> 
     : 
    
    <Drawer.Navigator>
      
      <Drawer.Screen name="Login" component={(drawerProps)=>
      <Login drawerProps={drawerProps} error= {this.state.errorLogin} login={(email, pass)=> this.login(email, pass)}/>}/>
      <Drawer.Screen name="Register" component={(drawerProps)=>
      <Register drawerProps={drawerProps} error= {this.state.errorRegister} register={(email, pass)=>this.register(email, pass)}/>}/>
      



     
    </Drawer.Navigator> 
     }

   


    </NavigationContainer>
  

    
  
)
}


}
export default Menu;

