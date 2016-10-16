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


import UploadMyArticleStep2_editinfo from "./UploadMyArticleStep2_editinfo";
import UploadMyArticleStep2_changeIndexImage from './UploadMyArticleStep2_changeIndexImage';
import UploadMyArticleStep2_edittitle from "./UploadMyArticleStep2_edittitle";
import PhotoSelector from './PhotoSelector';
import PhotoSelector2 from './PhotoSelector2';
import {GlobalStorage} from './Storage';


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
            nextStepText:"发布"
        };

        GlobalStorage.load({
            key:'user',
            autoSync:true,
            syncInBackground: false,
        }).then(resp=>{
            this.setState ({
                phone:resp.phone,
                name:resp.name
            });
            console.log(that.state);
        }).catch(err => {
            this.setState ({
                name:"佚名",
                phone:"18868103563",
            });
        });

    }

    hellopress(){

    }

    _finalStep(){

        if(this.state.title!=""&&this.state.describe!=""){
            var precent;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://back.10000h.top/multifile_upload');
            xhr.onload = () => {
                this.setState({isUploading: false});
                if (xhr.status !== 200) {
                    AlertIOS.alert(
                        'Upload failed',
                        'Expected HTTP 200 OK response, got ' + xhr.status
                    );
                    return;
                }
                else{
                    AlertIOS.alert(
                        'Upload Succeed',
                        '经过管理员审核通过后，您的作品会展现在广场的作品列表中',
                        [
                            {text: '知道了', onPress: () => {
                                const {navigator} = this.props;
                                if (navigator) {
                                    navigator.popToRoute(navigator.getCurrentRoutes()[0]);
                                }
                            }},
                        ],
                    );
                    return;
                }
            };
            var formdata = new FormData();

            var indexImageOrderNumber;
            this.state.selectImage.map((eachNode)=>{
                if(eachNode.node.image.uri==this.state.indexImage.source.uri)
                    indexImageOrderNumber=this.state.selectImage.indexOf(eachNode);
            });
            var thisuri=this.props.uri;
            for(var i=0;i<this.state.selectImage.length;i++){
                var uri = this.state.selectImage[i].node.image.uri;
                var twidth= this.state.selectImage[i].node.image.width;
                var theight= this.state.selectImage[i].node.image.height;
                formdata.append('photos', {uri: uri, type: 'image/jpeg', name: 'image'+i+'.jpg',width:twidth,height:theight});
                formdata.append("width"+i,twidth);
                formdata.append("height"+i,theight);

            }
            formdata.append("title",this.state.title);
            formdata.append("describe",this.state.describe);
            formdata.append("name",this.state.name);
            formdata.append("phone",this.state.phone);
            formdata.append("indexImageOrderNumber",indexImageOrderNumber);

            // this.state.textParams.forEach(
            //     (param) => formdata.append(param.name, param.value)
            // );
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    this.setState({uploadProgress: event.loaded / event.total});
                    precent=Math.ceil(this.state.uploadProgress.toFixed(2)*100);
                    this.setState({
                        nextStepText:precent+"%"
                    });
                }
                console.log("uploadprogress",this.state.uploadProgress);
            };
            xhr.send(formdata);
            console.log(formdata);
            this.setState({isUploading: true});
        }
        else{
            AlertIOS.alert(
                'Attention',
                '所有项均为必填项，请检查所有项目是否均已经填写'
            );
        }

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
                    changeTitle:function(title){
                        _this.setState({title:title});
                    },
                    title:this.state.title
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
                    changeDescribe:function(describe){
                        _this.setState({describe:describe});
                    },
                    describe:this.state.describe
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
                    nextText:"确认",
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
        var ifCanUpload = this.state.title&&this.state.describe;
        var uploadTextColor = "#cccccc",tempdescribe;
        if(ifCanUpload){
            uploadTextColor="#ffffff";
        }
        if(this.state.describe==""){
            tempdescribe="未填写";
        }
        else if(this.state.describe.length>20){
            tempdescribe=this.state.describe.slice(0,20)+"...";
        }
        else{
            tempdescribe=this.state.describe;
        }
        return(
            <View style={styles.AllView}>
                <View style={styles.topBarView}>
                    <View style={styles.topBarView1}>
                        <Text style={styles.topBarText1}>投稿信息</Text>
                    </View>
                    <TouchableHighlight onPress={this._finalStep.bind(this)} underlayColor="transparent">
                        <View style={styles.topBarView2}>
                            <Text style={[styles.topBarText2,{color:uploadTextColor}]}>{this.state.nextStepText}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight onPress={this._edittitle.bind(this)}>
                    <View style={styles.listView1}>
                        <Text style={styles.listViewText1_1}>稿件题目</Text>
                        <Text style={[styles.listViewText1_2,{color:this.state.title!=""?"#000000":"#999999"}]}>{this.state.title!=""?this.state.title:"未填写"}</Text>
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
                        <Text style={[styles.listViewText1_2,{color:this.state.describe!=""?"#000000":"#999999"}]}>{tempdescribe}</Text>
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
        marginRight:25,
        fontSize:15,
        justifyContent:"flex-end",
        // alignSelf:"flex-end",
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
        alignItems: 'center',
        justifyContent:"flex-end",
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