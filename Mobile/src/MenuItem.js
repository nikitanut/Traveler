import React from 'react'
import { View, Image, Text } from 'react-native'

const MenuItem = ({ icon, title, isActive }) => (
    <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
        <Image source={icon} style={{ width: 24, height: 24, tintColor: isActive ? '#0B856F' : '#000' }} />
        <Text style={{ fontSize: 10, color: isActive ? '#0B856F' : '#000', paddingTop: 8, textAlign: 'center' }}>{title.toUpperCase()}</Text>
    </View>
)

export default MenuItem
