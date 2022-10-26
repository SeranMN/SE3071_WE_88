import React from 'react'
import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity } from 'react-native';
import { TextInput, Button } from "@react-native-material/core";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Signup() {
    const signup = () => {
        console.log("Touch")
    }

  return (
      <SafeAreaView style = {styles.container} >
          <TextInput
            style={styles.input}
              label="Name" />
           <TextInput
            style={styles.input}
              label="Email"
              textContentType='password' />
          <TextInput
            style={styles.input}
              label="Nic or Passport Number"
               />
          <TextInput
            style={styles.input}
              label="Password"
              />
          <TextInput
            style={styles.input}
              label="Re-Ener Passeord"
          textContentType='password'/>
          <Button
              style= {styles.login_btn}
              title="Signup"
              onPress={()=>{console.log("press")}}
          />
       
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },

input: {
    height: 60,
    width: "90%",
    margin: 10,
    padding: 5,
    },

login_btn: {
    height: 50,
    width: "90%",
    margin: 25,
    padding: 10,
    },

});