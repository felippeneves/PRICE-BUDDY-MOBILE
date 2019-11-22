import React from 'react'
import {API_USER, METHOD_POST, HEADER_ACCEPT, HEADER_CONTENT_TYPE} from '../info/ApplicationInfo'

export default class UserAPI
{
    async registerUser(userEmail, userName, userLastName, UserPassword, userPhone)
    {
        return fetch(API_USER, {
            method: METHOD_POST,
            headers: {
                Accept: HEADER_ACCEPT,
                'Content-Type': HEADER_CONTENT_TYPE
            },
            body: JSON.stringify([{
                'USER_EMAIL': userEmail,
                'USER_NAME': userName,
                'USER_LAST_NAME': userLastName,
                'USER_PASSWORD': UserPassword,
                'USER_PHONE': userPhone
                }]),
        }).then(response => {
            const statusCode = response.status
            const data = response.json()
            return Promise.all([statusCode, data])
        }).catch(erro => {
            console.log(erro.stack)
        })
    }
}
