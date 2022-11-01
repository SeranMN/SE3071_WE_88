import { React, useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SweetAlert from "react-native-sweet-alert";
import * as Speach from  'expo-speech'
export const Scaner = ({ navigation }) => {

 

  let bus = "";
  const [pasenger, setPassenger] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
let busJSO = ''
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
   axios.get(`http://192.168.1.3:5000/user/${data}`).then(async (res) => {
    await  setPassenger(res.data);
      bus = await AsyncStorage.getItem("bus");

      busJSO = JSON.parse(bus);

      if (parseFloat(busJSO.Price) < parseFloat(res.data.AccBalance)) {
        let AcUpdate =
          parseFloat(res.data.AccBalance) - parseFloat(busJSO.Price);
        const pid = res.data.NIC;

        console.log(pid);
        updateAccount(pid, AcUpdate);
        addTrip(pid)
        Speach.speak('Payment Sucessfull')
        alert("Payment Sucessfull");
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
      BusNo: busJSO.BusNo,
      Route: "177",
      NIC: pid,
      Cost: busJSO.Price,
      Date: new Date()
    }
    axios.post("http://192.168.1.3:5000/trip/add", trip)
      .then(() => console.log('sucess'))
      .catch((err)=> console.log(err));
  };

  return (
    <View style={style.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    margin: 10,
    position: "absolute",
    top: 100,
    width: "90%",
    height: "60%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
