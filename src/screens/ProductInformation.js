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

import ProductUniqueAPI from '../api/ProductUniqueAPI'
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
            "id": "4cdb8012-0467-4e89-8329-8a478b464e00",
            "code": "1234567",
            "name": "Ração Premier Cães Adultos Frango",
            "price": "166,9",
            "description": "É um alimento completo desenvolvido e indicado para cães...",
            "weight": 20,
            "establishmentID": "1fc502bd-7002-496c-aeb2-be76800d0a55",
            "establishmentName": "Petshop A",
            "establishmentPhone": "",
            "establishmentAddress" : "",
            "establishmentNumber" : "",
            "establishmentComplement" : "",
            "establishmentNeighborhood" : "",
            "establishmentCity" : "",
            "establishmentState" : "",
            "establishmentCountry" : "",
            "establishmentLatitude" : "",
            "establishmentLongitude" : "",
            "establishmentOperatingHours" : "",
            "photo": "iVBORw0KGgoAAAANSU..."
        }
    */
   product: '',
}

class ProductInformation extends Component
{
    state = {
        ...initialState
    }

    componentDidMount()
    {
        this.getProduct()
    }

    getProduct() 
    {
        try
        {
            let { accessToken } = this.props
            this.setState({
                isLoading: true
            })
            
            let productID = this.props.navigation.getParam('productID')
            let establishmentID = this.props.navigation.getParam('establishmentID')

            new ProductUniqueAPI().getProduct(accessToken, productID, establishmentID).then(([statusCode, data]) => {
                try
                {
                    switch(statusCode)
                    {
                        case 200:
                            if(data)
                            {
                                this.setState({
                                    isLoading: false,
                                    product: data
                                })
                            }
                            else
                            {
                                this.setState({
                                    isLoading: false,
                                    product: null
                                }, () => {
                                    this.WarningAPICalled(Strings.Warning, Strings.ProductUniqueNotFound)
                                })
                            }

                            break
                        case 401:
                            this.errorAPICalled(Strings.Failure, interpretMessageAPI(data, Strings.DefaultMessageCalledAPIProductUnique))
                            break
                        case 404:
                            this.errorAPICalled(Strings.Warning, interpretMessageAPI(data, Strings.DefaultMessageCalledAPIProductUnique))
                            break
                        case 422:
                            this.errorAPICalled(Strings.Failure, interpretMessageAPI(data, Strings.DefaultMessageCalledAPIProductUnique))
                            break
                        default:
                            this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIProductUnique)
                            break
                    }
                }
                catch(error)
                {
                    this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIProductUnique)
                }
            }).catch(() => {
                this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIProductUnique)
            })


        }
        catch(error)
        {
            this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIProductUnique)
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

    formatPrice(price)
    {
       return MaskService.toMask('money', price, {
            unit: 'R$ ',
            separator: ',',
        })
    }

    convertGramsToKG(weight)
    {
        let weightFormated = 0

        if(weight)
        {
            if(weight >= 1000)
            {
                weightFormated = weight / 1000 + ' KG'
                return weightFormated.replace('.', ',')
            }
            else if (weight != 0)
            {
                weightFormated = weight + ' Gramas'
                return weightFormated.replace('.', ',')
            }
        }
        
        return 0 + ' Gramas'
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
        let { isLoading, product } = this.state

        let view = null;

        if(isLoading)
        {
            view =  <ActivityIndicator style={styles.loading}
                            size='large' color={Colors.ColorPrimaryDark} />
        }
        else
        {
            if(product)
            {
                let priceWithMask = this.formatPrice(product.price)
                let weightConvert = this.convertGramsToKG(product.weight)
                let establishmentAddressComplet = this.getAddressComplet(product.establishmentAddress, product.establishmentNumber, product.establishmentComplement, product.establishmentNeighborhood)
                let cityState = product.establishmentCity + ' - ' + product.establishmentState
                // / /g expressão regualar que tras todos os \n presentes na string
                let descriptionFormated = product.description ? product.description.replace(/\\n/g, '\n') : ''
                let phoneFormated = this.formatPhone(product.establishmentPhone)
                let establishmentOperatingHoursFormated = product.establishmentOperatingHours ? product.establishmentOperatingHours.replace(/\\n/g, '\n') : ''


                let photoProduct = null

                if(product.photo)
                    photoProduct = <Image style={styles.image} source={{uri: this.decodeImage(product.photo)}}/>
                else
                    photoProduct = <Image style={styles.image} source={require('../../assets/not-found.jpg')}/>

                view =      <ScrollView>
                                <View style={styles.containerInformation}>
                                    {photoProduct}

                                    <Text style={styles.textTitle}>{product.name}</Text>
                                    <View style={styles.divider}/>
                                    
                                    <Text style={styles.textTitleInformation}>{Strings.Price}</Text>
                                    <Text style={styles.textInformation}>{priceWithMask}</Text>
    
                                    <Text style={styles.textTitleInformation}>{Strings.Weight}</Text>
                                    <Text style={styles.textInformation}>{weightConvert}</Text>
    
                                    <Text style={styles.textTitleInformation}>{Strings.Description}</Text>
                                    <Text style={styles.textInformation}>{descriptionFormated}</Text>
    
                                    <Text style={{...styles.textTitle, marginTop: 16}}>{product.establishmentName}</Text>
                                    <View style={styles.divider}/>
    
                                    <Text style={styles.textTitleInformation}>{Strings.Address}</Text>
                                    <Text style={styles.textInformation}>{establishmentAddressComplet}</Text>
    
                                    <Text style={styles.textTitleInformation}>{Strings.City}</Text>
                                    <Text style={styles.textInformation}>{cityState}</Text>
    
                                    <Text style={styles.textTitleInformation}>Horário Funcionamento</Text>
                                    <Text style={styles.textInformation}>{establishmentOperatingHoursFormated}</Text>
    
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
                                <Text style={styles.textNotFound}>{Strings.ProductInformationFalied}</Text>
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

export default connect(mapStateToProps)(ProductInformation)

