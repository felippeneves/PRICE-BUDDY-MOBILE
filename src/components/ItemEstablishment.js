import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'

import Strings from '../../res/Strings'
import Colors from '../../res/Colors'
import { MaskService } from 'react-native-masked-text'

class ItemEstablishment extends Component
{
    render()
    {
        let { name, addres, number, complement, neighborhood, city, state, phone, distance, photo } = this.props

        let addresComplete = addres + ', ' + number + (complement ? complement : '') + ' - ' + neighborhood
        let cityState = city + ' - ' + state

        let distanceMeters = this.convertMetersToKM(distance)
        let phoneWithMask = this.formatPhone(phone)
        let photoEstablishment = null
        
        if(photo)
            photoEstablishment = <Image style={styles.image} source={{uri: this.decodeImage(photo)}}/>
        else
            photoEstablishment = <Image style={styles.image} source={require('../../assets/not-found.jpg')}/>


        return(
            <TouchableOpacity style={styles.container}>
                <View style={styles.containerImage}>
                    {photoEstablishment}
                </View>
                <View style={styles.containerTexts}>
                    <Text style={{...styles.textItem, color: Colors.ColorPrimaryDark, marginBottom: -4}}>{Strings.Name}</Text>
                    <Text style={styles.textItem}>{name}</Text>

                    <Text style={{...styles.textItem, color: Colors.ColorPrimaryDark, marginBottom: -4}}>{Strings.Address}</Text>
                    <Text style={styles.textItem}>{addresComplete}</Text>

                    <Text style={{...styles.textItem, color: Colors.ColorPrimaryDark, marginBottom: -4}}>{Strings.City}</Text>
                    <Text style={styles.textItem}>{cityState}</Text>

                    <Text style={{...styles.textItem, color: Colors.ColorPrimaryDark, marginBottom: -4}}>{Strings.Phone}</Text>
                    <Text style={styles.textItem}>{phoneWithMask}</Text>

                    <Text style={{...styles.textItem, color: Colors.ColorPrimaryDark, marginBottom: -4}}>{Strings.Distance}</Text>
                    <Text style={styles.textItem}>{distanceMeters}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    convertMetersToKM(distance)
    {
        let distanceFormated = 0

        if(distance)
        {
            if(distance > 1000)
            {
                distanceFormated = distance / 1000 + ' Km'
                return distanceFormated.replace('.', ',')
            }
            else if (distance != 0)
            {
                distanceFormated = distance + ' Metros'
                return distanceFormated.replace('.', ',')
            }
        }
        
        return 0 + ' Metros'
    }

    decodeImage(imageBase64)
    {
        return 'data:image/png;base64,' + imageBase64
    }

    formatPhone(phone)
    {
       return MaskService.toMask('cel-phone', phone, {
            maskType: 'BRL',
            withDDD: true,
            dddMask: '+99 (99) '
       })
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        elevation: 3,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 3,
        backgroundColor: Colors.White,
        padding: 8,
        marginVertical: 8,
        marginHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerTexts:{
        flex: 1
    },
    textItem: {
        fontSize: 15,
        marginLeft: 8
    },
    containerImage:{
        
        borderColor: Colors.DarkGray,
        borderWidth: 1,
        marginRight: 8,
        padding: 8
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    }
})

export default ItemEstablishment
