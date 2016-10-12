/**
 * Created by Xiaotao Nie on 12/10/2016.
 * If you has any question please visit https://www.github.com/aircloud or mail to onlythen@yeah.net
 * MIT
 */

/**
 *
 * parameters:
 *
 * maxNumber: the max number photo you want the user to select
 *
 * data(required):the origin data form the port CameraRoll
 * node:image:{height,width,uri}
 * 另外，可以给这个数组每一个元素一个selectState,初始是否被选中，也可以没有
 *
 * position:the position of the titleBar
 * "top" or "bottom"
 *
 * backgroundColor:the backgroundColor of the titleBar
 *
 * titleText:the title of the titleBar
 *
 * nextText:the text of the next button
 *
 * nextNavName
 *
 * nextNav
 *
 * ifSendPreData:if send previous data
 * */

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
    Alert,
    Dimensions
} from 'react-native';

import UploadMyArticleStep2 from './UploadMyArticleStep2';

var {height, width} = Dimensions.get('window');
var eachPhotoWidth = width/4.0;
var eachPhotoHeight = width/4.0;
console.log(eachPhotoWidth);


class ScalePhoto extends Component{
    constructor(props){
        super(props);

        var imageData = this.props.imageData;
        var photowidth = width;
        var photoheight = width/imageData.node.image.width*imageData.node.image.height;

        var fillheight = (height-photoheight-40)/2;

        var imageSource = {uri:imageData.node.image.uri,isStatic:true};

        console.log("imageData",imageData);


        this.state={
            imageSource,
            photowidth,
            photoheight,
            fillheight
        }
    }

    _return(){
        const {navigator} = this.props;
        console.log("navigator",navigator);
        if (navigator) {
            navigator.pop();
        }
    }

    render(){
        return(
            <View style={styles.scaleTopView}>
                <TouchableHighlight onPress={this._return.bind(this)} underlayColor="transparent">
                    <View style={[styles.scaleFillView,{height:this.state.fillheight}]}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._return.bind(this)} underlayColor="transparent">
                    <Image style={{height:this.state.photoheight,width:this.state.photowidth}}
                           source={this.state.imageSource}  />
                </TouchableHighlight>
                <TouchableHighlight onPress={this._return.bind(this)} underlayColor="transparent">
                    <View style={[styles.scaleFillView,{height:this.state.fillheight}]}/>
                </TouchableHighlight>
            </View>
        )
    }
}

export default class PhotoSelector extends Component{

