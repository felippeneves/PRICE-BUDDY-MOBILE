import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,    
    Platform,
    Alert
} from 'react-native'
import Colors from '../../res/Colors'
import Strings from '../../res/Strings'
import jwt from 'react-native-pure-jwt'
import {TOKEN_KEY} from '../info/ApplicationInfo'
import {login} from '../redux/actions/UserAction'
import AsyncStorage from '@react-native-community/async-storage'

import {ROUTE_MAIN,ROUTE_ACCESS} from './navigator/Navigator'

class SplashScreen extends Component
{
    componentDidMount = async () => {

        StatusBar.setBarStyle('light-content',true)
        if(Platform.OS === 'android')
            StatusBar.setBackgroundColor(Colors.ColorPrimary)
        token = await AsyncStorage.getItem(TOKEN_KEY)

        setTimeout(() => {
            if(token)
            {
                //QUANDO ALTERADO O CADASTRO DEVE SE ATUALIZAR AS INFORMAÇÕES DO TOKEN
                jwt.decode(token, TOKEN_KEY).then(response => {
                    this.props.onLogin({
                        email: response.payload.identity[0].email,
                        userId: response.payload.identity[0].id,
                        name: response.payload.identity[0].name,
                        lastName: response.payload.identity[0].lastName,
                        phone: response.payload.identity[0].phone,
                        accessToken: token  
                    })
                    this.props.navigation.replace(ROUTE_MAIN)
                }).catch(() => {
                    this.props.navigation.replace(ROUTE_ACCESS)
                })
            }
            else
                this.props.navigation.replace(ROUTE_ACCESS)
        }, 1000)
    }

    render()
    {
        return(
            <View style={styles.container} >
                <View style={styles.containerImage}>
                    <Image style={styles.image}
                        source={require('../../assets/icon_price_buddy_white_big.png')} />
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.text}>{Strings.AppName}</Text>
                    <Text style={styles.text}>Versão 01.00.01 - 11/10/2019</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.ColorPrimary
    },
    containerText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        color: Colors.White,
        fontSize: 18
    },
    containerImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        resizeMode: 'contain',
    },
})

const mapDispatchToProps = dispatch => {
    return{
        onLogin: user => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(SplashScreen)