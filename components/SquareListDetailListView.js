/**
 * Created by Xiaotao on 3/10/2016.
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

import isObjectEmpty from  './tools/Object.tools';
// var data=[
//     {source:{uri: "assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG", isStatic: true}},
//     {source:{uri: "assets-library://asset/asset.JPG?id=99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7&ext=JPG", isStatic: true}},
//     {source:{uri: "assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG", isStatic: true}},
//     {source:{uri: "assets-library://asset/asset.JPG?id=99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7&ext=JPG", isStatic: true}},
//     {source:{uri: "assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG", isStatic: true}},
//     {source:{uri: "assets-library://asset/asset.JPG?id=99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7&ext=JPG", isStatic: true}},
// ];
export default class SquareListDetailListView extends Component{

    constructor(props){
        super(props);
        var detailInfo = this.props.detailInfo;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            pending:false,
            dataSource: ds.cloneWithRows(this._genRows(detailInfo.photoList)),
            detailInfo,
        }
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
            dataBlob[ii]={};
            dataBlob[ii].source = {uri:pressedText.image_uri,isStatic:true};
            dataBlob[ii].image_width = pressedText.image_width==0?300:pressedText.image_width;
            dataBlob[ii].image_height = pressedText.image_height==0?300:pressedText.image_height;
            // dataBlob.push(pressedText);
        }
        return dataBlob;
    }

    _pressRow(rowID) {
        console.log(rowID);
        console.log(this.props);
    }

    _renderRow(rowData, sectionID, rowID,) {
        console.log("sldlv rowdata",rowData);
        var thisBackGroundColor=rowData.backgroundColor;
        return (
            <View>
                <Image style={[styles.thumb,{width:rowData.image_width,height:rowData.image_height}]} source={rowData.source} />
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
    ListViewStyle:{
      width:300
    },
    thumb: {
        // marginTop:50,
        marginTop:5,
        marginBottom:5,
    },

});

