/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducer from './reducers';
import HomeApp from "./HomeApp.js";

//middleware配置
const middleware = [ thunk ];

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);
//结束middleware配置

export default class ProviderHomeApp extends Component{
    render(){
        return(
            <Provider store={store} >
                <HomeApp />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('HomeApp', () => ProviderHomeApp);
