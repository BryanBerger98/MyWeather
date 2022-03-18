import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Weather from './Weather';

export default function Forecasts({data}) {

    const [forecasts, setForecasts] = useState([]);
    const [forecastsDays, setForecastsDays] = useState([]);

    useEffect(() => {
        const forecastsData = data.list.map(f => {
            const dt = new Date(f.dt * 1000);
            return ({
                date: dt,
                hour: dt.getHours(),
                temp: Math.round(f.main.temp),
                icon: f.weather[0].icon,
                name: format(dt, 'EEEE', { locale: fr })
            });
        });
        setForecasts(forecastsData);
        setForecastsDays([...new Set(forecastsData.map(el => el.name))]);
    }, [data]);

  return (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
        {forecastsDays.map((day, index) => (
            <View key={index.toString()} style={{flexWrap: 'nowrap'}}>
                <Text style={{textAlign: 'left', fontWeight: '600', fontSize: 16, textTransform: 'uppercase', marginBottom: 6, marginLeft: 10}}>{day}</Text>
                <View style={{flexDirection: 'row', flexWrap: 'nowrap', marginHorizontal: 5}}>
                    {forecasts.map((f, i) => f.name === day && <Weather key={`${day}-${i.toString()}`} forecast={f} />)}
                </View>
            </View>
        ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    scroll: {
        width: '100%',
        height: '35%',
        flexDirection: 'row',
        flexWrap: 'nowrap'
    }
});