    constructor(props){

        super(props);
        var data = this.props.data;
        const maxNumber = this.props.maxNumber||9;
        const position=this.props.position||"top";
        const backgroundColor=this.props.backgroundColor||"#333333";
        const titleText = this.props.titleText||"选择图片";
        const nextText = this.props.nextText||"下一步";
        const nextNavName = this.props.nextNavName;
        const ifSendPreData = this.props.ifSendPreData||0;


        var selectImage = [];

        data.map((eachdata)=>{eachdata.selectstate=eachdata.hasOwnProperty("selectstate")?eachdata.selectstate:0;
            if(eachdata.selectstate==1){
                selectImage.push(eachdata);
            }});

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
            ifSendPreData,
            nextNavName,
            maxNumber,
            position,
            backgroundColor,
            titleText,
            nextText,
            data,
            selectImage,
            dataSource: ds.cloneWithRows(this._genRows(data)),
        };
    }

    _genRows(pressData){
        var dataBlob = [];
        for (var ii = 0; ii < pressData.length; ii++) {
            dataBlob[ii]={};
            dataBlob[ii].selectstate=pressData[ii].selectstate;
            dataBlob[ii].node=pressData[ii].node;
        }
        return dataBlob;
    }

    _nextStep(){
        var _this = this;
        const {navigator} = this.props;
        if (navigator) {

            if(this.state.ifSendPreData==1){
                navigator.push({
                    name: _this.state.nextNavName,
                    component: UploadMyArticleStep2,
                    params: {
                        navigator: {navigator},
                        selectImage: _this.state.selectImage,
                        preData:this.state.data
                    }
                });
            }
            else{
                navigator.push({
                    name: _this.state.nextNavName,
                    component: UploadMyArticleStep2,
                    params: {
                        navigator: {navigator},
                        selectImage: _this.state.selectImage,
                    }
                });
            }
        }
    }

    _scale(rowID){

        var imageData = this.state.data[rowID];
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: "scale",
                component: ScalePhoto,
                params: {
                    navigator: {navigator},
                    imageData
                }
            });
        }
    }

    _pressRow(rowID) {
        if (this.state.maxNumber == 1) {
            let selectImage = this.state.selectImage;
            let data = this.state.data;
            //说明这个是只能选择一张照片的
            if (selectImage.length == 0) {
                //第一次选择,本来没有照片
                selectImage.push(data[rowID]);
                data[rowID].selectstate = 1;
            }
            else {
                data.map((eachdata)=> {
                    eachdata.selectstate = 0
                });
                data[rowID].selectstate = 1;
                selectImage.pop();
                selectImage.push(data[rowID]);
            }
            this.setState({
                selectImage: selectImage,
                data: data,
                dataSource: this.state.dataSource.cloneWithRows(this._genRows(data))
            });
        }
        else {
            let data = this.state.data;
            let selectImage = this.state.selectImage;

            if(data[rowID].selectstate==1){
                //说明这是一个取消选择的过程
                data[rowID].selectstate=0;
                selectImage.splice(selectImage.indexOf(data[rowID]),1);
            }
            else {
                if (this.state.maxNumber == selectImage.length) {
                    Alert.alert(
                        'Attention',
                        "最多选择"+this.state.maxNumber+"张图片",
                    )
                }
                else{
                    data[rowID].selectstate=1;
                    selectImage.push(data[rowID]);
                }
            }
            this.setState({
                selectImage: selectImage,
                data: data,
                dataSource: this.state.dataSource.cloneWithRows(this._genRows(data))
            });
        }
    }

    render() {
        var number = this.state.selectImage.length;
        return (
            <View>
                <View style={styles.topBarView}>
                    <View style={styles.topBarView1}>
                        <Text style={styles.topBarText1}>{this.state.titleText}({number})</Text>
                    </View>
                    <TouchableHighlight onPress={this._nextStep.bind(this)} underlayColor="transparent">
                        <View style={styles.topBarView2}>
                            <Text style={styles.topBarText2}>{this.state.nextText}</Text>
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
        var selectImgSource = rowData.selectstate==0?require("../images/select.png"):require("../images/selected.png");
        var selectBackground=rowData.selectstate==0?"rgba(255,255,255,0)":"rgba(0,0,0,0.5)";
        console.log("selectBakc",selectBackground);
        console.log("imgsource",imgSource);
        return (
            <View>
                <View style={styles.row}>
                    <Image style={styles.thumb} source={imgSource.source} >

                        <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="transparent">
                            <View style={[styles.selectViewstyle,{backgroundColor:selectBackground}]}>
                                <Image style={styles.thumbSelect} source={selectImgSource}/>
                                <TouchableHighlight
                                    activeOpacity={1}
                                    underlayColor="rgba(255,255,255,0)"
                                    onPress={() => {this._scale(rowID)}}>
                                    <View style={styles.toScaleTouch}/>
                                </TouchableHighlight>
                            </View>
                        </TouchableHighlight>

                    </Image>
                </View>
            </View>
        );
    }
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
        width: eachPhotoWidth,
        height: eachPhotoHeight,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
    },
    thumb: {
        width: eachPhotoWidth,
        height: eachPhotoHeight
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
    toScaleTouch:{
        width:eachPhotoWidth,
        height:eachPhotoHeight-23
    },
    selectViewstyle:{
        width:eachPhotoWidth,
        height:eachPhotoHeight
    },
    scaleTopView:{
        flex:1,
        alignItems:"center",
    },
    scaleFillView:{
        flex:1,
        width:width,
        backgroundColor:"rgba(0,0,0,0.9)"
    },

});
