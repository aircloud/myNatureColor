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
    AlertIOS,
    ListView,
    RecyclerViewBackedScrollView,
    TouchableHighlight,
    Text,
    Navigator
} from 'react-native';

import SquareListDetail from "./SquareListDetail";

export default class SquareListView extends Component{

    constructor(props){
        super(props);
        var data=this.props.allAppArticles;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            dataSource: ds.cloneWithRows(this._genRows(data)),
        };
    }

    render(){
        return (
            <ListView
                style={styles.ListViewStyle}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
            />
        );
    }

    _genRows(pressData){
        var dataBlob = [];
        for (var ii = 0; ii < pressData.length; ii++) {
            var pressedText = pressData[ii];
            dataBlob.push(pressedText);
        }
        return dataBlob;
    }

    _pressRow(rowID) {
        console.log(rowID);
        console.log("from  listView pressrow",this.props);
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'SquareListDetail',
                component: SquareListDetail,
                params: {
                    id: rowID,
                }
            });
        }
    }

    _loadfavor(){
        var status = this.props.appUserStatus;
        console.log("from  listView pressrow:status",status);
        if(status.iflogin==0){
            AlertIOS.alert("Attention","请先登录后再点赞");
        }
        else if(status.iflogin==1){
            AlertIOS.alert("Attention","您已经登陆，可以点赞");
        }
    }

    _renderRow(rowData, sectionID, rowID,) {
        console.log(rowData);
        var thisBackGroundColor=rowData.backgroundColor;
        return (
            <View>
                <View style={[styles.row,{backgroundColor:thisBackGroundColor}]}>
                    <View style={styles.likeView}>
                        <Text style={styles.likeTextName}>{rowData.name}</Text>
                        <TouchableHighlight style={styles.likebutton} activeOpacity={1} underlayColor="rgba(255,255,255,0)" onPress={() => {
                            this._loadfavor();
                        }}>
                            <View style={styles.likebuttonView}>
                                <Text style={styles.likeText}>{rowData.favor}</Text>
                                <Image source={require('../images/like.png')} style={styles.like} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight activeOpacity={1} underlayColor="rgba(255,255,255,0)" onPress={() => {
                        this._pressRow(rowID);
                    }}>
                        <Image style={styles.thumb} source={{uri:rowData.image_uri}} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }


};

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

var styles = StyleSheet.create({
    row: {
        alignItems:'center',
        height:220,
        overflow:"hidden",
    },
    thumb: {
        // marginTop:50,
        width: 300,
        height:300,
        margin:10,
    },
    ListViewStyle:{
        flex:1
    },
    like:{
        width:15,
        height:15,
        marginTop:6
    },
    likeView:{
        width:300,
        flexDirection:'row',
        height:30,
        flex:1,
        justifyContent:"flex-end",
        alignItems:'flex-end',
    },
    likebutton:{
        flexDirection:'row',
    },
    likebuttonView:{
        flex:1,
        flexDirection:'row',
    },
    likeText:{
        fontSize:14,
        marginRight:3,
        color:"#eb4f38",
        marginTop:5,
    },
    likeTextName:{
        flex:1,
        fontSize:14,
        color:"#666666"
    }
});

