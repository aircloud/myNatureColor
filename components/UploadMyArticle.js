
/**
 * Created by Xiaotao on 10/10/2016.
 * 这个页面主要用于上传投稿
 */
import React, { Component } from 'react';
import {
    StatusBar,
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    View,
    ListView,
    Navigator,
    TouchableHighlight,
} from 'react-native';

import {GlobalStorage} from './Storage';
import {getIfPraise,getAllarticle,userlogin,usernotlogin,userlogout} from "../actions";

export default class TextExplain extends Component{

    constructor(props){
        super(props);

    }

    render(){
        return (
            <View>
                <Text>

                </Text>
            </View>
        )
    }
}

var styles =  StyleSheet.create({


});