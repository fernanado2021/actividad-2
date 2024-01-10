import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/Config';
import { ref, set, onValue, update } from "firebase/database";

export default function RegistroScreen({ navigation }: any) {
  const [correo, setcorreo] = useState('');
  const [contrasenia, setcontrasenia] = useState('');
  const [nick, setNick] = useState('');
  const [edad, setEdad] = useState('');

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;

        // Guardar información adicional en la base de datos
        const userRef = ref(db, `usuarios/${correo.replace(/\./g, '_')}`); 
        update(userRef, {
          nick: nick,
          edad: edad,
        })


        console.log("REGISTRO CORRECTO");
        // Mostrar una alerta de registro exitoso
        Alert.alert('Registro exitoso', '¡Bienvenido! Has sido registrado correctamente.');
        navigation.navigate('Drawer_Welcome');
        // Limpiar los campos después de un registro exitoso
        setcorreo('');
        setcontrasenia('');
        setNick('');
        setEdad('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);

        switch (errorCode) {
          case 'auth/weak-password':
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            break;
          case 'auth/email-already-in-use':
            Alert.alert('Error', 'El correo electrónico ya está registrado. Por favor, inicia sesión o utiliza otro correo.');
            break;
          default:
            Alert.alert('Error', 'Ocurrió un error durante el registro');
            break;
        }
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingrese email'
        onChangeText={(texto) => setcorreo(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder='Ingrese contraseña'
        onChangeText={(texto) => setcontrasenia(texto)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese un nick"
        onChangeText={(texto) => setNick(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        onChangeText={(texto) => setEdad(texto)}
      />

      <Button title='Registrarse' onPress={() => registro()} />
    </View>
  );
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
});
