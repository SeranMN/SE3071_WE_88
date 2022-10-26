import React from 'react'
import { StyleSheet, Text, View, SafeAreaView,Pressable } from 'react-native';
import { TextInput,Button } from "@react-native-material/core";

export default function Login({navigation}){
    const signupNavi = () => {
        navigation.push('Signup')
    }
    const loginNavi = () => {
        navigation.push('Home')
    }
  return (
      <SafeAreaView style = {styles.container} >
          <TextInput
            style={styles.input}
              label="User Name" />
           <TextInput
            style={styles.input}
              label="Password" />
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