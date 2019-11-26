import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Text,
    Alert,
    TouchableOpacity
} from 'react-native'


import Colors from '../../res/Colors'
import Strings from '../../res/Strings'
import Toolbar from '../components/Toolbar'
import ProductAPI from '../api/ProductAPI'
import IconEntypo from 'react-native-vector-icons/Entypo'
import ItemProduct from '../components/ItemProduct'
import {interpretMessageAPI} from '../api/default/DefaultAPI'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {SCREEN_PRODUCT_INFORMATION, SCREEN_ESTABLISHMENT_INFORMATION} from '../screens/navigator/Navigator'


const initialState = {
    isLoading: false,

    /*
        structure listProducts:
        [
            {
                "id": "4cdb8012-0467-4e89-8329-8a478b464e00",
                "code": "1234567",
                "name": "Ração Premier Cães Adultos Frango",
                "price": "166,9",
                "description": "É um alimento completo desenvolvido e indicado para cães...",
                "weight": 20,
                "establishmentID": "1fc502bd-7002-496c-aeb2-be76800d0a55",
                "establishmentName": "Petshop A",
                "establishmentDistance": "0",
                "photo": "iVBORw0KGgoAAAANSU..."
            }
        ]
    */
   listProducts: [],
}

class EstablishmentProducts extends Component
{
    state = {
        ...initialState
    }

    componentDidMount()
    {
        this.getProducts()
    }

    getProducts() 
    {
        try
        {
            let { accessToken } = this.props
            this.setState({
                isLoading: true
            })
            
            let latitudeTest = '-21.184076'
            let longitudeTest = '-47.794764'
            let establishmentID = this.props.navigation.getParam('id')

            new ProductAPI().getProducts(accessToken, null, establishmentID, latitudeTest, longitudeTest).then(([statusCode, data]) => {
                try
                {
                    switch(statusCode)
                    {
                        case 200:
                            if(data && data.length)
                            {
                                this.setState({
                                    isLoading: false,
                                    listProducts: data
                                })
                            }
                            else
                            {
                                this.setState({
                                    isLoading: false,
                                    listProducts: null
                                }, () => {
                                    this.WarningAPICalled(Strings.Warning, Strings.ProductNotFound)
                                })
                            }

                            break
                        case 401:
                            this.errorAPICalled(Strings.Failure, interpretMessageAPI(data, Strings.DefaultMessageCalledAPIProduct))
                            break
                        case 404:
                            this.errorAPICalled(Strings.Warning, interpretMessageAPI(data, Strings.DefaultMessageCalledAPIProduct))
                            break
                        case 422:
                            this.errorAPICalled(Strings.Failure, interpretMessageAPI(data, Strings.DefaultMessageCalledAPIProduct))
                            break
                        default:
                            this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIProduct)
                            break
                    }
                }
                catch(error)
                {
                    this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIProduct)
                }
            }).catch(() => {
                this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIProduct)
            })


        }
        catch(error)
        {
            this.errorAPICalled(Strings.FailureAPI, Strings.DefaultMessageCalledAPIProduct)
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

    onClickEstablishment = () => {
        this.props.navigation.navigate(SCREEN_ESTABLISHMENT_INFORMATION, { id: this.props.navigation.getParam('id') })
    }


    onClickProduct = (productID, establishmentID) => {
        this.props.navigation.navigate(SCREEN_PRODUCT_INFORMATION, { productID: productID, establishmentID: establishmentID })
    }

    render()
    {
        let { listProducts, isLoading, product, qrcode } = this.state

        let name = this.props.navigation.getParam('name')
        let distance = this.props.navigation.getParam('distance')

        let viewList = null

        if(isLoading)
        {
            viewList =  <ActivityIndicator style={styles.loading}
                            size='large' color={Colors.ColorPrimaryDark} />
        }
        else
        {
            if(listProducts && listProducts.length)
            {
                viewList =  <FlatList data={listProducts}
                                keyExtractor={item => `${item.id + ' - ' + item.establishmentID}`}
                                renderItem={({item}) => 
                                    <ItemProduct {...item} onClickProduct={this.onClickProduct}/> }
                                showsVerticalScrollIndicator={false}/>
            }
            else
            {
                viewList =  <View style={styles.containerNotFound}>
                                <IconEntypo name='emoji-sad'
                                    style={{marginRight: 8}}
                                    size={36}  color={Colors.ColorPrimaryDark}/>
                                <Text style={styles.textNotFound}>{Strings.EstablishmentNoProducts}</Text>
                            </View>
            }
        }
       
       

        return(
            <View style={styles.container}>
                <Toolbar 
                    title={Strings.Products}
                    subtitle= {name}
                    iconLeft={true}
                    iconRight={true}
                    navigation={this.props.navigation}/>

                <View style={styles.containerInformations}>
                    <View style={styles.containerEstablishment}>
                        <Text style={styles.textEstablishmentInformations}>{name}</Text>
                        <Text style={{...styles.textEstablishmentInformations, marginTop: 4}}>{distance}</Text>
                    </View>
                    <TouchableOpacity style={{paddingRight: 8}}
                        onPress={this.onClickEstablishment}>
                        <IconMaterialCommunityIcons name='store' size={36} color={Colors.ColorPrimaryDark}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerProducts}>
                    <Text style={styles.textTitle}>Produtos</Text>
                    <View style={styles.divider}/>
                </View>

                {viewList}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        padding: 24,
    },
    containerNotFound: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        padding: 16
    },
    textNotFound:{
        color: Colors.ColorPrimaryDark,
        fontSize: 18,
    },
    containerInformations: {
        flexDirection: 'row',
        width: '100%',
        padding: 16
    },
    containerEstablishment: {
        flex: 3
    },
    textEstablishmentInformations: {
        fontSize: 18,
        color: Colors.Black
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
    containerProducts: {
        padding: 8
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

export default connect(mapStateToProps)(EstablishmentProducts)
