import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native'

export const StockItem = ({ data, symbol, ServerURL, selected, onPress }) => {
	const [state, setState] = useState({})

	useEffect(() => {
		fetch(ServerURL+"/history?symbol="+symbol, {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
		setState({...responseJson[0], percent: ((responseJson[0].close/responseJson[0].open)*100)-100})
        // setState({ ...state, [symbol]: responseJson});
      })
      .catch(error => {
        console.log('error in stock screen', error)
      });
	}, [symbol])

	return (
		<TouchableOpacity style={{ backgroundColor: (selected) ? '#333' : 'transparent' }} onPress={() => onPress({ ...state, symbol })} >
			<View style={styles.outerContainer} >
				<View style={styles.nameContainer} >
					<Text style={styles.text} >{symbol}</Text>
				</View>

				<View style={styles.valueContainer} >
					{
						(state.close)
						?
						<Text style={[styles.text, styles.textRight]} >{state.close}</Text>
						:
						<ActivityIndicator size="small" color="#FFF"/>
					}
				</View>

				<View style={[styles.percentContainer, { backgroundColor: (state.percent) ? (state.percent > 0) ? 'green' : 'red' : 'black' }]} >
					{
						(state.percent)
						?
						<Text style={[styles.text, styles.textRight]} >{state.percent?state.percent.toFixed(2):'=|='}</Text>
						:
						<ActivityIndicator size="small" color="#FFF"/>
					}
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles=StyleSheet.create({
	outerContainer: {
		display: 'flex',
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#D3D3D3',
		alignItems: 'center'
	},

	nameContainer: {
		padding: 20,
		flex: 2
	},

	valueContainer: {
		padding: 20,
		flex: 1,
	},

	percentContainer: {
		margin: 10,
		borderRadius: 10,
		padding: 5,
		flex: 1,
		alignItems: 'flex-end'
	},

	text: {
		color: '#FFF',
		fontSize: 24
	},

	rightAlign: {
		textAlign: 'right'
	}
})