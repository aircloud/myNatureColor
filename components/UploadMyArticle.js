
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
    CameraRoll
} from 'react-native';

import {GlobalStorage} from './Storage';
import {getIfPraise,getAllarticle,userlogin,usernotlogin,userlogout} from "../actions";
import UploadMyArticleListView from './UploadMyArticleListView';

export default class UploadMyArticle extends Component{

    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount() {

    }

    render(){
        return (
            <UploadMyArticleListView data={this.props.data}/>
        )
    }
}

var styles =  StyleSheet.create({


});