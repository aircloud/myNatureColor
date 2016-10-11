/**
 * Created by hh on 10/10/2016.
 */

'use strict';

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
    CameraRoll,
    AlertIOS
} from 'react-native';

import UploadMyArticleStep2 from './UploadMyArticleStep2';

export default class UploadMyArticleListView  extends Component{

    constructor(props){
        super(props);
        var data = this.props.data;
        var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>{
            console.log("r1,,r2",r1,r2);
            if(r1.selectstate !== r2.selectstate){
                console.log('rowHasChanged!')
            }else {
                console.log('rowHasNotChanged')
            }
            return r1.selectstate !== r2.selectstate;
        }});
        this.state = {
            selectImage:[],
            data:data,
            dataSource: ds.cloneWithRows(this._genRows(data)),
        };
    }

    componentWillMount() {
        this._pressData = {};
    }

    _nextStep(){

        var selectImage = this.state.selectImage;
        var finallength = selectImage.length;

        if(finallength==0){
            AlertIOS.alert("Attention", "请至少选择一张图片");
        }
        else {
            let _this = this;
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'UploadMyArticleStep2',
                    component: UploadMyArticleStep2,
                    params: {
                        navigator: {navigator},
                        dispatch: _this.props.dispatch,
                        selectImage: selectImage,
                    }
                });
            }
        }
    }

    render() {
        var number  = this.state.selectImage.length;
        return (
            // ListView wraps ScrollView and so takes on its properties.
            // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
            <View>
                <View style={styles.topBarView}>
                    <View style={styles.topBarView1}>
                        <Text style={styles.topBarText1}>选择照片({number})</Text>
                    </View>
                    <TouchableHighlight onPress={this._nextStep.bind(this)} underlayColor="transparent">
                        <View style={styles.topBarView2}>
                            <Text style={styles.topBarText2}>下一步</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <ListView
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataSource}
                    initialListSize={28}
                    pageSize={3} // should be a multiple of the no. of visible cells per row
                    scrollRenderAheadDistance={500}
                    renderRow={this._renderRow.bind(this)}
                />
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        console.log("rowdata",rowData,rowID);
        var imgSource = {source:{uri: rowData.node.image.uri, isStatic: true}};
        var selectImgSource = rowData.selectImageState;
        var selectBackground=rowData.selectbackground;
        console.log("selectBakc",selectBackground);
        console.log("imgsource",imgSource);
        return (
            <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="transparent">
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={imgSource.source} >
                            <View style={[styles.selectViewstyle,{backgroundColor:selectBackground}]}>
                                <Image style={styles.thumbSelect} source={selectImgSource}/>
                            </View>
                        </Image>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _genRows(pressData){
        var dataBlob = [];
        console.log("pressData",pressData);
        for (var ii = 0; ii < pressData.length; ii++) {
            dataBlob[ii]={};
            dataBlob[ii].selectImageState=pressData[ii].selectImageState;
            dataBlob[ii].selectstate=pressData[ii].selectstate;
            dataBlob[ii].node=pressData[ii].node;
            dataBlob[ii].selectbackground=pressData[ii].selectbackground;
        }
        console.log("datablob",dataBlob);
        return dataBlob;
    }

    _pressRow(rowID) {
        var data2 = this.state.data;
        var selectImage = this.state.selectImage;
        var tempindex =selectImage.indexOf(data2[rowID].node.image.uri);
        console.log("unselect",tempindex,selectImage,data2);
        if(tempindex>-1) {
            selectImage.splice(tempindex,1);
            data2[rowID].selectImageState = require('../images/select.png');
            data2[rowID].selectstate = 0;
            data2[rowID].selectbackground = "rgba(0,0,0,0)";
            this.setState({
                selectImage:selectImage,
                data: data2,
                dataSource: this.state.dataSource.cloneWithRows(this._genRows(data2))
            });
        }
        else{
            console.log("data2before", data2[rowID].selectstate);
            data2[rowID].selectImageState = require('../images/selected.png');
            data2[rowID].selectstate = 1;
            data2[rowID].selectbackground = "rgba(0,0,0,0.5)";
            selectImage.push(data2[rowID].node.image.uri);
            console.log("select image",selectImage);
            console.log("data2after", data2[rowID].selectstate);
            this.setState({
                selectImage:selectImage,
                data: data2,
                dataSource: this.state.dataSource.cloneWithRows(this._genRows(data2))
            });
            console.log("hello world");
        }
    }
    /* eslint no-bitwise: 0 */
}

var styles = StyleSheet.create({
    topBarView:{
        height:45,
        backgroundColor:"#333333",
        flexDirection: 'row',
    },
    topBarView1:{
        flex:1,
        marginLeft:100,
        marginTop:13,
        alignItems: 'center'
    },
    topBarView2:{
        width:100,
        marginTop:17,
        alignItems: 'center'
    },
    topBarText1:{
        color:"#ffffff",
        fontSize:17,
    },
    topBarText2:{
        color:"#ffffff",
        fontSize:15,
    },
    list: {
        flex:1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    row: {
        justifyContent: 'center',
        width: 93.75,
        height: 93.75,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
    },
    thumb: {
        width: 93.75,
        height: 93.75
    },
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    },
    thumbSelect:{
        width:18,
        height:18,
        marginTop:5,
        marginLeft:70,
    },
    selectViewstyle:{
        width:93.75,
        height:93.75
    }
});

