import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import UserAvatar from 'react-native-user-avatar'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
export const Account = ({ navigation }) => {
  
  const [user, setUser] = useState('');
  const logout = async() => {
    await AsyncStorage.removeItem('id')
    navigation.push('Login')
  }

  useEffect(() => {
    
    const getUser = async () => {
    let  use = await AsyncStorage.getItem('user')
      setUser(JSON.parse(use))
    } 
    getUser()
    
  },[])
  
  return (
    <View style={styles.container}>
      <View style ={styles.name}>
      <UserAvatar size={100} name={user.Name} />
        <Text style={{ fontSize: 30 }}> {user.Name}</Text>
      </View>
      <View style = {styles.passengerInfo} >
      <View style = {styles.contactNo}>
        <AntDesign name="phone" size={24} color="black" />
        <Text style={{ fontSize: 20 }}> {user.ContactNo}</Text>
        </View>
        <View style = {styles.contactNo}>
        <Entypo name="email" size={24} color="black" />
        <Text style={{ fontSize: 20 }}> {user.Email}</Text>
        </View>
        <View style = {styles.contactNo}>
        <MaterialIcons name="supervisor-account" size={24} color="black" />
        <Text style={{ fontSize: 20 }}> {user.type}</Text>
        </View>
        
        <Button style={styles.logout} title ="Logout" onPress={logout}/>
        </View>
          
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    top:10
    
  },
  name: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems:'baseline',
    height: 25,
    width:'98%'
  },
  logout: {
    
    position: 'relative',
    top: 900,
    
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
  },
  passengerInfo: {
    top:100,
    justifyContent: 'center',
    alignItems:'center'
  },
  contactNo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop:10
  }

});