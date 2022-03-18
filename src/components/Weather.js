import React from 'react'
import { Image, View, Text, StyleSheet } from 'react-native';

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`;

export default function Weather({forecast}) {
  return (
    <View style={styles.container}>
        <Text>{forecast.hour}h</Text>
        <Image style={styles.image} source={{ uri: getIcon(forecast.icon) }} />
        <Text style={styles.temp}>{forecast.temp}°C</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 140,
        width: 75,
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 50
    },
    image: {
        width: 50,
        height: 50
    },
    temp: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
