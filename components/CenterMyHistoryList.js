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
import CenterEachHistoryBlockList from './CenterEachHistoryBlockList';

var {height, width} = Dimensions.get('window');

export default class CenterMyHistoryList extends Component{
    constructor(props){
        super(props);
        var detailInfo = this.props.detailInfo;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            pending:false,
            dataSource: ds.cloneWithRows(this._genRows(detailInfo)),
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
            dataBlob[ii].image_width = width;
            dataBlob[ii].image_height = pressedText.height/pressedText.width*width;
            console.log("dataBlob[ii].image_height,dataBlob[ii].image_width,", dataBlob[ii].image_height,dataBlob[ii].image_width);
            dataBlob[ii].colorInfo = pressedText.result.split("_");
            dataBlob[ii].borderTopColor = "#"+dataBlob[ii].colorInfo[0];
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
        var all_height = rowData.image_height+Math.ceil(rowData.colorInfo.length/3)*40+10;
        console.log('realheight',rowData.image_height,all_height);
        var thisBackGroundColor=rowData.backgroundColor;
        return (
            <View style={[styles.eachHistoryBlock,{height:all_height}]}>
                <View style={[{height:rowData.image_height}]} >
                    <Image style={[styles.thumb,{width:rowData.image_width,height:rowData.image_height}]} source={rowData.source} />
                </View>
                <View>
                    <CenterEachHistoryBlockList colorInfo = {rowData.colorInfo}/>
                </View>
            </View>
        );
    }

}

var styles =  StyleSheet.create({
    ListViewStyle:{
        flex:1,
        backgroundColor:"#f3f4f8",
        // width:300,
    },
    thumb: {
        marginBottom:5,
    },
    eachHistoryBlock:{
        // width:120,
        flex:1,
        marginBottom:15,
        // borderTopWidth:5,
        backgroundColor:"#ffffff",
        // borderTopColor:"#ffffff",
    }
});