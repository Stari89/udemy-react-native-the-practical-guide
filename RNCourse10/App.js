import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldPlaySound: true,
            shouldSetBadge: false,
            shouldShowAlert: true,
        };
    },
});

export default function App() {
    useEffect(() => {
        (async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to show notifications has not been granted.');
            }
        })();

        const subscription1 = Notifications.addNotificationResponseReceivedListener((notification) => {
            console.log('NOTIFICATION RECEIVED');
            console.log(notification);
            const userName = notification.notification.request.content.data.userName;
            console.log(userName);
        });

        const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log('NOTIFICATION RESPONSE RECEIVED');
            console.log(response);
            const userName = response.notification.request.content.data.userName;
            console.log(userName);
        });

        return () => {
            subscription1.remove();
            subscription2.remove();
        };
    }, []);

    function scheduleNotificationHandler() {
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'My first local notification',
                body: 'This is the body of the notification.',
                data: {
                    userName: 'DamjanKo',
                },
            },
            trigger: {
                seconds: 5,
            },
        });
    }

    return (
        <View style={styles.container}>
            <Button title="Schedule Notification" onPress={scheduleNotificationHandler} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
