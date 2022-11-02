import React, { useEffect, useState } from 'react'
import { Text, View,StyleSheet, ScrollView, TouchableHighlight, Pressable } from 'react-native'
import axios from 'axios'
export const Activity = ({navigation}) => {

  const navigateTime = (route) => {
    navigation.navigate('Time Table',{
  paramKey: route,
})
  }
  const[routes,setRoute] = useState([])
  useEffect(() => {
    axios.get('http://192.168.1.3:5000/route/')
      .then((res) => {
      setRoute(res.data)
    })
  })
  return (
      <ScrollView >
      <View style={styles.container}>
        {routes.map((route) => (
          <TouchableHighlight style={styles.route} onPress={() => { navigateTime(route.routeNo) }}>
          < >
            <Text style= {styles.txt}>Route {route.routeNo} - </Text>
            <Text style= {styles.txt}> {route.Town1} to </Text>
            <Text style= {styles.txt}>{route.Town2}</Text>
            </>
            </TouchableHighlight>
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
    flex: 1,
    flexDirection:'row',
        padding: 10,
        borderBottomWidth:2,
        borderBottomColor:'blue',
        width: '98%',
        height:80,
        marginTop: 10,
        bottom:5,
        borderRadius: 4,
        shadowOpacity: 0.25,
        shadowRadius: 3.5,    
  },
  txt: {
    fontSize:20
  }
});