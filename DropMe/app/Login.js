import {React,useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView,Pressable,Alert,Image } from 'react-native';
import { TextInput, Button } from "@react-native-material/core";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  
  const [email, setEmail] = useState('')
  const [pasword,setPassword] = useState('')
    const signupNavi = () => {
        navigation.push('Signup')
    }
  const loginNavi = () => {
     axios.post(`https://dropmebackend.herokuapp.com/login/${email}`, { password:pasword })
      .then((data) => {
        
        if (data.data == 'Invalid') {
          Alert.alert(
            "Login Error",
            "Invalid Credeintials "
          )
        } else {
          AsyncStorage.setItem('id',data.data.email)
          if (data.data.role == 'passenger') {
            navigation.push('Tabs')
          } else {
            navigation.push('BusTabs')
          }
            
          }
          
          
        
        
        
      }).catch((err) => {
        console.log(err)
    })
      
    

        //navigation.push('Home')
    console.log("email",email)
    console.log("password",pasword)
    }
  return (
    <SafeAreaView style={styles.container} >
      
      <Image source={require('./DropMe-logos_black.png')}
      style={{ width: 250, height: 250}}/>
          <TextInput
            style={styles.input}
        label="User Name"
        value={email}
      onChangeText={newText => setEmail(newText)}/>
           <TextInput
        style={styles.input}
        secureTextEntry={true}
        value = {pasword}
        label="Password"
      onChangeText={newText => setPassword(newText)}/>
      
          <Button
              style= {styles.login_btn}
              title="Login"
              onPress={loginNavi}
          />
        <Pressable onPress={signupNavi}>
              <Text style={styles.signup_txt}> Do not have an account signup here </Text>
        </Pressable>
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
    margin: 12,
    padding: 10,
    },

login_btn: {
    height: 50,
    width: "90%",
    margin: 12,
    padding: 10,
    },
signup_txt: {
margin:20
}
});