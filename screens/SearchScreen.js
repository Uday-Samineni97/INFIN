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
import { ListItem } from "../components/ListItem";
// FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [showList, setShowList] = useState(false);

  // can put more code here

  useEffect(() => {
    fetch(ServerURL+"/all", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        setState(responseJson);
      })
      .catch(error => {});
  }, []);

  const handleSearch = value => {
    if (value.length === 0) {
      setShowList(false);
    } else {
      setShowList(true);
      const filteredData = state.filter(item => {
        const symbol = item.symbol
          ? item.symbol.toUpperCase()
          : "".toUpperCase();
        const name = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const searchData = value.toUpperCase();
        return symbol.indexOf(searchData) > -1 || name.indexOf(searchData) > -1;
      });
      setSearchList(filteredData);
    }
  };
const handleStock=(value)=>{
  addToWatchlist(value)
  navigation.navigate("Stocks", { symbol: value })
}
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
        {showList && (
          <FlatList
            data={searchList}
            renderItem={({ item }) => {
              return <ListItem name={item.name} symbol={item.symbol} industry={item.industry} onPress={()=>handleStock(item.symbol)} />;
            }}
          />
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
    marginLeft: 10,
    color: "#FFF",
    width: "100%"
  }
});
