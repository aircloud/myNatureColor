/**
 * Created by Xiaotao on 20/10/2016.
 */

'use strict';

import React, { Component } from 'react';
import {
    StatusBar,
    CameraRoll,
    AppRegistry,
    StyleSheet,
    Image,
    ScrollView,
    View,
    ListView,
    RecyclerViewBackedScrollView,
    TouchableHighlight,
    Text,
    Navigator,
    AlertIOS
} from 'react-native';
var PAGE_SIZE = 20;

// var XHRExampleHeaders = require('./XHRExampleHeaders');
// var XHRExampleFetch = require('./XHRExampleFetch');
// var XHRExampleOnTimeOut = require('./XHRExampleOnTimeOut');
// var XHRExampleCookies = require('./XHRExampleCookies');
import ColorResultList from './ColorResultList';
import {UrlPrefix} from "./configs/config";

export default class ColorImageUpload extends Component {
    constructor(props) {
        super(props);
        var info = JSON.parse(this.props.info);
        var imageSource = {uri:info.uri,isStatic:true};
        var imageHeight = info.height*300/info.width;
        var imageWidth = 300;
        var colorResult =info.result;
        console.log("colorResult" , colorResult,imageSource,imageHeight);
        this.state = {
            imageSource,imageHeight,imageWidth,colorResult
        };
    }

    _saveThisPic(){
        var image = this.state.imageSource;
        CameraRoll.saveToCameraRoll(image.uri).then(function (success) {
                AlertIOS.alert(
                    '',
                    '保存到相册成功',
                    [
                        {text: '确定', onPress: () => console.log(success)}
                    ]
                )
            }, function (error) {
                AlertIOS.alert(
                    '',
                    '保存到相册失败',
                    [
                        {text: '确定', onPress: () => console.log(error)}
                    ]
                )
            }
        )
    }

    render(){
        return(
            <ScrollView style={styles.topView} alwaysBounceHorizontal={false} bounces={false}>
                <View></View>
                <View style={styles.text1View}>
                    <Text>经过naco的超过 </Text>
                    <Text>100,000,000 </Text>
                    <Text>次计算</Text>
                </View>
                <View style={styles.text2View}>
                    <Text>从当前图片中提取的颜色为</Text>
                    <Text></Text>
                </View>
                <View style={styles.colorResultListView}>
                    <ColorResultList colorResult = {this.state.colorResult} />
                </View>
                <View style={styles.ImageView}>
                    <Image source={this.state.imageSource} style={[styles.ImageStyle,{ height:this.state.imageHeight,width:this.state.imageWidth}]}/>
                </View>
                <TouchableHighlight style={styles.toSaveTextView} activeOpacity={1} onPress={this._saveThisPic.bind(this)} underlayColor="rgba(255,255,255,0)">
                    <View style={styles.toSaveTextViewSon}>
                        <Image source={require("../images/download2.png")} style={styles.download} />
                        <Text style={styles.downloadText}>保存到本地</Text>
                    </View>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}

var styles = StyleSheet.create({
    topView:{
        flexDirection:"column",
        backgroundColor:"#F3F4F8",
        marginBottom:50,
        // flex:1,
    },
    logoView:{

    },
    text1View:{
        marginTop:15,
        alignItems:'center',
        marginBottom:15,
    },
    text2View:{
        alignItems:'center',
    },
    text3View:{

    },
    colorResultListView:{
        flex:2,
        alignItems:'center',
    },
    ImageView:{
        alignItems:'center',
    },
    ImageStyle:{

    },
    toSaveTextView:{
        alignItems:"center",
        // width:300,
        marginTop:15,
        marginBottom:20,
    },
    toSaveTextViewSon:{
        flexDirection:'row'
    },
    download:{
        width:15,
        height:15,
        marginRight:10,
    },
    downloadText:{

    }

});