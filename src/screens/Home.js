import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,    
    Platform,
} from 'react-native'
import Colors from '../../res/Colors'


class Home extends Component
{
    componentDidMount = () =>{
        
        StatusBar.setBarStyle('light-content',true)
        if(Platform.OS === 'android')
            StatusBar.setBackgroundColor(Colors.ColorPrimaryDark)
    }

    register = () => {
        this.props.navigation.navigate('Register')
    }

    login = () => {
        this.props.navigation.navigate('Login')
    }

    render()
    {
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.register}
                        style={styles.buttomRegister}>
                            <Text style={styles.buttomTextRegister}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.login}
                        style={styles.buttomLogin}>
                            <Text style={styles.buttomTextLogin}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.ColorPrimary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttomRegister:{
        width: '70%',
        backgroundColor: Colors.ColorPrimary,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.White,
        padding: 16
    },
    buttomTextRegister: {
        color: Colors.White,
        fontSize: 20
    },
    buttomLogin:{
        width: '70%',
        backgroundColor: Colors.White,
        alignItems: 'center',
        padding: 16,
        marginTop: 16
    },
    buttomTextLogin: {
        color: Colors.ColorPrimary,
        fontSize: 20
    },
})

export default Home
