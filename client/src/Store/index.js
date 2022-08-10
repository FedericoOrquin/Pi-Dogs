import {createStore,applyMiddleware} from 'redux';//ahora se usa configureStore
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers'


const store= createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

export default store; 



