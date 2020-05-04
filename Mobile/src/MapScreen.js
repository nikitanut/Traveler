import React, { Component } from 'react'
import {View, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import YouTube from 'react-native-youtube'
import Api from './YoutubeApiService'
import results from './results'
import SearchBar from './SearchBar'
import VideoCard from './VideoCard'
import markerMap from './img/marker-map.png'
import markerMapGreen from './img/markerMapGreen.png'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height,
        width,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: 72,
        justifyContent: 'space-between',
    },
})

class MapScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            videos: [],
            chosenIndex: 0,
            animateTo: null,
            videoIndex: null,
            videoPlaying: false,
            lastVideoState: null,
            searchValue: props.searchValue,
            region: results[props.searchValue].region,
        }
    }

    listRef = null
    videoRef = null

    componentDidUpdate({ searchValue: oldSearchValue }) {
        // if (oldSearchValue !== this.state.searchValue) {
        //     this.loadVideos()
        // }
    }

    componentDidMount() {
        this.loadVideos()
    }

    loadVideos = () => {
        if (results[this.state.searchValue]) {
            let videos = []
            results[this.state.searchValue].videos.forEach(item => {
                Api.getVideo(item.videoId)
                    .then(data => {
                        console.log('RESPONSE', data)
                        const videoData = data.items[0]
                        const result = {
                            coordinate: item.coordinate,
                            timecode: item.offset,
                            location: item.location,
                            videoId: item.videoId,
                            image: videoData.snippet.thumbnails.high.url,
                            channel: videoData.snippet.channelTitle,
                            title: videoData.snippet.title,
                            duration: videoData.contentDetails.duration,
                            key: `${item.videoId}:${item.offset}`,
                        }
                        videos = [...videos, result]
                        this.setState({ videos })
                    })
            })
            this.setState({ region: results[this.state.searchValue].region })
        }
    }

    onMarkerPress = index => {
        this.setState({ animateTo: index })
        this.listRef.scrollToIndex({ index })
    }

    onScroll = ({ nativeEvent: { contentOffset: { x, y } } }) => {
        const index = Math.round(x / (0.66 * width + 16))
        const { chosenIndex, animateTo } = this.state
        if (chosenIndex !== index && animateTo === null) {
            this.setState({ chosenIndex: index })
        } else if (animateTo === index) {
            this.setState({ animateTo: null, chosenIndex: index })
        }
    }

    onVideoPress = videoIndex => {
        console.log('PRESS', videoIndex)
        this.setState({ videoIndex })
    }

    onVideoReady = () => {
        this.setState({ videoPlaying: true })
        const video = this.state.videos[this.state.videoIndex]
        console.log('TIMECODE', video.timecode, this.state.videoIndex)
        this.videoRef.seekTo(video.timecode)
    }

    render() {
        const { chosenIndex, videoIndex, videoPlaying, searchValue } = this.state
        const listData = this.state.videos.map((video, index) => ({
            ...video,
            onPress: () => this.onVideoPress(index),
        }))
        const currentVideo = this.state.videos[videoIndex]
        return (
            <View style ={styles.container}>
                <View style={{ position: 'absolute', top: 72, left: 0, right: 0, zIndex: 100000 }}>
                    <SearchBar value={searchValue} onChangeText={searchValue => this.setState({ searchValue })} onSubmitEditing={this.loadVideos} />
                </View>
                <MapView
                    style={styles.map}
                    region={this.state.region}
                >
                    {this.state.videos.map(({ coordinate }, i) => (
                        <Marker coordinate={coordinate} key={i}>
                            <TouchableOpacity onPress={() => this.onMarkerPress(i)} activeOpacity={1}>
                                <Image
                                    source={chosenIndex === i ? markerMapGreen : markerMap}
                                    style={{ width: 32, height: 32, marginTop: -16, marginLeft: -16 }}
                                />
                            </TouchableOpacity>
                        </Marker>
                    ))}
                </MapView>
                <View style={{ position: 'absolute', zIndex: 1000, bottom: 36, left: 0, right: 0 }}>
                    <FlatList
                        ref={ref => this.listRef = ref}
                        data={listData}
                        renderItem={VideoCard}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={this.onScroll}
                        scrollEventThrottle={16}
                        getItemLayout={(data, index) => ({ length: 0.66 * width + 16, offset: (0.66 * width + 16) * index, index })}
                    />
                </View>
                {videoIndex !== null && (
                    <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 1000000 }}>
                        <View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator animating style={{ zIndex: 1000001 }} size="large" />
                        </View>
                        <View style={{ opacity: videoPlaying ? 1 : 0, height: '100%', width: '100%' }}>
                            <YouTube
                                ref={ref => this.videoRef = ref}
                                onReady={this.onVideoReady}
                                videoId={currentVideo.videoId}
                                play
                                fullscreen
                                onChangeFullscreen={e => this.state.lastVideoState === 'paused' && !e.isFullscreen && this.setState({ videoPlaying: false, videoIndex: null })}
                                onChangeState={({ state }) => this.setState({ lastVideoState: state })}
                            />
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

export default MapScreen
