import React from 'react'
import {Image, TextInput, View, StyleSheet} from 'react-native'
import search from './img/search.png'

const styles = StyleSheet.create({
    searchBar: {
        borderRadius: 16,
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        paddingVertical: 8,
        shadowRadius: 12,
        elevation: 4,
        zIndex: 4,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        marginHorizontal: 16,
    },
    searchIcon: {
        width: 16,
        height: 16,
    },
    input: {
        color: '#999898',
        fontSize: 12,
        marginLeft: 8,
        zIndex: 100,
    },
})

const SearchBar = ({ placeholder, value, onChangeText, ...props }) => (
    <View style={styles.searchBar}>
        <Image source={search} style={styles.searchIcon} />
        <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onChangeText} {...props} />
    </View>
)

export default SearchBar
