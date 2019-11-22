import {AppRegistry} from 'react-native'
import {Provider} from 'react-redux'
import React from 'react'
import Navigator from './src/screens/navigator/Navigator'
import {name as appName} from './app.json'

import storeConfig from './src/redux/store/StoreConfig'

const store = storeConfig()

const Redux = () => (
    <Provider store={store}>
        <Navigator />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux)
