import React , {useState, useRef, useEffect} from 'react'
import {View, Text, StyleSheet, Button, Alert} from 'react-native'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'

const GameScreen = props => {
    const generateNumBetween = (min, max, exclude) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        const rndNum = Math.floor(Math.random() * (max - min)) + min 
        if (rndNum == exclude) { 
            return generateNumBetween(min, max, exclude)
        } else {
            return rndNum
        }
    }
    const [rounds, setRounds] = useState(0)
    const [currentGuess, setCurrentGuess] = useState(generateNumBetween(1, 100, props.userChoice))
    const currentHigh = useRef(100)
    const currentLow = useRef(1)

    const {userChoice, onGameOver} = props
    useEffect(() => {
        if (currentGuess == props.userChoice) {
            props.onGameOver(rounds)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if(
            (direction === 'LOWER' && currentGuess < props.userChoice) || 
            (direction === 'HIGHER' && currentGuess > props.userChoice)
        ) {
            Alert.alert('Don\'t Lie!', 'You Know This is Wrong...', [{text: 'SORRY', style: 'cancel' }])
            return;
        }
        if( direction === 'LOWER') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess
        }
        const nextNumber = generateNumBetween(currentLow.current, currentHigh.current, currentGuess )
        setCurrentGuess(nextNumber)
        setRounds(currRounds => currRounds + 1)
    }
    return (
        <View style={styles.screen}>
            <Text>Opponents Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
                <Card style={styles.buttonContainer}>
                    <Button title='LOWER' onPress={nextGuessHandler.bind(this, 'LOWER')} />
                    <Button title='HIGHER' onPress={nextGuessHandler.bind(this, 'HIGHER')} /> 
                </Card>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})

export default GameScreen
