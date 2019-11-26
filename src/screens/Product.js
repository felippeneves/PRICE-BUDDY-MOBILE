import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native'

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../../res/Colors'
import Strings from '../../res/Strings'
import Toolbar from '../components/Toolbar'

import ProductAPI from '../api/ProductAPI'
import ItemProduct from '../components/ItemProduct'
import {interpretMessageAPI} from '../api/default/DefaultAPI'
import {SCREEN_PRODUCT_INFORMATION} from '../screens/navigator/Navigator'



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
   product: ''
}

class Product extends Component
{
    state = {
        ...initialState
    }

    getProducts() 
    {
        try
        {
            let { accessToken } = this.props
            let { product } = this.state
            this.setState({
                isLoading: true
            })
            
            let latitudeTest = '-21.184076'
            let longitudeTest = '-47.794764'

            new ProductAPI().getProducts(accessToken, product, null, latitudeTest, longitudeTest).then(([statusCode, data]) => {
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
                            this.setState({listProducts: null})
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

    searchProducts = () => {
        if(!this.validateProduct())
            return
        
        this.getProducts()
    }

    validateProduct() 
    {
        if(this.state.product)
        {
            return true
        }
        else
        {
            Alert.alert(Strings.Failure, Strings.EnterProduct)
            return false
        }
    }

    onSuccess = (value) => {
        this.setState({
            product: value
        }, () => {
            this.searchProducts()
        })
    }

    onClickProduct = (productID, establishmentID) => {
        this.props.navigation.navigate(SCREEN_PRODUCT_INFORMATION, { productID: productID, establishmentID: establishmentID })
    }

    qrcode = () => {
        this.ocorreuLeitura = true
        this.props.navigation.navigate('QRCode', { onSuccess: this.onSuccess})
    }

    render()
    {
        let { listProducts, isLoading, product } = this.state

        let viewList = null

        if(!isLoading)
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
                                <IconMaterialCommunityIcons name='cloud-search-outline'
                                    style={{marginRight: 8}}
                                    size={36}  color={Colors.ColorPrimaryDark}/>
                                <Text style={styles.textNotFound}>{Strings.SearchProduct}</Text>
                            </View>
            }
        }
       
       

        return(
            <View style={styles.container}>
                <Toolbar 
                    title={Strings.Products}
                    iconLeft={true}
                    iconRight={true}
                    navigation={this.props.navigation}/>
                
                <View style={styles.containerInput}>
                    <Text style={styles.inputDescription}>{Strings.Product}</Text>
                    <TextInput style={styles.input}
                        value={product} 
                        placeholder={Strings.InformProduct}
                        onChangeText={ text => {
                            this.setState({ 
                                product: text, 
                            })
                        }}
                        editable={!isLoading}/>
                    <TouchableOpacity style={styles.inputIcon}
                        onPress={this.qrcode}
                        disabled={isLoading}>
                        <IconMaterialCommunityIcons
                            name='barcode-scan'
                            size={30}  color={Colors.ColorPrimaryDark}/>  
                    </TouchableOpacity>  
                </View>

                <View style={styles.containerButton}>
                        <TouchableOpacity  style={styles.buttom}
                            onPress={this.searchProducts}>
                                {isLoading ? (
                                    <ActivityIndicator 
                                    size='large' color={Colors.White}/> 
                                ) : (
                                    <Text style={styles.buttomText}>{Strings.Search}</Text>
                                )}
                        </TouchableOpacity>
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
    input: {
        width: '100%',
        backgroundColor: Colors.White,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: Colors.ColorPrimary,
        fontSize: 18,
        padding: -5,
        paddingRight: 32
    },
    inputDescription: {
        color: Colors.ColorPrimaryDark,
        fontSize: 18,
        marginTop: 8,
        marginBottom: -5
    },
    containerInput: {
        paddingHorizontal: 16,
        justifyContent: 'center'
    },
    containerButton:{
        alignItems: 'center',
        marginBottom: 8
    },
    buttom:{
        width: '70%',
        backgroundColor: Colors.ColorPrimary,
        alignItems: 'center',
        padding: 16,
        marginTop: 16
    },
    buttomText: {
        color: Colors.White,
        fontSize: 20
    },    
    inputIcon: {
        position: 'absolute',
        padding: 16,
        alignSelf: 'flex-end',
    },
    containerQrcode: {
        flex: 1,
        backgroundColor: Colors.Black
    },
    cameraContainer: {
        height: Dimensions.get('window').height,
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

export default connect(mapStateToProps)(Product)
