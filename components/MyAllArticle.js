
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
// import UploadMyArticleListView from './UploadMyArticleListView';
import PhotoSelector from './PhotoSelector';
// import UploadMyArticleStep2 from './UploadMyArticleStep2';


export default class MyAllArticle extends Component{

    constructor(props){
        super(props);

    }

    _toUploadArticle(){
        CameraRoll.getPhotos({first:10}).then((data) => {
            console.log("from to upload attention",data);
            for(let ii=0;ii<data.edges.length;ii++) {
                data.edges[ii].selectImageState = require('../images/select.png');
                data.edges[ii].selectstate=0;
                data.edges[ii].selectbackground="rgba(0,0,0,0)";
            }
            let _this = this;
            const { navigator } = this.props;
            if(navigator) {
                navigator.push({
                    name: 'UploadMyArticleListView',
                    component: PhotoSelector,
                    params: {
                        navigator:{navigator},
                        dispatch:_this.props.dispatch,
                        data:data.edges,
                        nextNavName:"UploadMyArticleStep2",
                        // nextNav:UploadMyArticleStep2,
                    }
                });
            }
        });
    }

    render(){
        return (
            <View style={styles.MyAllArticleTopView}>
                <View>
                    <TouchableHighlight activeOpacity={1} onPress={this._toUploadArticle.bind(this)} underlayColor="rgba(255,255,255,0)">
                        <Text>
                            上传稿件
                        </Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <Text>
                        我目前的投稿...
                    </Text>
                </View>
            </View>
        )
    }
}

var styles =  StyleSheet.create({
    MyAllArticleTopView:{

    }

});