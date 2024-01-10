import { Button, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

//FIREBASE
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';


export default function LoginScreen({ navigation }: any) {

  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log(user);
        navigation.navigate("Drawer_Welcome")
        // Limpiar los campos después de un inicio de sesión exitoso
        setcorreo('');
        setcontrasenia('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)

        switch (errorCode) {
          case "auth/invalid-credential":
            Alert.alert("Error", "Credenciales incorrectas");
            break;

          case "auth/missing-password":
            Alert.alert("Error", "Ingrese su contraseña");
            break;

          default:
            Alert.alert("Error", "Ingrese sus credenciales");
            break;
        }

      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>      
      
      <TextInput
        style={styles.input}
        placeholder=' Ingresar email'
        keyboardType='email-address'
        onChangeText={(texto: any) => setcorreo(texto)}
        value={correo}
      />

      <TextInput
        style={styles.input}
        placeholder=" Ingresar contraseña"
        onChangeText={(texto: any) => setcontrasenia(texto)}
        value={contrasenia}
      />

      <Button title='Ingresar'  onPress={() => login()} />

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerText}>👉 Regístrate aquí 👈</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  registerText: {
    marginTop: 20,
    color: 'blue',
    fontSize: 16,
  }
})