
/**
 * Created by Xiaotao on 10/10/2016.
 * 这个页面主要用于上传投稿
 * 做着做着感觉这个页面有点多余了，暂时没有用到这个界面。
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
    CameraRoll
} from 'react-native';

import {GlobalStorage} from './Storage';
import {getIfPraise,getAllarticle,userlogin,usernotlogin,userlogout} from "../actions";
import UploadMyArticleListView from './UploadMyArticleListView';
import {UrlPrefix} from "./configs/config";

export default class UploadMyArticle extends Component{

    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return (
            <UploadMyArticleListView data={this.props.data}/>
        )
    }
}

var styles =  StyleSheet.create({


});