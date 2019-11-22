import {API_PRODUCT, API_ESTABLISHMENT_PRODUCTS, METHOD_GET, HEADER_ACCEPT} from '../info/ApplicationInfo'

export default class ProductAPI
{
    async getProducts(token, productInfo, establishmentID, latitude, longitude)
    {
        let callAPI = null

        if(productInfo)
        {
            callAPI = API_PRODUCT.replace('{0}', encodeURIComponent(productInfo)).replace('{1}', 
                        encodeURIComponent(latitude)).replace('{2}', encodeURIComponent(longitude))
        }
        else
        {
            callAPI = API_ESTABLISHMENT_PRODUCTS.replace('{0}', encodeURIComponent(establishmentID)).replace('{1}', 
                        encodeURIComponent(latitude)).replace('{2}', encodeURIComponent(longitude))
        }
       
    
        return fetch(callAPI , {
            method: METHOD_GET,
            headers: {
                Accept: HEADER_ACCEPT,
                'Authorization': 'Bearer ' + token
            },
        }).then(response => {
            const statusCode = response.status
            const data = response.json()
            return Promise.all([statusCode, data])
        }).catch(erro => {
            console.log(erro.stack)
        })
    }
}