import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Text, View, StyleSheet, Button, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons';

export const Account = ({navigation}) => {
  const logout = async() => {
    await AsyncStorage.removeItem('id')
    navigation.push('Login')
  }
  const history = () => {
   navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={history}>
        <View style={styles.History}>
          <Entypo name="back-in-time" size={24} color="black" />
        <Text style={styles.Hiistorytxt}>
          
          History</Text>
        </View>
        </Pressable>
          <Button style={styles.logout} title ="Logout" onPress={logout}/>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  logout: {
    flex:0.2,
    position: 'absolute',
    top:100
  },
  History: {
    width: '90%',
    height:'2%',
    borderBottomColor: 'black',
    flex: 0.2,
    flexDirection:'row',
    position: 'relative',
    top:20
    
  },
  Hiistorytxt: {
    fontSize: 20,
    paddingLeft:30
  }
});