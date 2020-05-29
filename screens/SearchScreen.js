import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  FlatList
  /* include other react native components here as needed */
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons, Octicons } from "@expo/vector-icons";

// FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState([]);
  const [searchList, setSearchList] = useState([]);

  // can put more code here

  useEffect(() => {
    fetch("http:131.181.190.87:3001/all", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        setState(responseJson);
      })
      .catch(error => {});
  }, []);

  const handleSearch = value => {
    const newData = state.filter(item => {
      const itemData = item.symbol
        ? item.symbol.toUpperCase()
        : "".toUpperCase();
      const textData = value.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearchList(newData);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.text}>Type a company name or stock symbol</Text>
        <View style={styles.innerContainer}>
          <Octicons name="search" size={25} color="white" />
          <TextInput
            style={styles.textInput}
            placeholder="Type ...."
            onChangeText={handleSearch}
          />
        </View>
        {searchList && (
          <FlatList
          style={{backgroundColor:'#FFF'}}
            data={searchList}
            renderItem={item => {
              return (
                <View>
                <Text style={{ color: "#fff",backgroundColor:"#FFF", fontSize: 20 }}>{item.name}</Text>
                </View>
              );
            }}
          ></FlatList>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    padding: 10,
    backgroundColor: "#333"
  },
  textInput: {
    marginLeft: 10
  }
});
