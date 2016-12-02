
/**
 * Created by Xiaotao.Nie on 25/10/2016.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
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
    CameraRoll,
    Dimensions
} from 'react-native';

import {GlobalStorage} from './Storage';

import {UrlPrefix} from "./configs/config";


var {height, width} = Dimensions.get('window');

export default class CenterEachHistoryBlockList extends Component{
    constructor(props){
        super(props);
        var data =this.props.colorInfo;
        var length = data.length;
        var blockHeight = Math.ceil(length/3)*40+10;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            length,blockHeight,
            dataSource: ds.cloneWithRows(this._genRows(data)),
        };
    }

    render(){
        return (
            <ListView
                style={styles.ListViewStyle}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                contentContainerStyle={[styles.list,{height:this.state.blockHeight}]}
            />
        );
    }

    _genRows(pressData){
        var dataBlob = [];
        var darkness;
        for (var ii = 0; ii < pressData.length; ii++) {
            var pressedText = pressData[ii];
            dataBlob[ii]={};
            //pressedText要传16进制的
            dataBlob[ii].backgroundColor="#"+pressedText;
            dataBlob[ii].backgroundColor2="#"+pressedText;

            darkness=parseInt(pressedText.slice(0,2),16)*0.229+parseInt(pressedText.slice(2,4),16)*0.587+parseInt(pressedText.slice(4,6),16)*0.114;

            if(darkness>160) {
                dataBlob[ii].color = "#333333";
            }
            else{
                dataBlob[ii].color="#eeeeee";
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
}

var styles =  StyleSheet.create({
    ListViewStyle:{
        flex:1,
        // justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // alignItems: 'flex-start',
        // width:300,
    },
    list: {
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft:5,
        marginRight:5,
    },
    colorView: {
        flexDirection : "row",
        justifyContent : "center",
        // marginTop:50,
        width: 105,
        height:30,
        marginTop:7,
        marginBottom:5,
        marginLeft:5,
        marginRight:5,
        alignSelf:"center",
        alignItems:'center',
    },
});