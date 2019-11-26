import {API_ESTABLISHMENT_UNIQUE, METHOD_GET, HEADER_ACCEPT} from '../info/ApplicationInfo'

export default class EstablishmentUniqueAPI
{
    async getEstablishment(token, establishmentID)
    {
        let callAPI = API_ESTABLISHMENT_UNIQUE.replace('{0}', encodeURIComponent(establishmentID))
    
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
