import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import moment from 'moment'
import timer from './img/timer.png'
import marker from './img/marker-red.png'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    image: {
        width: 0.66 * width,
        height: 138,
        borderRadius: 4,
    },
    card: {
        paddingLeft: 16,
        maxWidth: 0.66 * width + 16,
    },
    textWrapper: {
        paddingTop: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    channel: {
        fontSize: 12,
        color: '#999898',
        paddingTop: 8,
        paddingBottom: 4,
    },
    cardShadow: {
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
    },
    icon: {
        width: 14,
        height: 14,
    },
    timeText: {
        fontSize: 12,
        paddingLeft: 4,
        paddingRight: 8,
    }
})

const VideoCard = ({ item: { image, channel, title, duration, timecode, location, onPress } }) => {
    const md = !!duration && moment.duration(duration)
    const durationString = !!duration && `${String(md.minutes()).padStart(2, '0')}:${String(md.seconds()).padStart(2, '0')}`
    const mt = !!duration && moment.duration(timecode * 1000)
    const timecodeString = !!duration && `${String(mt.minutes()).padStart(2, '0')}:${String(mt.seconds()).padStart(2, '0')}`
    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, !!duration && styles.cardShadow]} activeOpacity={1}>
            <View style={styles.imageWrapper}>
                <Image source={typeof image === 'string' ? { uri: image } : image} style={[styles.image, !!duration && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } ]} />
            </View>
            <View style={[!!duration && {
                backgroundColor: '#fff',
                paddingHorizontal: 16,
                paddingBottom: 16,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                height: 120,
                justifyContent: 'space-between',
            }]}>
                <View style={styles.textWrapper}>
                    <Text style={styles.channel}>{channel}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
                {!!duration && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={timer} style={styles.icon} />
                        <Text style={[styles.timeText, { color: '#0B856F' }]}>{durationString}</Text>
                        <Image source={marker} style={styles.icon} />
                        <Text style={[styles.timeText, { color: '#E74C3C', fontWeight: 'bold', flex: 1 }]} numberOfLines={1}>{timecodeString} - {location}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default VideoCard
