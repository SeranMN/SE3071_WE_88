import { React, useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@react-native-material/core";

export const Home = () => {
  let id = "";
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getId = async () => {
      id = await AsyncStorage.getItem("id");
      axios
        .get(`https://dropmebackend.herokuapp.com/user/${id}`)
        .then((res) => {
          setUser(res.data);
          AsyncStorage.setItem('user',JSON.stringify(res.data))
        })
        .catch((err) => console.log(err));
    };

    getId();
  }, []);
  console.log("user", user);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.smartCard}>
        <Text style={styles.smartCardTxt}>Account Balance</Text>
        <Text style={styles.smartCardTxt}>LKR. {user.AccBalance}</Text>
        <Button style={styles.topupbtn} title = 'Top-up'/>
      </View>
      <View style={styles.qrView}>
        <QRCode value={user.NIC} size={150} />

        <Text style={{ alignItems: "center", alignContent: "center" }}>
          {user.Name}
        </Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  smartCard: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#3333ff",
    position: "absolute",
    width: "99%",
    height: "40%",
    top: 10,
    shadowColor: "black",
  },
  smartCardTxt: {
    fontSize: 30,
    padding: 10,
    color: "white",
    fontWeight: "bold",
  },
  qrView: {
    flex: 1,

    flexGrow: 25,
    position: "relative",
    top: 250,
  },
  dash: {
    flex: 1,
    flexGrow: 25,
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    height: "25%",
    width: 45,
  },
  topupbtn: {
    top: 80,
    width:"50%",
    left: 100,
    color:'green'
  }
});
