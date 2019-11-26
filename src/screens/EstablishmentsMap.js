import React, { Component } from 'react'
import {connect} from 'react-redux'
import { 
    View, 
    StyleSheet,
    ActivityIndicator,
    Alert
} from 'react-native'

import MapView, { Marker } from 'react-native-maps'
import Colors from '../../res/Colors'
import Strings from '../../res/Strings'
import EstablishmentAPI from '../api/EstablishmentAPI'
import { MaskService } from 'react-native-masked-text'
import {SCREEN_ESTABLISHMENT_PRODUCTS} from '../screens/navigator/Navigator'


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


const LATITUDE_DELTA = 0.015
const LONGITUDE_DELTA = 0.0121
class EstablishmentsMap extends Component 
{
    state = {
        ...initialState
    }

    componentDidMount()
    {
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

    formatPhone(phone)
    {
       return MaskService.toMask('cel-phone', phone, {
            maskType: 'BRL',
            withDDD: true,
            dddMask: '+99 (99) '
       })
    }

    onClickEstablishment = (id, name, distance) => {
        this.props.navigation.replace(SCREEN_ESTABLISHMENT_PRODUCTS, { id: id, name: name, distance: distance })
    }

    render() 
    {
        let latitudeTest = -21.184076
        let longitudeTest = -47.794764

        let { listEstablishments, isLoading } = this.state

        let viewMap = null
        
        if(isLoading)
        {
            viewMap =  <ActivityIndicator style={styles.loading}
                            size='large' color={Colors.ColorPrimaryDark} />
        }
        else
        {
            if(listEstablishments && listEstablishments.length)
            {
                let markers = []

                listEstablishments.forEach((element, index) => {
                    markers.push(
                        <Marker
                            key={element.id}
                            coordinate={{
                                latitude: parseFloat(element.latitude),
                                longitude: parseFloat(element.longitude),
                            }}
                            onCalloutPress={() => {
                                this.onClickEstablishment(element.id, element.name, element.distance)
                            }}
                            title={element.name}
                            description={this.formatPhone(element.phone)}/> 
                    )
                })


                viewMap =   <MapView
                                style={styles.map}
                                loadingEnabled={true}
                                region={{
                                latitude: latitudeTest,
                                longitude: longitudeTest,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                                }}>
                                {markers}
                            </MapView>
                            
            }
        }
       
        return (

            <View style={styles.container}>

               {viewMap}

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    loading: {
        padding: 24,
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


export default connect(mapStateToProps)(EstablishmentsMap)