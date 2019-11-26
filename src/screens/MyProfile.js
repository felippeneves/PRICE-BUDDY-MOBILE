import React, {Component} from 'react'
import {connect} from 'react-redux'
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

import Colors from '../../res/Colors'
import Strings from '../../res/Strings'
import {TextInputMask} from 'react-native-masked-text'

import Toolbar from '../components/Toolbar'


const initialState = {
    isLoading: false,
    name: '',
    lastName: '',
    email: '',
    phone: '',
    phoneWithMask: '',
}


class MyProfile extends Component
{
    state = {
        ...initialState
    }

    componentDidMount()
    {
        this.setState({
            name: this.props.name,
            lastName: this.props.lastName,
            email: this.props.email,
            phone: this.props.phone,
            phoneWithMask: this.props.phone
        })
    }

    render()
    {
        let { isLoading } = this.state

        return(
            <View style={styles.container}>
                  <Toolbar 
                    title={Strings.MyProfile}
                    iconLeft={true}
                    iconRight={true}
                    navigation={this.props.navigation}/>
                <ScrollView >
              
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
                        editable={false}/>

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
                                    <Text style={styles.buttomTextRegister}>{Strings.Save}</Text>
                                )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerButton}>
                        <TouchableOpacity onPress={this.register}
                            style={styles.buttomRegister}>
                                {isLoading ? (
                                    <ActivityIndicator 
                                    size='large' color={Colors.White}/> 
                                ) : (
                                    <Text style={styles.buttomTextRegister}>{Strings.ChangePassword}</Text>
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


const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        userId: user.userId,
        name: user.name,
        lastName: user.lastName,
        phone: user.phone,
        accessToken: user.accessToken 
    }
}


export default connect(mapStateToProps)(MyProfile)
