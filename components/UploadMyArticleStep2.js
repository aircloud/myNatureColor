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
    CameraRoll
} from 'react-native';

import UploadMyArticleStep2_editinfo from "./UploadMyArticleStep2_editinfo";
import UploadMyArticleStep2_changeIndexImage from './UploadMyArticleStep2_changeIndexImage';
import UploadMyArticleStep2_edittitle from "./UploadMyArticleStep2_edittitle";
import PhotoSelector from './PhotoSelector';
import PhotoSelector2 from './PhotoSelector2';


export default class UploadMyArticleStep2 extends Component{
    constructor(props){
        super(props);

        const selectImage = this.props.preData||this.props.selectImage;
        selectImage.map((eachImage)=>{
            eachImage.selectstate=1;
        });
        const indexImage = {source:{uri:this.props.selectImage[0].node.image.uri,isStatic: true}};
        this.state={
            cansubmit:0,
            title:"",
            describe:"",
            selectImage:selectImage,
            indexImage:indexImage,
        };

    }

    hellopress(){

    }

    _finalStep(){

    }

    // changeIndex(indexImage){
    //     this.setState({
    //        indexImage:indexImage
    //     });
    // }

    _edittitle(){
        let _this = this;
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'UploadMyArticleStep2_edittitle',
                component: UploadMyArticleStep2_edittitle,
                params: {
                    navigator:{navigator},
                    dispatch:_this.props.dispatch,
                    selectImage:_this.state.selectImage,
                }
            });
        }
    }

    _editinfo(){
        let _this = this;
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'UploadMyArticleStep2_editinfo',
                component: UploadMyArticleStep2_editinfo,
                params: {
                    navigator:{navigator},
                    dispatch:_this.props.dispatch,
                    selectImage:_this.state.selectImage,
                }
            });
        }
    }

    _changeIndexImage(){
        let _this = this;
        const { navigator } = this.props;
        var tempSelectImage = this.state.selectImage;
        tempSelectImage.map((eachnode)=>{if(eachnode.node.image.uri!=this.state.indexImage.source.uri)eachnode.selectstate=0;
        else{eachnode.selectstate=1}});
        if(navigator) {
            navigator.push({
                name: 'PhotoSelector2',
                component: PhotoSelector2,
                params: {
                    navigator:{navigator},
                    dispatch:_this.props.dispatch,
                    data:tempSelectImage,
                    maxNumber:1,
                    nextNavName:"UploadMyArticleStep2",
                    ifSendPreData:1,
                    changeIndexImage:function(indexImage){
                        _this.setState({indexImage});
                    }
                    // nextNav:UploadMyArticleStep2,
                },
                type:"Bottom"
            });
        }
    }

    render(){

        return(
            <View style={styles.AllView}>
                <View style={styles.topBarView}>
                    <View style={styles.topBarView1}>
                        <Text style={styles.topBarText1}>投稿信息</Text>
                    </View>
                    <TouchableHighlight onPress={this._finalStep.bind(this)} underlayColor="transparent">
                        <View style={styles.topBarView2}>
                            <Text style={styles.topBarText2}>发布</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight onPress={this._edittitle.bind(this)}>
                    <View style={styles.listView1}>
                        <Text style={styles.listViewText1_1}>稿件题目</Text>
                        <Text style={styles.listViewText1_2}>未填写</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._changeIndexImage.bind(this)}>
                    <View style={styles.listView2}>
                        <Text style={styles.listViewText1_1}>封面图</Text>
                        <Image style={styles.listViewPic1} source={this.state.indexImage.source}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.hellopress.bind(this)}>
                    <View style={styles.listView2}>
                        <Text style={styles.listViewText1_1}>图片列表</Text>
                        <Image style={styles.listViewPic2} source={this.state.indexImage.source}/>
                        <Text style={styles.listViewPicnote}>...</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._editinfo.bind(this)}>
                    <View style={styles.listView1}>
                        <Text style={styles.listViewText1_1}>写在前面</Text>
                        <Text style={styles.listViewText1_2}>未填写</Text>
                    </View>
                </TouchableHighlight>
            </View>

        )
    }
}

var styles = StyleSheet.create({
    AllView:{
        backgroundColor:"#F3F4F8",
        flex:1
    },
    listView1:{
        backgroundColor:"#ffffff",
        height:45,
        alignItems:'center',
        flexDirection:'row',
        borderBottomColor:"#F3F4F8",
        borderBottomWidth:2,
    },
    listView2:{
        backgroundColor:"#ffffff",
        height:60,
        alignItems:'center',
        flexDirection:'row',
        borderBottomColor:"#F3F4F8",
        borderBottomWidth:2,
    },
    listViewText1_1:{
        marginLeft:25,
        flex:1,
        fontSize:15,
    },
    listViewText1_2:{
        width:50,
        marginRight:25,
        fontSize:15,
    },
    listViewPic1:{
        width:40,
        height:40,
        marginRight:32,
    },
    listViewPic2:{
        width:40,
        height:40,
        marginRight:5,
    },
    listViewPicnote:{
        marginRight:15,
        marginBottom:5,
        color:"#4A90E2"
    },
    topBarView:{
        height:45,
        backgroundColor:"#333333",
        flexDirection: 'row',
    },
    topBarView1:{
        flex:1,
        marginLeft:85,
        marginTop:13,
        alignItems: 'center'
    },
    topBarView2:{
        width:85,
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
});