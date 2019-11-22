import {
    USER_LOGGED_IN, 
    USER_LOGGED_OUT, 
} from '../actions/ActionsType'

const initialState = {
    email: '',
    userId: '',
    name: '',
    lastName: '',
    phone: '',
    accessToken: '',
}

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case USER_LOGGED_IN:
            return {
                ...state,
                email: action.payload.email,
                userId: action.payload.userId,
                name: action.payload.name,
                lastName: action.payload.lastName,
                phone: action.payload.phone,
                accessToken: action.payload.accessToken,
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                email: null,
                userId: null,
                name: null,
                lastName: null,
                phone: null,
                accessToken: null,
            }
        default:
            return state
    }
}

export default reducer