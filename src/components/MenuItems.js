import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import Colors from '../../res/Colors'
import Strings from '../../res/Strings'

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFoundation from 'react-native-vector-icons/Foundation'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

import {logout} from '../redux/actions/UserAction'
import {TOKEN_KEY} from '../info/ApplicationInfo'
import AsyncStorage from '@react-native-community/async-storage'
import {
    ROUTE_ACCESS, 
    SCREEN_ESTABLISHMENT, 
    SCREEN_PRODUCT, 
    SCREEN_PRODUCT_INFORMATION, 
    SCREEN_ESTABLISHMENT_PRODUCTS,
    SCREEN_ESTABLISHMENTS_MAP
} from '../screens/navigator/Navigator'



class MenuItems extends Component
{
    logout = async () => {
        this.props.navigation.goBack()
        AsyncStorage.removeItem(TOKEN_KEY)
        // this.props.onLogout()
        this.props.navigation.replace(ROUTE_ACCESS)
    }

    render()
    {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.containerProfileUser}>
                        <Image style={styles.photoUser}/>
                        <Text style={{...styles.textItemUser, fontWeight: 'bold'}}
                            numberOfLines={1}>Felippe Neves</Text>
                        <Text style={styles.textItemUser}
                            numberOfLines={1}>felippe@gmail.com</Text>
                    </View>
                    <View style={styles.containerItems}>

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={() => {
                            this.props.navigation.navigate(SCREEN_ESTABLISHMENT)
                            this.props.navigation.goBack()
                        }}>
                        <IconMaterialCommunityIcons name='store' size={36} color={Colors.White}/>
                        <Text style={styles.textItem}
                            numberOfLines={1}>{Strings.Establishment}</Text>
                    </TouchableOpacity>

                   
                    <TouchableOpacity style={styles.buttonItem}
                        onPress={() => {
                            this.props.navigation.navigate(SCREEN_PRODUCT)
                            this.props.navigation.goBack()
                        }}>
                        <IconEntypo name='shopping-cart' size={36} color={Colors.White}/>
                        <Text style={styles.textItem}
                            numberOfLines={1}>{Strings.Products}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={() => {
                            this.props.navigation.navigate(SCREEN_PRODUCT_INFORMATION)
                            this.props.navigation.goBack()
                        }}>
                        <IconFoundation name='map' size={36} color={Colors.White}/>
                        <Text style={styles.textItem}
                            numberOfLines={1}>{Strings.Map}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={() => {
                            this.props.navigation.navigate(SCREEN_ESTABLISHMENT_PRODUCTS)
                            this.props.navigation.goBack()
                        }}>
                        <IconMaterialCommunityIcons name='information' size={36} color={Colors.White}/>
                        <Text style={styles.textItem}
                            numberOfLines={1}>{Strings.About}</Text>
                    </TouchableOpacity>

                    <View style={styles.divider}/>

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={() => {
                            this.props.navigation.navigate(SCREEN_ESTABLISHMENTS_MAP)
                            this.props.navigation.goBack()
                        }}>
                        <IconFontAwesome name='user-circle' size={36} color={Colors.White}/>
                        <Text style={styles.textItem}
                            numberOfLines={1}>{Strings.MyProfile}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={this.logout}>
                        <IconMaterialCommunityIcons name='exit-to-app' size={36} color={Colors.White}/>
                        <Text style={styles.textItem}
                            numberOfLines={1}>{Strings.Logout}</Text>
                    </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    drawerTransparent: {
        flex: 1,
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: Colors.ColorPrimaryLight,
    },
    containerProfileUser: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: Colors.ColorPrimary,
        elevation: 4,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    containerItems: {
        flex: 3,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    photoUser: {
        height: 48,
        width: 48,
        borderRadius: 100,
        backgroundColor: Colors.White,
    },
    textItemUser: {
        fontSize: 14,
        color: Colors.White,
        marginTop: 8
    },
    textItem: {
        fontSize: 18,
        color: Colors.White,
        marginLeft: 15
    },
    buttonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8
    },
    divider: {
        width: '100%',
        borderBottomWidth: 0.5,
        borderColor: Colors.White,
        marginVertical: 8
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

// export default connect(null, mapDispatchToProps)(MenuItems)
export default (MenuItems)
