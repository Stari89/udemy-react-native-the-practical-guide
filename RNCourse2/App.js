import { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
    const [userNumber, setUserNumber] = useState();

    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber);
    }

    let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

    if (userNumber) {
        screen = <GameScreen />;
    }

    return (
        <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.rootScreen}>
            <ImageBackground
                style={styles.rootScreen}
                resizeMode="cover"
                source={require('./assets/images/background.png')}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
            </ImageBackground>
        </LinearGradient>
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
