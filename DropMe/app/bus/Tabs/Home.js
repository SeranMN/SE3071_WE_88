import {React,useEffect,useState} from 'react'
import { Text, View,StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
export const Home = () => {
  let id = '';
  const [bus, setBus] = useState('');
  useEffect( async () => {
    id = await AsyncStorage.getItem('id');
    
 await  axios.get(`http://192.168.1.3:5000/bus/${id}`)
      .then((res) => {
        setBus(res.data)  
      }).catch((err) => console.log(err))
    
  }, [])
  AsyncStorage.setItem('bus', JSON.stringify(bus));
  console.log('bus',bus)
  return (
    
      <SafeAreaView style={styles.container} >
      <View style = {styles.smartCard}>
        <Text style= {styles.smartCardTxt}>
          Bus Number : {bus.BusNo}
        </Text>
     </View>
      </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  smartCard: {
    borderRadius:10,
    backgroundColor:'#3333ff',
    position: 'absolute',
    width: '90%',
    height: '30%',
    top: 70,
    shadowColor:'black'
    
  },
  smartCardTxt: {
    fontSize: 30,
    padding: 10,
    color: 'white',
    fontWeight:'bold'
  }
});
