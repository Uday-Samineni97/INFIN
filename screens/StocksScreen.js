import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView /* include other react-native components here as needed */ } from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import { StockItem } from '../components/StockItem'


// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)







export default function StocksScreen({route}) {
  const { ServerURL, watchList } = useStocksContext();
  const [state, setState] = useState({});

  // can put more code here

  const onStockSelect = (selectedSymbol) => {
    setState(selectedSymbol)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} >
        { 
          [...new Set(watchList)].map(symbol => <StockItem data={state[symbol]} symbol={symbol} ServerURL={ServerURL} onPress={onStockSelect} selected={symbol === state.symbol} />)
        }
      </ScrollView>
      {
        (state.name)
        ?
        <View style={styles.bottomContainer} >
          <View style={styles.bottomTitle} >
            <Text style={[ styles.bottomText, styles.titleText ]} >{state.name}</Text>
          </View>
          <View style={styles.bottomContent} >
            <View style={styles.section} >
              <Text style={styles.bottomText} >Open: {state.open}</Text>
              <Text style={styles.bottomText} >Close: {state.close}</Text>
              <Text style={styles.bottomText} >Volume: {state.volumes}</Text>
            </View>
            <View style={styles.section} >
              <Text style={styles.bottomText} >Low: {state.low}</Text>
              <Text style={styles.bottomText} >High: {state.high}</Text>
              <Text style={styles.bottomText} >{undefined} </Text>
            </View>
          </View>
        </View>
        :
        null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  // FixMe: add styles here ...
  // use scaleSize(x) to adjust sizes for small/large screens

  container: {
    flex: 1
  },

  scrollContainer: {
    flex: 1
  },

  bottomContainer: {
    backgroundColor: '#777',
  },

  bottomTitle: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },

  titleText: {
    fontSize: 18,
  },

  bottomText: {
    padding: 5,
    color: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },

  bottomContent: {
    flexDirection: 'row',
  },

  section: {
    flex: 1
  }
});