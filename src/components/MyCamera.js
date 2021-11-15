import React , {Component} from 'react'
import {Text, ReactFragment, TouchableOpacity, View, TextInput, StyleSheet, Modal, Image, FlatList } from 'react-native';
import {Camera} from 'expo-camera'
import {db, storage} from '../firebase/config'

class MyCamera extends Component {
  constructor(props){
    super(props),
    this.state={
      permission: false,
      photo:'',
     
    } 
  this.camera
  }

  componentDidMount(){
    Camera.requestCameraPermissionsAsync()
    .then(()=>{
      this.setState({
        permission : true
      }
      )
    })
    .catch(error => console.log(error))
  }

  takePicture(){
    console.log('saca foto');
    this.camera.takePictureAsync()
    .then(photo => {
      this.setState({
        photo: photo.uri,
      })
    })
  }

  rechazar(){
    this.setState({
      photo: ''
    })
  }

  savePhoto(){
    fetch(this.state.photo)
    .then( res => res.blob())
    .then( image => {
      const ref = storage.ref(`photos/${Date.now()}.jpg`)
      ref.put(image)
      .then(()=> {
        ref.getDownloadURL()
        .then(url => {
          this.props.onImageUpload(url)
          this.setState({
            photo : ''
          })
        }
        )
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
      // Guardar imagen en el storage
      // Darle un nombre a la imagen ya que estaba guardada con url temporal
      // Subirla al sotrage
      // tomar url publica y pasarla al form de carga de posteo
    })
    .catch(error => console.log(error))


  }

    render(){
      return(
        <React.Fragment>

          {
            this.state.permission ?

            this.state.photo ?
             <React.Fragment>
               <Image
               style={styles.preview}
               source = {{uri : this.state.photo}} 
               />
               <View style={styles.actionArea} >
               <TouchableOpacity onPress={()=>this.savePhoto()}>
                 <Text>Aceptar</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=> this.rechazar()} >
                 <Text>Rechazar</Text>
               </TouchableOpacity>
               </View>
             </React.Fragment> 
            :

            <React.Fragment>
            <Camera 
            style={styles.cameraBody}
            type={Camera.Constants.Type.back}
            ref={reference => this.camera = reference}
            />
            <TouchableOpacity
            style={styles.button} onPress={()=>this.takePicture()}>
              <Text>sacar foto</Text>
            </TouchableOpacity>
            </React.Fragment>
            :
            <Text>no hay permiso para usar la camara</Text>
            
            
          }
        </React.Fragment>
      )
    }





  }

  const styles = StyleSheet.create({

    cameraBody:{
      flex: 7
    },
    button:{
      flex:1
    },
    preview:{
      flex: 7
    },
    actionArea:{
      flex:2
    }
  })
  export default MyCamera