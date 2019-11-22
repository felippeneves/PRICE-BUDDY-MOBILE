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

class ItemProduct extends Component
{
    render()
    {
        let { id, code, name, price, description, weight, establishmentID, establishmentName, establishmentDistance, photo} = this.props

        let distanceConvert = this.convertMetersToKM(establishmentDistance)
        let productNameComplet = name + (weight ? ' ' + weight : '')
        let priceWithMask = this.formatPrice(price)

        let photoProduct = null
        
        if(photo)
            photoProduct = <Image style={styles.image} source={{uri: this.decodeImage(photo)}}/>
        else
            photoProduct = <Image style={styles.image} source={require('../../assets/not-found.jpg')}/>

        return(
            <TouchableOpacity style={styles.container}>
                 <View style={styles.containerImage}>
                    {photoProduct}
                </View>
                <View style={styles.containerTexts}>
                    <Text style={{...styles.textItem, color: Colors.ColorPrimaryDark, marginBottom: -4}}>{Strings.Name}</Text>
                    <Text style={styles.textItem}>{productNameComplet}</Text>

                    <Text style={{...styles.textItem, color: Colors.ColorPrimaryDark, marginTop: 1, marginBottom: -4}}>{Strings.Price}</Text>
                    <Text style={styles.textItem}>{priceWithMask}</Text>

                    <Text style={{...styles.textItem, color: Colors.ColorPrimaryDark, marginTop: 1, marginBottom: -4}}>{Strings.Establishment}</Text>
                    <Text style={styles.textItem}>{establishmentName}</Text>

                    <Text style={{...styles.textItem, color: Colors.ColorPrimaryDark, marginTop: 1, marginBottom: -4}}>{Strings.Distance}</Text>
                    <Text style={styles.textItem}>{distanceConvert}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    convertMetersToKM(distance)
    {
        let distanceFormated = 0

        if(distance)
        {
            if(distance >= 1000)
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

    formatPrice(price)
    {
       return MaskService.toMask('money', price, {
            unit: 'R$ ',
            separator: ',',
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
        marginLeft: 8,
    },
    containerImage:{
        borderColor: Colors.DarkGray,
        borderWidth: 1,
        marginRight: 8,
        padding: 8
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    }
})

export default ItemProduct