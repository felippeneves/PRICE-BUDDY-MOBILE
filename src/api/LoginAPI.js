import React from 'react'
import {API_LOGIN, METHOD_POST, HEADER_ACCEPT, HEADER_CONTENT_TYPE} from '../info/ApplicationInfo'


export default class LoginAPI
{
    async login(userEmail, UserPassword)
    {
        return fetch(API_LOGIN, {
            method: METHOD_POST,
            headers: {
                Accept: HEADER_ACCEPT,
                'Content-Type': HEADER_CONTENT_TYPE
            },
            body: JSON.stringify([{
                'USER_EMAIL': userEmail,
                'USER_PASSWORD': UserPassword,
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
