import React, { Component } from 'react'
import {
    View,
    Dimensions,
    StyleSheet,
} from "react-native"

import QRCodeScanner from 'react-native-qrcode-scanner'
import Colors from '../../res/Colors'


class QRCode extends Component
{
    onSuccess = (value) => {
        this.props.navigation.goBack()
        let success = this.props.navigation.getParam('onSuccess')
        success(value.data)
    }

    render()
    {
        return(
            <View style={styles.container}>
                <QRCodeScanner
                    onRead={this.onSuccess}
                    showMarker={true}
                    checkAndroid6Permissions={true}
                    cameraStyle={styles.cameraContainer} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.Black
    },
    cameraContainer: {
      height: Dimensions.get('window').height,
    }
})

export default QRCode