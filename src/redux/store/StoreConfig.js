import {createStore, combineReducers} from 'redux'

import UserReducer from '../reducers/UserReducer'


const reducers = combineReducers({
    user: UserReducer,
})

const StoreConfig = () => {
    return createStore(reducers)
}

export default StoreConfig