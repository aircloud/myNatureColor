/**
 * Created by Xiaotao on 21/10/2016.
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
    Navigator
} from 'react-native';
import {UrlPrefix} from "./configs/config";


export default class ColorResultList extends Component{

    constructor(props){
        super(props);
        console.log('from list view' , this.props.colorResult);
        var data =this.props.colorResult;
        console.log('from list view' , data);
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
        console.log("pressData",pressData);
        for (var ii = 0; ii < pressData.length; ii++) {
            var pressedText = pressData[ii];
            if(pressData[ii]){
                dataBlob[ii]={};
                dataBlob[ii].backgroundColor="rgba("+pressedText.r1+","+pressedText.g1+","+pressedText.b1+",1)";
                dataBlob[ii].backgroundColor2="#"+pressedText.r1.toString(16)+pressedText.g1.toString(16)+pressedText.b1.toString(16);
                if(pressedText.darkness1>160){
                    dataBlob[ii].color="#333333";
                }
                else{
                    dataBlob[ii].color="#eeeeee";
                }
            }
        }
        return dataBlob;
    }

    _pressRow(rowID) {
        console.log(rowID);
        console.log(this.props);
    }

    _renderRow(rowData, sectionID, rowID,) {
        var thisBackGroundColor=rowData.backgroundColor;
        return (
            <View style={[styles.colorView,{backgroundColor:rowData.backgroundColor}]}>
                <Text style={[{color:rowData.color}]}>{rowData.backgroundColor2}</Text>
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

    ListViewStyle:{
        flex:1,
        flexDirection:"column",
        marginBottom:20,
    },
    colorView: {
        flexDirection : "row",
        justifyContent : "center",
        // marginTop:50,
        width: 115,
        height:30,
        marginTop:5,
        marginBottom:5,
        alignSelf:"center",
        alignItems:'center',
    },

});

