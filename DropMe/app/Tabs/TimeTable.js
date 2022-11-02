import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View,Text,StyleSheet, ScrollView } from 'react-native'

export const TimeTable = ({ route }) => {
    let routNo = route.params.paramKey
    const [times, setTimes] = useState([]);
    useEffect(() => {
        axios.get(`http://192.168.1.3:5000/time/${routNo}`)
            .then((res) => {
            setTimes(res.data)
            })
        .catch((err)=>{console.log(err)})
    })
    return (
      <ScrollView>
      <View style={styles.container}>
                {times.map((time) => (
                <View style ={styles.route}>
                        <Text style={styles.txt}>Arrival: {time.ArrivalTime}</Text>  
                        <Text style={styles.txt}>Depature: {time.Depaturetime}</Text>  
                        <Text style={styles.txt}>Bus{ time.ArrivalTime}</Text>  
              </View>
          ))}
        </View>
     </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  route: {
    
      flexGrow:100,
    
        padding: 10,
        borderBottomWidth:2,
        borderBottomColor:'blue',
        width: '98%',
        height:100,
      marginTop: 10,
        marginBottom:10,
        bottom:5,
        borderRadius: 4,
        shadowOpacity: 0.25,
        shadowRadius: 3.5,    
  },
  txt: {
    fontSize:20
  }
});
