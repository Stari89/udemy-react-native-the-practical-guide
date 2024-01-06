import { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

SplashScreen.preventAutoHideAsync()
    .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
    .catch(console.warn);

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0);

    const [fontsLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    // Watch for fonts to be loaded, then hide the splash screen
    useEffect(() => {
        async function hideSplashScreen() {
            await SplashScreen.hideAsync();
        }
        if (fontsLoaded) {
            hideSplashScreen();
        }
    }, [fontsLoaded]);
    // Initally return null instead of <AppLoading />
    if (!fontsLoaded) {
        return null;
    }

    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    }

    function gameOverHandler(numberOfRounds) {
        setGameIsOver(true);
        setGuessRounds(numberOfRounds);
    }

    function startNewGameHandler() {
        setUserNumber(null);
        setGuessRounds(0);
    }

    let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

    if (userNumber) {
        screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
    }

    if (gameIsOver && userNumber) {
        screen = (
            <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
        );
    }

    return (
        <>
            <StatusBar style="light" />
            <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
                <ImageBackground
                    style={styles.rootScreen}
                    resizeMode="cover"
                    source={require('./assets/images/background.png')}
                    imageStyle={styles.backgroundImage}
                >
                    <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
                </ImageBackground>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
});
