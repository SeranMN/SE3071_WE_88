import { React, useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import SweetAlert2 from 'react-sweetalert2';
import * as Speach from  'expo-speech'
export const Scaner = ({ navigation }) => {

 
  let bus = "";
  const [pasenger, setPassenger] = useState('');
  const [balance,setBalane] =useState()
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [Bus, setBus] = useState({});
let busJSO = ''
  useEffect(() => {
    const getId = async() => {
      bus = await AsyncStorage.getItem("bus");
      console.log(bus)
      setBus(JSON.parse(bus))
    }
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    getId()
  }, []);
  console.log("Bus",Bus)
  const handleBarCodeScanned = ({ type, data }) => {

     
    setScanned(true);
   



   axios.get(`http://192.168.1.3:5000/user/${data}`).then(async (res) => {
    await  setPassenger(res.data);
     
      

    
     
     axios.get(`http://192.168.1.3:5000/bus/${busJSO.BusNo}`)
       .then(async(res) => { await setBalane(res.data)
      console.log(res.data) } 
     )
     if (parseFloat(Bus.Price) < parseFloat(res.data.AccBalance)) {
        Speach.speak('Payment Sucessfull')
       
        let AcUpdate = parseFloat(res.data.AccBalance) - parseFloat(Bus.Price);
      let  Balance =  (parseFloat(busJSO.Price) + parseFloat(balance.Balance) )

        console.log(balance.Balance)
        const pid = res.data.NIC;

        console.log(pid);
        updateAccount(pid, AcUpdate);
        addTrip(pid);
        busBalance(Balance);
        
       
      } else {
        Speach.speak('Payment Denied')
        alert("Low Account Balance");
      }
    });
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const updateAccount = (pid, price) => {
    console.log(pid);
    axios
      .put(`http://192.168.1.3:5000/user/Acc/${pid}`, { AccBalance: price })
      .then(() => {
        console.log("sucess");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addTrip = (pid) => {
    
    const trip = {
      BusNo: Bus.BusNo,
      Route: Bus.Route,
      NIC: pid,
      Cost: Bus.Price,
      Date: new Date()
    }
    axios.post("http://192.168.1.3:5000/trip/add", trip)
      .then(() => console.log('sucess'))
      .catch((err)=> console.log(err));
  };

  const busBalance = (balance) => {
    axios.put(`http://192.168.1.3:5000/bus/balance/${busJSO.BusNo}`, { Balance: balance })
      .then(() => console.log('sucess'))
      .catch((err) => { console.log(err) });
  }

  return (
    <>
    <View style={style.container}>
      <Text>Ticket Issue</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
        )}
        </View>
      <View style={style.trip}>
      <Text style = {style.text}>Bus Number: {Bus.BusNo} </Text>
        <Text style = {style.text}>Trip ID: </Text>
      </View>
      
      </>

  );
};

const style = StyleSheet.create({
  container: {
    flex:1,
    marginLeft: 10,
    position: "relative",
    top: 50,
    width: "95%",
    height: "50%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  trip: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize:20
  }
});
