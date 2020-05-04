import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TextInput, ScrollView } from 'react-native'
import search from './img/search.png'
import folder from './img/folder.png'
import earth from './img/earth.png'
import user from './img/user.png'
import LocationCard from './LocationCard'
import slovenia1 from './img/slovenia_1.png'
import slovenia2 from './img/slovenia_2.png'
import porto1 from './img/porto_1.png'
import porto2 from './img/porto_2.png'
import karelia1 from './img/karelia_1.png'
import karelia2 from './img/karelia_2.png'
import MenuItem from './MenuItem'
import SearchBar from './SearchBar'
import results from './results'

const styles = StyleSheet.create({
    container: {
        paddingTop: 72,
        paddingBottom: 100,
    },
    content: {
        paddingTop: 8,
    },
    h1: {
        fontSize: 28,
        fontWeight: 'bold',
        paddingHorizontal: 16,
    },
    locationsList: {

    },
    menu: {
        height: 100,
        backgroundColor: '#fff',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(0,0,0,0.2)',
    },
})

const data = {
    slovenia: [
        {
            image: slovenia1,
            channel: 'way2way',
            title: 'Изумрудное озеро Блед. Бледский замок',
            key: '1',
        },
        {
            image: slovenia2,
            channel: 'Владимир Кот',
            title: 'Жемчужина Словении',
            key: '2',
        },
    ],
    porto: [
        {
            image: porto1,
            channel: 'Pietro Scardamaglia',
            title: 'Porto Cinematic Travel Video',
            key: '1',
        },
        {
            image: porto2,
            channel: 'Duda Nascimento',
            title: 'Apresento o Porto',
            key: '2',
        },
    ],
    karelia: [
        {
            image: karelia1,
            channel: 'way2way',
            title: 'Изумрудное озеро Блед. Бледский замок',
            key: '1',
        },
        {
            image: karelia2,
            channel: 'Владимир Кот',
            title: 'Жемчужина Словении',
            key: '2',
        },
    ],
}

class MainScreen extends Component {
    onChangeText = text => {
        if (results[text]) {
            this.props.onSearch(text)
            this.props.goToMapScreen()
        }
    }

    render() {
        return (
            <>
                <ScrollView contentContainerStyle={styles.container} bounces={false}>
                    <SearchBar placeholder="Введите название города или страны" onChangeText={this.onChangeText} />
                    <View style={styles.content}>
                        <Text style={styles.h1}>Популярные локации</Text>
                        <View style={styles.locationsList}>
                            <LocationCard title="Озеро Блед, Словения" videos={data.slovenia} />
                            <LocationCard title="Порту, Португалия" videos={data.porto} />
                            <LocationCard title="Рускеала, Россия" videos={data.karelia} />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.menu}>
                    <MenuItem icon={search} title="Поиск" isActive />
                    <MenuItem icon={folder} title={`Посмотреть\nпотом`} />
                    <MenuItem icon={earth} title="Карта" />
                    <MenuItem icon={user} title="Профиль" />
                </View>
            </>
        )
    }
}

export default MainScreen
