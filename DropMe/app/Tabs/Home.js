import {React,useState,useEffect} from 'react'
import { Text, View,StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import QRCode from 'react-native-qrcode-svg'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const Home = () => {
  let id = '';
  const [user, setUser] = useState([])

  
  
  useEffect( async () => {
    id = await AsyncStorage.getItem('id');
    console.log("id",id) 
   axios.get(`http://192.168.1.3:5000/user/${id}`)
      .then((res) => {
        setUser(res.data)
        
      }).catch((err) => console.log(err))
    
},[])
console.log("user",user)
  return (
      <SafeAreaView style={styles.container} >
      <View style = {styles.smartCard}>
        <Text style= {styles.smartCardTxt}>
          Account Balance
        </Text>
        <Text style= {styles.smartCardTxt}>
         RS. {user.AccBalance} 
        </Text>
      </View>
      <View style ={styles.qrView}>
        <QRCode
      value={user.NIC}
      size = {200}
        />
       
        <Text style ={{alignItems:'center',alignContent:'center'}} >
        {user.Name}
        </Text>
      </View>
       
        
    
      
      </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  smartCard: {
    flex:1,
    borderRadius:10,
    backgroundColor:'#3333ff',
    position: 'absolute',
    width: '90%',
    height: '30%',
    top: 50,
    shadowColor:'black'
    
  },
  smartCardTxt: {
    fontSize: 30,
    padding: 10,
    color: 'white',
    fontWeight: 'bold'
    
  },
  qrView: {
    flex: 1,
   
    position: 'relative',
    top: 250,
    alignItems: 'center',
    alignContent: 'center'
  }

});
