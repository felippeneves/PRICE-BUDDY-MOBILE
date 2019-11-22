import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Image
} from 'react-native'


import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Colors from '../../res/Colors'
import Strings from '../../res/Strings'
import {TextInputMask} from 'react-native-masked-text'

import Toolbar from '../components/Toolbar'

import UserAPI from '../api/UserAPI'

const PASSWORD_MINIMUN_AMOUNT = 6

const initialState = {
    isLoading: false,
    name: '',
    lastName: '',
    email: '',
    password: '',
    passwrodConfirmation: '',
    phone: '',
    phoneWithMask: '',
}

class Register extends Component
{
    state = {
        ...initialState
    }

    validateName()
    {
        if(this.state.name)
        {
            return true
        }
        else
        {
            Alert.alert(Strings.Failure, Strings.EnterName)
            return false
        }
    }

    validaSobrenome()
    {
        if(this.state.lastName)
        {
            return true
        }
        else
        {
            Alert.alert(Strings.Failure, Strings.EnterLastname)
            return false
        }
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
        let password = this.state.password
        let passwrodConfirmation = this.state.passwrodConfirmation
        if(password)
        {
            if(password.length >= PASSWORD_MINIMUN_AMOUNT)
            {
                if(passwrodConfirmation)
                {
                    if(password === passwrodConfirmation)
                        return true
                    else
                    {
                        Alert.alert(Strings.Failure, Strings.PasswordsNotMatch)
                        return false
                    }
                }
                else
                {
                    Alert.alert(Strings.Failure, Strings.EnterPasswordConfirmation)
                    return false
                }
            }
            else
            {
                Alert.alert(Strings.Failure, Strings.PasswordLeastSixChars)
                return false
            }
        }
        else
        {
            Alert.alert(Strings.Failure, Strings.EnterPassword)
            return false
        }
    }

    validatePhone()
    {
        if(this.state.phoneWithMask)
        {
            if(this.phoneField.isValid())
                return true
            else
            {
                Alert.alert(Strings.Failure, Strings.EnterCellPhoneNumberCorrectly)
                return false
            }
        }
        else
        {
            Alert.alert(Strings.Failure, Strings.EnterCellPhoneNumber)
            return false
        }
    }

    register = async () => {
        if(!this.validateName())
            return 

        if(!this.validaSobrenome())
            return 

        if(!this.validateEmail())
            return 
        
        if(!this.validatePassword())
            return 

        if(!this.validatePhone())
            return
        
        this.createUser()
    }

    createUser()
    {
        try
        {
            let { name, lastName, email, password, phone } = this.state
            this.setState({
                isLoading: true
            })

            new UserAPI().registerUser(email, name, lastName, password, phone).then(([statusCode, data]) => {
                try
                {
                    switch(statusCode)
                    {
                        case 200:
                            this.setState({
                                ...initialState
                            })
                            Alert.alert(Strings.Success, Strings.MessageSuccessRegisterUser)
                            break
                        case 409:
                            let message
                            try
                            {
                                message = data
                            }
                            catch(error)
                            {
                                message = Strings.MessageFailureRegisterUser
                            }
                            this.errorAPICalled(Strings.Failure, message)
                            break
                        default:
                            this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIUser)
                            break
                    }
                }
                catch(error)
                {
                    this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIUser)
                }
              
            }).catch(() => {
                this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIUser)
            })
        }
        catch(error)
        {
            this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIUser)
        }
    }

    errorAPICalled(title, message)
    {
        this.setState({
            isLoading: false
        })
        Alert.alert(title ? title : Strings.FailureAPI, message ? message : Strings.DefaultMessageCalledAPIUser)
    }

    render()
    {
        let { isLoading } = this.state

        return(
            <View style={styles.container}>
                <Toolbar 
                    title={Strings.Register}/>
                <ScrollView >
                <View style={styles.containerImage}>
                                <Image style={styles.image}
                                    source={require('../../assets/icon_price_buddy_pet_orange.png')} />
                </View>
                <View style={styles.containerFields}>
                    <Text style={styles.inputDescription}>{Strings.Name}</Text>
                    <TextInput style={styles.input}
                        value={this.state.name} 
                        onChangeText={ text => {
                            this.setState({ 
                                name: text, 
                            })
                        }}
                        editable={!isLoading}/>

                    <Text style={styles.inputDescription}>{Strings.Lastname}</Text>
                    <TextInput style={styles.input}
                        value={this.state.lastName}
                        onChangeText={ text => {
                            this.setState({ 
                                lastName: text, 
                            })
                        }}
                        editable={!isLoading}/>

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

                    <Text style={styles.inputDescription}>{Strings.PasswordConfirmation}</Text>
                    <TextInput style={styles.input}
                        secureTextEntry={true}
                        value={this.state.passwrodConfirmation}
                        onChangeText={ text => {
                            this.setState({ 
                                passwrodConfirmation: text, 
                            })
                        }}
                        editable={!isLoading}/>

                    <Text style={styles.inputDescription}>{Strings.CellPhone}</Text>
                    <TextInputMask style={styles.input}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '+99 (99) ',
                        }}
                        includeRawValueInChangeText={true}
                        value={this.state.phoneWithMask}
                        onChangeText={(maskedText, rawText) => {
                            this.setState({ 
                                phone: rawText, 
                                phoneWithMask: maskedText
                            })
                        }}
                        ref={ref => this.phoneField = ref}
                        editable={!isLoading}/>

                    <View style={styles.containerButton}>
                        <TouchableOpacity onPress={this.register}
                            style={styles.buttomRegister}>
                                {isLoading ? (
                                    <ActivityIndicator 
                                    size='large' color={Colors.White}/> 
                                ) : (
                                    <Text style={styles.buttomTextRegister}>{Strings.DoRegister}</Text>
                                )}
                        </TouchableOpacity>
                    </View>

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
    containerImage: {
        alignItems: 'center',
        paddingTop: 16,
    },
    image: {
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerFields:{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16
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
    buttomRegister:{
        width: '70%',
        backgroundColor: Colors.ColorPrimary,
        alignItems: 'center',
        padding: 16,
        marginTop: 32
    },
    buttomTextRegister: {
        color: Colors.White,
        fontSize: 20
    },
})

export default Register