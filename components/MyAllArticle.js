
/**
 * Created by Xiaotao on 10/10/2016.
 * 这个页面主要用于上传投稿
 */
import React, { Component } from 'react';
import {
    ActivityIndicator,
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
import ArticleListView from './ArticleListView';
import {UrlPrefix} from "./configs/config";

export default class MyAllArticle extends Component{

    constructor(props){
        super(props);

        this.state={
            ifgetArticle:0
        };
        //在这里进行fetch
        GlobalStorage.load({
            key:'user',
            autoSync:true,
            syncInBackground: false,
        }).then(resp=>{
            this.setState ({
                phone:resp.phone,
                name:resp.name,
                islogin:1,
            });
            fetch("https://back.10000h.top/getuserarticle/"+resp.phone).then(response=>response.json()).then(
                (responseText)=>{
                    console.log("this person article",responseText);
                    this.setState({
                        allmyArticles:responseText,
                        ifgetArticle:1,
                    });
                });
            console.log(this.state);
        }).catch(err => {
            this.setState({
                islogin:0
            });
            //do nothing
            //理论上这种情况不是很可能发生
        });
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

        if(this.state.ifgetArticle==1&&this.state.islogin==1) {
            return (
                <View style={styles.MyAllArticleTopView}>
                    <View style={styles.MyAllArticleAddView}>
                        <TouchableHighlight activeOpacity={1} onPress={this._toUploadArticle.bind(this)}
                                            underlayColor="rgba(255,255,255,0)">
                            <View style={styles.addachor}>
                                <Image source={require("../images/add1.png")} style={styles.addIcon}/>
                                <Text style={styles.addText}>
                                    上传稿件
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.myAllInfo}>
                        <Text style={styles.myAllInfoText}>
                            我目前的投稿:
                        </Text>

                        <View style={styles.myArticleView}>
                            <ArticleListView
                                style={styles.myArticleListView}
                                navigator={this.props.navigator}
                                dispatch={this.props.dispatch}
                                allAppArticles={this.state.allmyArticles}
                                appUserStatus={this.props.appUserStatus}
                            />
                        </View>
                    </View>
                </View>
            )
        }
        else if(this.state.ifgetArticle==0&&this.state.islogin==1){
            return (
                <View style={styles.MyAllArticleTopView}>
                    <View style={styles.MyAllArticleAddView}>
                        <TouchableHighlight activeOpacity={1} onPress={this._toUploadArticle.bind(this)}
                                            underlayColor="rgba(255,255,255,0)">
                            <View style={styles.addachor}>
                                <Image source={require("../images/add1.png")} style={styles.addIcon}/>
                                <Text style={styles.addText}>
                                    上传稿件
                                </Text>
                            </View>

                        </TouchableHighlight>
                    </View>
                    <View style={styles.myAllInfo}>
                        <Text style={styles.myAllInfoText}>
                            我目前的投稿:
                        </Text>
                        <View style={styles.myArticleView}>
                            <ActivityIndicator
                                style={[styles.centering,]}
                                color="#333333"
                            />
                        </View>
                    </View>
                </View>
            )
        }
        else{
            return (
                <View style={styles.MyAllArticleTopView}>
                    <View style={styles.myAllInfo}>
                        <View style={styles.myArticleView}>
                            <Text style={styles.pleaseLogin}>请先登录
                        </Text>
                            <Text style={styles.pleaseLogin2}>&lt;左滑返回
                            </Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

var styles =  StyleSheet.create({
    MyAllArticleTopView:{
        flex:1,
        backgroundColor:"#F3F4F8",
    },
    MyAllArticleAddView:{
        margin:20,
        marginBottom:5,
        justifyContent:"flex-end",
        height:25,
        flexDirection:"row"
    },
    addachor:{
        height:25,
        width:100,
        justifyContent:"flex-end",
        flexDirection:"row"
    },
    addIcon:{
        width:20,
        height:20,
        marginRight:3,
    },
    addText:{
        width:75,
        fontSize:18,
        marginTop:1
    },
    myAllInfo:{
        flex:1,
        marginLeft:20,
        marginRight:20,
        marginTop:5,
    },
    myAllInfoText:{
        marginBottom:10,
    },
    myArticleView:{
        flex:1,
        alignItems:'center'
    },
    myArticleListView:{
        flex:1,
        flexDirection:"column"
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    pleaseLogin:{
        marginTop:120,
        fontSize:24,
        color:"#999999",
    },
    pleaseLogin2:{
        marginTop:10,
        fontSize:14,
        color:"#4A90E2",
        opacity:0.8
    }

});