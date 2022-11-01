import { Button } from '@react-native-material/core';
import React from 'react'
import { Text, View,StyleSheet } from 'react-native'

const Account = (navigation) => {
  return (
    <>
    <View style = {styles.History}>
     
    </View>
    <View style={styles.container}>
          <Button style={{justifyContent:'center'}} title ="Logout"/>
           
          
      </View>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  History: {
    width: '90%',
    height:'20%',
    borderBottomColor: 'black',
    flex: 1,
    position: 'absolute',
    top:100
  }
});

export default Account