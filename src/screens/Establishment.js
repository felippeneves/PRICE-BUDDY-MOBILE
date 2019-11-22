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
    FlatList,
    Platform,
    StatusBar
} from 'react-native'

import Colors from '../../res/Colors'
import Strings from '../../res/Strings'
import Toolbar from '../components/Toolbar'
import EstablishmentAPI from '../api/EstablishmentAPI'
import ItemEstablishment from '../components/ItemEstablishment'
import IconEntypo from 'react-native-vector-icons/Entypo'


const initialState = {
    isLoading: false,

    /*
        structure listEstablishments:
        [
            {
                "id": "adf4a70b-34d4-4a1f-acc9-0d941cfffec9",
                "phone": "551636270897",
                "longitude": "-47.811211",
                "number": "1176",
                "distance": "2033.0",
                "latitude": "-21.194044",
                "complement": null,
                "description": null,
                "name": "Petshop C",
                "city": "Ribeirão Preto",
                "addres": "Avenida Itatiaia",
                "cnpj": "21156810000101",
                "state": "SP",
                "neighborhood": "Jardim Sumare",
                "country": "Brasil"
            }
        ]
    */
    listEstablishments: [],
}

class Establishment extends Component
{
    state = {
        ...initialState
    }

    componentDidMount()
    {
        StatusBar.setBarStyle('light-content',true)
        if(Platform.OS === 'android')
            StatusBar.setBackgroundColor(Colors.ColorPrimaryDark)
        this.getEstablishments()
    }

    getEstablishments()
    {
        try
        {
            let { accessToken } = this.props
            this.setState({
                isLoading: true
            })

            new EstablishmentAPI().getEstablishments(accessToken, '-21.184076', '-47.794764').then(([statusCode, data]) => {
                try
                {
                    switch(statusCode)
                    {
                        case 200:
                            if(data && data.length)
                            {
                                this.setState({
                                    isLoading: false,
                                    listEstablishments: data
                                })
                            }
                            else
                            {
                                this.setState({
                                    isLoading: false,
                                    listEstablishments: null
                                })
                            }

                            break
                        case 401:
                            this.errorAPICalled(Strings.Failure, interpretMessageAPI(data))
                            break
                        case 404:
                            this.errorAPICalled(Strings.Failure, interpretMessageAPI(data))
                            break
                        case 422:
                            this.errorAPICalled(Strings.Failure, interpretMessageAPI(data))
                            break
                        default:
                            this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIEstablishment)
                            break
                    }
                }
                catch(error)
                {
                    this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIEstablishment)
                }
            }).catch(() => {
                this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIEstablishment)
            })
        }
        catch(error)
        {
            this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIEstablishment)
        }
    }

    interpretMessageAPI(json)
    {
        let message
        try
        {
            if(json)
            {
                if(json.message)
                    message = json.message
                else if(json.msg)
                    message = json.msg
            }
        }
        catch(error)
        {
            message = Strings.DefaultMessageCalledAPIEstablishment
        }
        finally
        {
            if(!message)
                message = Strings.DefaultMessageCalledAPIEstablishment
        }

        return message
    }

    errorAPICalled(title, message)
    {
        this.setState({
            isLoading: false
        })
        Alert.alert(title ? title : Strings.FailureAPI, message ? message : Strings.DefaultMessageCalledAPIEstablishment)
    }

    

    render()
    {
        let { listEstablishments, isLoading } = this.state

        let viewList = null

        if(isLoading)
        {
            viewList =  <ActivityIndicator style={styles.loading}
                            size='large' color={Colors.ColorPrimaryDark} />
        }
        else
        {
            if(listEstablishments && listEstablishments.length)
            {
                viewList =  <FlatList data={listEstablishments}
                                keyExtractor={item => `${item.id}`}
                                renderItem={({item}) => 
                                    <ItemEstablishment {...item} /> } 
                                showsVerticalScrollIndicator={false}/>
            }
            else
            {
                viewList =  <View style={styles.containerNotFound}>
                                <IconEntypo name='emoji-sad'
                                    size={36}  color={Colors.ColorPrimaryDark}/>
                                <Text style={styles.textNotFound}>{Strings.EstablishmentNotFound}</Text>
                            </View>
            }
        }
       

        return (
            <View style={styles.container}>
                <Toolbar 
                    title={Strings.Establishments}
                    iconLeft={true}
                    iconRight={true}
                    onLogout={this.logout}
                    navigation={this.props.navigation}/>
                
                {viewList}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        padding: 24,
    },
    containerNotFound: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    textNotFound:{
        color: Colors.ColorPrimaryDark,
        fontSize: 18,
        marginLeft: 16
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


export default connect(mapStateToProps)(Establishment)
