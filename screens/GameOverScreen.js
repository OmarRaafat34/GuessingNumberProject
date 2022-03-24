import React , {useState} from 'react'
import {View, Text, StyleSheet, Alert, Button} from 'react-native'
import { AppLoading } from 'expo'


const GameOverScreen = props => {
   
    return (
        <View style={styles.screen}>
            <Text>THE GAME IS OVER!</Text>
            <Text>Number of rounds: {props.roundsNumber}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button style = {styles.buttonContainer}title="NEW GAME" onPress={props.onRestart}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        paddingTop: 20
    }
   
})

export default GameOverScreen