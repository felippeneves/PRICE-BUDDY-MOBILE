import React, {Component} from 'react'
import {connect} from 'react-redux'
import {login} from '../redux/actions/UserAction'
import{
    View,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    StatusBar,    
    Image
} from 'react-native'

import Colors from '../../res/Colors'
import Strings from '../../res/Strings'
import Toolbar from '../components/Toolbar'
import LoginAPI from '../api/LoginAPI'
import {TOKEN_KEY} from '../info/ApplicationInfo'
import AsyncStorage from '@react-native-community/async-storage'

import {SCREEN_REGISTER, ROUTE_MAIN, openScreenInAnotherRoute} from './navigator/Navigator'

const initialState = {
    isLoading: false,
    email: '',
    password: '',
    userId: '',
    name: '',
    lastName: '',
    phone: '',
    accessToken: '',
}

class Login extends Component
{
    state = {
        ...initialState
    }

    componentDidMount = () =>{
        
        StatusBar.setBarStyle('light-content',true)
        if(Platform.OS === 'android')
            StatusBar.setBackgroundColor(Colors.ColorPrimaryDark)
    }

    validateEmail()
    {
        if(this.state.email)
        {
            let email = this.state.email
            if(email.includes('@'))
                return true
            else
            {
                Alert.alert(Strings.Failure, Strings.InvalidEmail)
                return false
            }
        }
        else
        {
            Alert.alert(Strings.Failure, Strings.EnterEmail)
            return false
        }
    }

    validatePassword()
    {
        if(this.state.password)
        {
            return true
        }
        else
        {
            Alert.alert(Strings.Failure, Strings.EnterPassword)
            return false
        }
    }

    validateScreen = async () => {
        if(!this.validateEmail())
            return 
        
        if(!this.validatePassword())
            return 

        this.login()
    }

    login()
    {
        try
        {
            let { email, password } = this.state
            this.setState({
                isLoading: true
            })

            new LoginAPI().login(email, password).then(([statusCode, data]) => {
                try
                {
                    switch(statusCode)
                    {
                        case 200:
                            token = data.accessToken
                            AsyncStorage.setItem(TOKEN_KEY, token);

                            this.setState({
                                isLoading: false,
                                userId: data.id,
                                name: data.email,
                                lastName: data.name,
                                phone: data.phone,
                                accessToken: token    
                            })
                            this.props.onLogin({...this.state})
                            openScreenInAnotherRoute(ROUTE_MAIN, this.props.navigation)
                            break

                        case 404:
                            let message
                            try
                            {
                                message = data.message
                            }
                            catch(error)
                            {
                                message = Strings.DefaultMessageCalledAPILogin
                            }
                            this.errorAPICalled(Strings.Failure, message)
                            break
                        default:
                            this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPILogin)
                            break
                    }
                }
                catch(error)
                {
                    this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPILogin)

                }
            }).catch(() => {
                this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPILogin)
            })
        }
        catch(error)
        {
            this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPILogin)
        }
    }

    errorAPICalled(title, message)
    {
        this.setState({
            isLoading: false
        })
        Alert.alert(title ? title : Strings.FailureAPI, message ? message : Strings.DefaultMessageCalledAPIUser)
    }

    register = () => {
        this.props.navigation.navigate(SCREEN_REGISTER)
    }

    render()
    {
        let { isLoading } = this.state

        return(
            <View style={styles.container}>
                <Toolbar 
                    title={Strings.Login}/>
                    <ScrollView contentContainerStyle={styles.containerScroll}>
                        {/* <View style={styles.containerImage}>

                        </View> */}
                        <View style={styles.containerFields}>
                            <View style={styles.containerImage}>
                                <Image style={styles.image}
                                    source={require('../../assets/icon_price_buddy_pet_orange.png')} />
                            </View>
                            <Text style={styles.inputDescription}>{Strings.Email}</Text>
                            <TextInput style={styles.input}
                                keyboardType='email-address'
                                value={this.state.email}
                                onChangeText={ text => {
                                    this.setState({ 
                                        email: text, 
                                    })
                                }}
                                editable={!isLoading}/>
                            
                            <Text style={styles.inputDescription}>{Strings.Password}</Text>
                            <TextInput style={styles.input}
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={ text => {
                                    this.setState({ 
                                        password: text, 
                                    })
                            }}
                            editable={!isLoading}/>

                            <View style={styles.containerButton}>
                                <TouchableOpacity onPress={this.validateScreen}
                                    style={styles.buttomLogin}>
                                        {isLoading ? (
                                            <ActivityIndicator 
                                            size='large' color={Colors.White}/> 
                                        ) : (
                                            <Text style={styles.buttomTextLogin}>{Strings.Signin}</Text>
                                        )}
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.register}
                                    style={styles.buttomRegister}
                                    disabled={isLoading}>
                                    <Text style={styles.buttomTextRegister}>Cadastrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.containerRodape}>
                            <Text style={styles.textRodape}>Versão 01.00.01 - 11/10/2019</Text>
                        </View>
                    </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    containerScroll: { 
        flexGrow: 1,
        justifyContent: 'center'
    },
    containerFields:{
        justifyContent: 'center',
        // elevation: 4,
        // shadowRadius: 3,
        // shadowOpacity: 1,
        // borderRadius: 3,
        // shadowOffset: { width: 0, height: 3 },
        paddingHorizontal: 16,
        paddingBottom: 16,
        marginHorizontal: 8
    },
    input: {
        width: '100%',
        backgroundColor: Colors.White,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: Colors.ColorPrimary,
        fontSize: 18
    },
    inputDescription: {
        color: Colors.ColorPrimaryDark,
        fontSize: 18,
        marginTop: 8
    },
    containerButton:{
        alignItems: 'center'
    },
    buttomLogin:{
        width: '70%',
        backgroundColor: Colors.ColorPrimary,
        alignItems: 'center',
        padding: 16,
        marginTop: 24
    },
    buttomTextLogin: {
        color: Colors.White,
        fontSize: 20
    },
    buttomRegister:{
        width: '70%',
        backgroundColor: Colors.White,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.ColorPrimary,
        padding: 16,
        marginTop: 16
    },
    buttomTextRegister: {
        color: Colors.ColorPrimary,
        fontSize: 20
    },
    containerImage: {
        alignItems: 'center',
        paddingTop: 16,
    },
    image: {
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerRodape: {
        width:'100%', 
        bottom: 0, 
        position: 'absolute', 
        justifyContent: 'center', 
        padding: 8
    },
    textRodape: {
        color: Colors.SlateGray,
        fontSize: 16,
        textAlign: 'center'
    },
})

const mapDispatchToProps = dispatch => {
    return{
        onLogin: user => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)




