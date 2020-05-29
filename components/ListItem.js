import * as React from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";

export const ListItem = props => {
  return (
    <TouchableHighlight style={styles.wrapper} onPress={props.onPress}>
        <View>
      <View style={styles.symbolRow}>
        <Text style={styles.text}>{props.symbol}</Text>
        <Text style={styles.industry}>{props.industry}</Text>
      </View>
      <Text style={styles.text}>{props.name}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
    color: "#fff"
  },
  symbolRow: {
    flexDirection: "row"
  },
  industry: {
    color: "#fff",
    marginLeft: 10
  },
  text: {
    color: "#fff"
  }
});
