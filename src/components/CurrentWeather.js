import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { isSameDay } from 'date-fns';

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`;

export default function CurrentWeather({data}) {

    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        const getCurrentWeather = data.list.filter(forecast => {
            const today = new Date().getTime() + Math.abs(data.city.timezone * 1000);
            const forecastDate = new Date(forecast.dt * 1000);
            return isSameDay(today, forecastDate);
        });
        setCurrentWeather(getCurrentWeather[0]);
    }, [data]);

    return(
        <View style={styles.container}>
            <Text style={styles.city}>{data?.city?.name}</Text>
            <Text style={styles.today}>Aujourd'hui</Text>
            <Text style={styles.today}>{new Date(currentWeather?.dt * 1000).getHours()}h</Text>

            <Image source={{uri: getIcon(currentWeather?.weather[0].icon)}} style={styles.weatherIcon} />

            <Text style={styles.temp}>{ Math.round(currentWeather?.main.temp) }°C</Text>
            <Text style={styles.description}>{ currentWeather?.weather[0].description }</Text>
        </View>
    );

}

const COLOR = '#54565B';

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        height: '65%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    city: {
        fontSize: 36,
        fontWeight: '500',
        color: COLOR
    },
    today : {
        fontSize: 24,
        fontWeight: '300',
        color: COLOR
    },
    weatherIcon: {
        width: 150,
        height: 150
    },
    temp: {
        fontSize: 80,
        fontWeight: 'bold',
        color: COLOR
    },
    description: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLOR
    }
});