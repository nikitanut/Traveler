/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import MainScreen from './src/MainScreen'
import MapScreen from './src/MapScreen'

const App = () => {
    const [screen, setScreen] = useState('main')
    const [searchValue, setSearchValue] = useState('')
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View>
                {screen === 'main' ? <MainScreen goToMapScreen={() => setScreen('map')} onSearch={value => setSearchValue(value)} /> : <MapScreen searchValue={searchValue} />}
            </View>
        </>
    )
}

export default App;
