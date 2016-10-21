/**
 * Created by Xiaotao on 2/10/2016.
 */

'use strict';

import React, { Component } from 'react';
import {
    StatusBar,
    AppRegistry,
    StyleSheet,
    Image,
    View,
    ListView,
    RecyclerViewBackedScrollView,
    TouchableHighlight,
    Text,
    Navigator,
    ScrollView,
    AlertIOS
} from 'react-native';

import SquareListDetailListView from './SquareListDetailListView';
import isObjectEmpty from  './tools/Object.tools';

export default class SquareListDetail extends Component{
    constructor(props){
        super(props);

        var UID = this.props.uid;
        var detailInfo = "";
        fetch("https://back.10000h.top/getdetail/" + UID).then((response)=>response.json()).then((responseText)=> {
            console.log(responseText);
            this.setState({
                detailInfo:responseText,
                text:responseText.content,
                name:responseText.name,
                listbackgroundColor:responseText.backgroundColor,
                favor:responseText.favor,
            });
        });

        this.state={
            detailInfo,
            source:{uri: "assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG", isStatic: true},
            listbackgroundColor:"#ffffff",
            text:"正在更新",
            name:'正在更新...',
            favor:'',
        };
    }

    _loadfavor(UID){
        console.log("from list view state:",this.state.dataSource);

        var status = this.props.appUserStatus;
        const dispatch = this.props.dispatch;

        console.log("from  listView pressrow:status",status);
        if(status.iflogin==0){
            AlertIOS.alert("Attention","请先登录后再点赞");
        }
        else if(status.iflogin==1){
            var temp_phone = status.phone;
            fetch("https://back.10000h.top/userfavor?phone="+temp_phone+"&articleuid="+UID).then(response=>response.json()).then(
                (responseText)=>{
                    if(responseText.find==1){
                        AlertIOS.alert("Attention","您已经点过赞了，请勿重复点赞");
                    }
                    else{
                        //这里该dispatch一下...
                        fetch("https://back.10000h.top/adduserfavor?phone="+temp_phone+"&articleuid="+UID).then(response2=>response2.json()).then(
                            (responseText2)=>{
                                if(responseText2.success==1){
                                    dispatch(adduserfavor(UID));
                                    setTimeout(()=> {
                                        this.setState({
                                            dataSource:this.state.dataSource.cloneWithRows(this._genRows(this.props.allAppArticles))
                                        });
                                        console.log(this.props.allAppArticles);
                                    },20);
                                    AlertIOS.alert("Attention","您已经点赞成功");
                                }
                                else{
                                    AlertIOS.alert("Attention","由于网络错误未能点赞成功");
                                }
                            });
                    }
                });
        }
    }

    render(){
        if(this.state.detailInfo==""){
            return (
                <ScrollView style={[styles.ScrollViewStyle,{backgroundColor:this.state.listbackgroundColor}]}>
                    <View style={[styles.listDetailView, {backgroundColor: this.state.listbackgroundColor}]}>
                        <View style={styles.thisDetailView}>
                            <View style={styles.thisDetailViewBorder}>
                                <View style={styles.likeView}>
                                    <Text style={styles.likeTextName}>{this.state.name}</Text>
                                    <TouchableHighlight style={styles.likebutton} activeOpacity={1} underlayColor="rgba(255,255,255,0)" onPress={() => {
                                        this._loadfavor(this.props.uid);
                                    }}>
                                        <View style={styles.likebuttonView}>
                                            <Text style={styles.likeText}>{this.state.favor}</Text>
                                            <Image source={require('../images/like.png')} style={styles.like}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <Text style={styles.thisDetailText}>
                                {this.state.text}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            )
        }
        else {
            return (
                <ScrollView style={[styles.ScrollViewStyle,{backgroundColor:this.state.listbackgroundColor}]}>
                    <View style={[styles.listDetailView, {backgroundColor: this.state.listbackgroundColor}]}>
                        <View style={styles.thisDetailView}>
                            <View style={styles.thisDetailViewBorder}>
                                <View style={styles.likeView}>
                                    <Text style={styles.likeTextName}>易小天</Text>
                                    <TouchableHighlight style={styles.likebutton} activeOpacity={1} underlayColor="rgba(255,255,255,0)" onPress={() => {
                                        this._loadfavor(this.props.uid);
                                    }}>
                                        <View style={styles.likebuttonView}>
                                            <Text style={styles.likeText}>1550</Text>
                                            <Image source={require('../images/like.png')} style={styles.like}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <Text style={styles.thisDetailText}>
                                {this.state.text}
                            </Text>

                            <SquareListDetailListView detailInfo={this.state.detailInfo}/>

                            <View style={styles.tipView}>
                                <Text style={styles.tip}>
                                    已经到底啦，左滑返回
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )
        }
    }

}

var styles = StyleSheet.create({
    listDetailView:{
        flex:1,
        alignItems:'center',
    },
    thisDetailView:{
        alignItems:'center',
    },
    thisDetailImage:{
        width:320,
        height:320,
    },
    thisDetailText:{
        width:300,
        textAlign:'justify',
        marginBottom:15,
        marginTop:15,
    },
    like:{
        marginTop:5,
        width:15,
        height:15,
    },
    likeView:{
        width:320,
        flexDirection:'row',
        height:30,
        flex:1,
        justifyContent:"flex-end",
        alignItems:'flex-end',
        marginBottom:15,
    },
    likeText:{
        fontSize:14,
        marginRight:3,
        color:"#eb4f38",
        marginTop:5,
    },
    likebutton:{
        flexDirection:'row',
    },
    likebuttonView:{
        flex:1,
        flexDirection:'row',
    },
    thisDetailViewBorder:{
        borderBottomWidth:1,
        borderBottomColor:"#444444",
    },
    likeTextName:{
        flex:1,
        fontSize:14,
        color:"#666666"
    },
    ScrollViewStyle:{
        flex:1,
    },
    tipView:{
        width:320,
    },
    tip:{
        fontSize:14,
        color:"#666666",
        marginTop:15,
        marginBottom:70
    }
});


