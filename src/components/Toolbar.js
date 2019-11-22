import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native'

import Colors from '../../res/Colors'

import IconEntypo from 'react-native-vector-icons/Entypo'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFeather from 'react-native-vector-icons/Feather'
import IconFontisto from 'react-native-vector-icons/Fontisto'



class Toolbar extends Component
{
    
    menu = () => {
        if(this.props.navigation)
            this.props.navigation.openDrawer()
    }

    render()
    {
        let iconLeft = null
        if(this.props.iconLeft)
        {
            iconLeft = <View style={styles.containerIconsLeft}>
                            <TouchableOpacity
                                onPress={this.menu}>
                                {/* disabled={this.props.isLoading}> */}
                                <IconMaterialCommunityIcons name= 'menu' size={36} color={Colors.White} />
                            </TouchableOpacity>
                        </View>
        }

        let textSubtitle = null
        if(this.props.subtitle)
        {
            textSubtitle = <Text style={styles.textSubtitle}>{this.props.subtitle}</Text>
        }

        let iconRight = null
        if(this.props.iconRight)
        {
            iconRight =  <View style={styles.containerIconsRight}>
                            <TouchableOpacity>
                                {/*  onPress={this.props.onLogout}> */}
                                {/* disabled={this.props.isLoading}> */}
                                <IconFontisto 
                                    name= 'search' size={24} color={Colors.White} />
                            </TouchableOpacity>
                        </View>
        }

        return (
            <View style={{...styles.container, height: this.props.subtitle ? 64: 56}}>
                <View style={styles.containerToolbar}>
                    {iconLeft}
                    <View style={styles.containerTexts}>
                        <Text style={styles.textTitle}>{this.props.title}</Text>
                        {textSubtitle}
                    </View>
                    {iconRight}
                </View>                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.ColorPrimary,
        justifyContent: 'center'
    },
    containerToolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        elevation: 4,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 3,
        // paddingTop: Platform.OS === 'ios' ? 35 : 10,
    },
    containerIconsLeft: {
        width: '15%',
        justifyContent: 'center'
    },
    containerTexts: {
        width: '70%',
        flexDirection: 'column'
    },
    containerIconsRight: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'flex-end'

    },
    textTitle: {
        fontSize: 22,
        color: Colors.White,
        // fontFamily: 'sans-serif-condensed',
        shadowRadius: 2,
        shadowColor: Colors.ColorPrimary

    },
    textSubtitle: {
        fontSize: 16,
        color: '#f7f7f7',
        // fontFamily: 'sans-serif-condensed',
        shadowRadius: 2,
        shadowColor: Colors.ColorPrimary,
        marginTop: -2
    },
})

export default Toolbar