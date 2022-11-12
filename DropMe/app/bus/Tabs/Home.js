import { React, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export const Home = ({navigation}) => {
  const newTrip = () => {
  navigation.push('Scaner')
}

  let id = "";
  const [bus, setBus] = useState("");
  useEffect(() => {
    const getId = async () => {
      id = await AsyncStorage.getItem("id");

      await axios
        .get(`https://dropmebackend.herokuapp.com/bus/${id}`)
        .then((res) => {
          setBus(res.data);
        })
        .catch((err) => console.log(err));
    };
    getId();
  }, []);
  AsyncStorage.setItem("bus", JSON.stringify(bus));
  console.log("bus", bus);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.smartCard}>
        <Text style={styles.smartCardTxt}>Bus Number : {bus.BusNo}</Text>
        <Text style={styles.smartCardTxt}>Route Number : {bus.Route}</Text>
        <Text style={styles.smartCardTxt}>Account Balance : {bus.Balance}</Text>
      </View>
      <View style = {styles.newTripView}>
        <Button style={styles.newTripbtn} title="Start New Trip" onPress={newTrip}/>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor: "#fff",
    alignItems: "center",
  },
  smartCard: {
    flex:1,
    borderRadius: 10,
    backgroundColor: "#3333ff",
    position: 'relative',
    width: "98%",
    height: "40%",
    top: 0,
    shadowColor: "black",
  },
  smartCardTxt: {
    fontSize: 30,
    padding: 10,
    color: "white",
    fontWeight: "bold",
    margin:10
    
  },
  newTripView: {
    flex: 1,
    position: 'relative',
    
    justifyContent: 'center',
    alignItems:'center'
  },
  newTripbtn: {
    fontSize:30,
    width:'90%',
    height:50
  }

});
