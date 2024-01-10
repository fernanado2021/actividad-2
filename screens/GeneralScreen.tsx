import { Alert, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/Config';

export default function GeneralScreen() {
  const [imagen, setImagen] = useState(' ');

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'camara/' + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg',
      });

      console.log('La imagen se subió con éxito');
      Alert.alert('Mensaje', 'La imagen se subió con éxito');

      const imageURL = await getDownloadURL(storageRef);
      console.log('URL de descarga de la imagen', imageURL);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir una foto desde la cámara</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
        <Text style={styles.buttonText}>Abrir Cámara</Text>
      </TouchableOpacity>
      
      <Image source={{ uri: imagen }} style={styles.img} />

      <TouchableOpacity style={styles.button} onPress={() => subirImagen('imagen')}>
        <Text style={styles.buttonText}>Subir Imagen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  img: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
