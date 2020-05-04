import React from 'react'
import { Text, Image, View, StyleSheet, FlatList } from 'react-native'
import pin from './img/pin.png'
import VideoCard from './VideoCard'

const styles = StyleSheet.create({
    card: {
        paddingTop: 24,
        paddingBottom: 8,
    },
    pin: {
        width: 16,
        height: 16,
    },
    title: {
        fontSize: 14,
        color: '#0B856F',
        paddingLeft: 8,
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
})

const LocationCard = ({ title, videos }) => {
    return (
        <View style={styles.card}>
            <View style={styles.location}>
                <Image source={pin} style={styles.pin} />
                <Text style={styles.title}>{title}</Text>
            </View>
            <FlatList data={videos} renderItem={VideoCard} horizontal showsHorizontalScrollIndicator={false} />
        </View>
    )
}

export default LocationCard
