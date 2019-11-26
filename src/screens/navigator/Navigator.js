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
import QRCode from '../QRCode'
import MyProfile from '../MyProfile'
import EstablishmentInformation from '../EstablishmentInformation'

//Constants 

//Routes
export const ROUTE_SPLASH = 'SplashScreen'
export const ROUTE_ACCESS = 'routeAccess'

//Screens
export const SCREEN_HOME = 'Home'
export const SCREEN_REGISTER = 'Register'
export const SCREEN_LOGIN = 'Login'
export const SCREEN_ESTABLISHMENT = 'Establishment'
export const SCREEN_PRODUCT = 'Product'
export const SCREEN_PRODUCT_INFORMATION = 'ProductInformation'
export const SCREEN_ESTABLISHMENT_PRODUCTS = 'EstablishmentProducts'
export const SCREEN_ESTABLISHMENTS_MAP = 'EstablishmentsMap'
export const SCREEN_MY_PROFILE = 'MyProfile'
export const SCREEN_ESTABLISHMENT_INFORMATION = 'EstablishmentInformation'


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
    Login: {
        screen: Login,
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
    Establishment: createDrawerNavigator({
        Establishment: {
            screen: Establishment,
        },
        },
        {
            contentComponent: MenuItems,
            drawerWidth: '70%',
            drawerPosition: 'left'
    }),
    Product: createDrawerNavigator({
        Product: {
            screen: Product,
        },
        },
        {
            contentComponent: MenuItems,
            drawerWidth: '70%',
            drawerPosition: 'left'
    }),
    ProductInformation: createDrawerNavigator({
        ProductInformation: {
            screen: ProductInformation,
        },
        },
        {
            contentComponent: MenuItems,
            drawerWidth: '70%',
            drawerPosition: 'left'
    }),
    EstablishmentProducts: createDrawerNavigator({
        EstablishmentProducts: {
            screen: EstablishmentProducts,
        },
        },
        {
            contentComponent: MenuItems,
            drawerWidth: '70%',
            drawerPosition: 'left'
    }),
    EstablishmentsMap: createDrawerNavigator({
        EstablishmentsMap: {
            screen: EstablishmentsMap,
        },
        },
        {
            contentComponent: MenuItems,
            drawerWidth: '70%',
            drawerPosition: 'left'
    }),
    MyProfile: createDrawerNavigator({
        MyProfile: {
            screen: MyProfile,
        },
        },
        {
            contentComponent: MenuItems,
            drawerWidth: '70%',
            drawerPosition: 'left'
    }),
    EstablishmentInformation: createDrawerNavigator({
        EstablishmentInformation: {
            screen: EstablishmentInformation,
        },
        },
        {
            contentComponent: MenuItems,
            drawerWidth: '70%',
            drawerPosition: 'left'
    }),
    QRCode: {
        screen: QRCode,
    },
    },
    {
        initialRouteName: ROUTE_SPLASH,
        headerMode: 'none',
    })


export default createAppContainer(AppNavigator)
