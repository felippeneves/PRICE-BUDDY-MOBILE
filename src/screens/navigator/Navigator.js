import React, {Component} from 'react'
import {createAppContainer, StackActions, NavigationActions} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'

//Menu Items
import MenuItems from '../../components/MenuItems'

//Screns
import SplashScreen from '../SplashScreen'
import Home from '../Home'
import Register from '../Register'
import Login from '../Login'
import Establishment from '../Establishment'
import Product from '../Product'
import ProductInformation from '../ProductInformation'
import EstablishmentProducts from '../EstablishmentProducts'
import EstablishmentsMap from '../EstablishmentsMap'

//Constants 

//Routes
export const ROUTE_SPLASH = 'SplashScreen'
export const ROUTE_ACCESS = 'routeAccess'
export const ROUTE_MAIN = 'routeMain'

//Screens
export const SCREEN_HOME = 'Home'
export const SCREEN_REGISTER = 'Register'
export const SCREEN_LOGIN = 'Login'
export const SCREEN_ESTABLISHMENT = 'Establishment'
export const SCREEN_PRODUCT = 'Product'
export const SCREEN_PRODUCT_INFORMATION = 'ProductInformation'
export const SCREEN_ESTABLISHMENT_PRODUCTS = 'EstablishmentProducts'
export const SCREEN_ESTABLISHMENTS_MAP = 'EstablishmentsMap'



export const openScreenInAnotherRoute = (routeName, navigation) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: routeName })],
    })
    navigation.dispatch(resetAction)
}

const AppNavigator = createStackNavigator({
    SplashScreen: {
        screen: SplashScreen,
    },
    routeAccess : createStackNavigator({
        Home: {
            screen: Home,
        },
        Register: {
            screen: Register,
        },
        Login: {
            screen: Login,
        },
        },
        {
            initialRouteName: SCREEN_LOGIN,
            headerMode: 'none',
        }),
    routeMain: createDrawerNavigator({
        Establishment: {
            screen: Establishment,
        },
        Product: {
            screen: Product,
        },
        ProductInformation: {
            screen: ProductInformation,
        },
        EstablishmentProducts: {
            screen: EstablishmentProducts,
        },
        EstablishmentsMap: {
            screen: EstablishmentsMap,
        },
        },
        {
            initialRouteName: SCREEN_ESTABLISHMENT,
            navigationOptions: {
            },
            contentComponent: MenuItems,
            drawerWidth: '70%',
            drawerPosition: 'left'
        })
    },
    {
        initialRouteName: ROUTE_SPLASH,
        headerMode: 'none',
    })


export default createAppContainer(AppNavigator)
