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


export default class SquareListDetailListView extends Component{

    constructor(props){
        super(props);
        var data=[
            {source:{uri: "assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG", isStatic: true}},
            {source:{uri: "assets-library://asset/asset.JPG?id=99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7&ext=JPG", isStatic: true}},
            {source:{uri: "assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG", isStatic: true}},
            {source:{uri: "assets-library://asset/asset.JPG?id=99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7&ext=JPG", isStatic: true}},
            {source:{uri: "assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG", isStatic: true}},
            {source:{uri: "assets-library://asset/asset.JPG?id=99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7&ext=JPG", isStatic: true}},
        ];
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
        console.log(this.props);
    }

    _renderRow(rowData, sectionID, rowID,) {
        var thisBackGroundColor=rowData.backgroundColor;
        return (
            <View>
                <Image style={styles.thumb} source={rowData.source} />
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
        width: 320,
        height:320,
        marginTop:5,
        marginBottom:5,
    },

});

