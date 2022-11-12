import AsyncStorage from '@react-native-async-storage/async-storage'
import { Flex } from '@react-native-material/core'
import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { View,Text,StyleSheet,ScrollView } from 'react-native'

export const History = () => {
    let id = ''
   
    const [trips, setTrip] = useState([])
    
    
    useEffect(async() => {
        id = await AsyncStorage.getItem('id')
        const getHistory = async () => {
             axios.get(`https://dropmebackend.herokuapp.com/trip/${id}`)
            .then((res) => {
                setTrip(res.data)
               console.log(trips)
        }).catch((err)=>{console.log(err)})
        }
       getHistory()
    },[])
    return (
        <ScrollView style={styles.container}>
            <View style={{alignItems:'center'}} >
            {trips.map((trip) => (
                <View style={styles.History}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20,marginLeft:100 }}>Route: {trip.Route}</Text>
                    <Text style = {styles.tripTxt}>{trip.Date}</Text>
                    <Text style = {styles.tripTxt}>{trip.Cost }</Text>
                </View>

            ))}
                </View>
            </ScrollView>
      
  )
}

const styles = StyleSheet.create({
    container: {
        
    backgroundColor: '#fff',
        
        top: 10,
        bottom:10
    }, 
    History: {
        flex: 1,
        padding: 5,
        borderBottomWidth:2,
        borderBottomColor:'blue',
        width: '98%',
        height:100,
        marginTop: 10,
        bottom:5,
        borderRadius: 4,
        shadowOpacity: 0.25,
        shadowRadius: 3.5,    
    },
    tripTxt: {
        marginLeft:100,
    }
})
