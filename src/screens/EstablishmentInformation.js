import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    ActivityIndicator,
    Alert,
    Image
} from 'react-native'

import EstablishmentUniqueAPI from '../api/EstablishmentUniqueAPI'
import Colors from '../../res/Colors'
import Strings from '../../res/Strings'
import Toolbar from '../components/Toolbar'
import { MaskService } from 'react-native-masked-text'
import IconEntypo from 'react-native-vector-icons/Entypo'
import {interpretMessageAPI} from '../api/default/DefaultAPI'

const initialState = {
    isLoading: false,
    /*
        structure product:
        {
            "id": "1fc502bd-7002-496c-aeb2-be76800d0a55",
            "name": "Petshop A",
            "description": "15 anos trazendo os melhores produtos e serviços para seu Pet",
            "phone": "551636270894",
            "operatingHours": "Seg - Sab: 08:00 - 22:00\\nDom: 09:00 - 19:00",
            "address": "Rua Itapura",
            "number": "100",
            "complement": "",
            "neighborhood": "Jardim Paulista",
            "city" : "Ribeirão Preto",
            "state" : "SP",
            "country" : "Brasil",
            "photo": "iVBORw0KGgoAAAANSUhEUgAAA+gAAAPoCAY..."
        }
    */
   establishment: '',
}

class EstablishmentInformation extends Component
{
    state = {
        ...initialState
    }

    componentDidMount()
    {
        this.getEstablishment()
    }

    getEstablishment() 
    {
        try
        {
            let { accessToken } = this.props
            this.setState({
                isLoading: true
            })
            
            let establishmentID = this.props.navigation.getParam('id')

            new EstablishmentUniqueAPI().getEstablishment(accessToken, establishmentID).then(([statusCode, data]) => {
                try
                {
                    switch(statusCode)
                    {
                        case 200:
                            if(data)
                            {
                                this.setState({
                                    isLoading: false,
                                    establishment: data
                                })
                            }
                            else
                            {
                                this.setState({
                                    isLoading: false,
                                    establishment: null
                                }, () => {
                                    this.WarningAPICalled(Strings.Warning, Strings.EstablishmentUniqueNotFound)
                                })
                            }

                            break
                        case 401:
                            this.errorAPICalled(Strings.Failure, interpretMessageAPI(data, Strings.DefaultMessageCalledAPIEstablishmentUnique))
                            break
                        case 404:
                            this.errorAPICalled(Strings.Warning, interpretMessageAPI(data, Strings.DefaultMessageCalledAPIEstablishmentUnique))
                            break
                        case 422:
                            this.errorAPICalled(Strings.Failure, interpretMessageAPI(data, Strings.DefaultMessageCalledAPIEstablishmentUnique))
                            break
                        default:
                            this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIEstablishmentUnique)
                            break
                    }
                }
                catch(error)
                {
                    this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIEstablishmentUnique)
                }
            }).catch(() => {
                this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIEstablishmentUnique)
            })
        }
        catch(error)
        {
            this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIEstablishmentUnique)
        }
    }

    
    WarningAPICalled(title, message)
    {
        Alert.alert(title ? title : Strings.Warning, message)
    }

    errorAPICalled(title, message)
    {
        this.setState({
            isLoading: false
        })
        Alert.alert(title ? title : Strings.FailureAPI, message ? message : Strings.DefaultMessageCalledAPIProduct)
    }

    getAddressComplet(address, number, complement, neighborhood)
    {
        let addressComplet = address + ',' + number

        if(complement)
            addressComplet += ' - ' + complement
        
        return addressComplet += ' - ' + neighborhood
    }

    formatPhone(phone)
    {
       return MaskService.toMask('cel-phone', phone, {
            maskType: 'BRL',
            withDDD: true,
            dddMask: '+99 (99) '
       })
    }

    decodeImage(imageBase64)
    {
        return 'data:image/png;base64,' + imageBase64
    }

    render()
    {
        let { isLoading, establishment } = this.state

        let view = null;

        if(isLoading)
        {
            view =  <ActivityIndicator style={styles.loading}
                            size='large' color={Colors.ColorPrimaryDark} />
        }
        else
        {
            if(establishment)
            {
                let addressComplet = this.getAddressComplet(establishment.address, establishment.number, establishment.complement, establishment.neighborhood)
                let cityState = establishment.city + ' - ' + establishment.state
                let phoneFormated = this.formatPhone(establishment.phone)
                let operatingHoursFormated = establishment.operatingHours ? establishment.operatingHours.replace(/\\n/g, '\n') : ''

                let photoEstablishment = null

                if(establishment.photo)
                    photoEstablishment = <Image style={styles.image} source={{uri: this.decodeImage(establishment.photo)}}/>
                else
                    photoEstablishment = <Image style={styles.image} source={require('../../assets/not-found.jpg')}/>
                
                view =  <ScrollView>
                            <View style={styles.containerInformation}>
                                {photoEstablishment}

                                <Text style={styles.textTitle}>{establishment.name}</Text>
                                <View style={styles.divider}/>
                                
                                <Text style={styles.textTitleInformation}>{Strings.Description}</Text>
                                <Text style={styles.textInformation}>{establishment.description}</Text>

                                <Text style={styles.textTitleInformation}>{Strings.Address}</Text>
                                <Text style={styles.textInformation}>{addressComplet}</Text>

                                <Text style={styles.textTitleInformation}>{Strings.City}</Text>
                                <Text style={styles.textInformation}>{cityState}</Text>

                                <Text style={styles.textTitleInformation}>Horário Funcionamento</Text>
                                <Text style={styles.textInformation}>{operatingHoursFormated}</Text>

                                <Text style={styles.textTitleInformation}>{Strings.Phone}</Text>
                                <Text style={styles.textInformation}>{phoneFormated}</Text>

                            </View>
                        </ScrollView>
            }
            else
            {
                view =  <View style={styles.containerNotFound}>
                                <IconEntypo name='emoji-sad'
                                    style={{marginRight: 8}}
                                    size={36}  color={Colors.ColorPrimaryDark}/>
                                <Text style={styles.textNotFound}>{Strings.EstablishmentInformationFalied}</Text>
                        </View>
            }
        }

        return(
            <View style={styles.container}>
                <Toolbar 
                    title={Strings.Information}
                    iconLeft={true}
                    iconRight={false}
                    navigation={this.props.navigation}/>
                {view}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerInformation:{
        padding: 16
    },
    textTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.Black
    },
    divider: {
        height: 1.5,
        backgroundColor: Colors.ColorPrimary,
        width: '100%',
        marginVertical: 8
    },
    textTitleInformation: {
        color: Colors.ColorPrimary,
        fontSize: 16,
        marginTop: 8
    },
    textInformation: {
        color: Colors.Black,
        fontSize: 16,
    },
    loading: {
        padding: 24,
    },
    containerNotFound: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
    },
    textNotFound:{
        color: Colors.ColorPrimaryDark,
        fontSize: 18,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    }
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

export default connect(mapStateToProps)(EstablishmentInformation)
