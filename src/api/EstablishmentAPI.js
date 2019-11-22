import React from 'react'
import {API_ESTABLISHMENT, METHOD_GET, HEADER_ACCEPT} from '../info/ApplicationInfo'

export default class EstablishmentAPI
{
    async getEstablishments(token, latitude, longitude)
    {
        return fetch(API_ESTABLISHMENT.replace('{0}', encodeURIComponent(latitude)).replace('{1}', encodeURIComponent(longitude)) , {
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