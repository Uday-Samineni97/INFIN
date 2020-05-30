import React, { useState, useContext, useEffect } from "react";
import { AsyncStorage } from "react-native";

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);

  return (
    <StocksContext.Provider value={[state, setState]}>
      {children}
    </StocksContext.Provider>
  );
};

export const useStocksContext = () => {
  const [state, setState] = useContext(StocksContext);

  // can put more code here

  function addToWatchlist(newSymbol) {
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
    let oldState = state || []
    oldState.push(newSymbol)
    setState(oldState)
    AsyncStorage.setItem('watchList', JSON.stringify(oldState))
  }

  useEffect(async () => {
   let persistedState = await AsyncStorage.getItem('watchList')
   if(JSON.parse(persistedState) !== state) {
     setState(JSON.parse(persistedState))
   }
  }, []);

  return { ServerURL: 'http:131.181.190.87:3001', watchList: state,  addToWatchlist };
};
