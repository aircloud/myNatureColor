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
        var selectImage = this.props.selectImage;
        var selectstate = new Array(selectImage.length);
        var selectbackground = new Array(selectImage.length);
        var indexnumber = selectImage.indexOf(this.props.indexImage);
        for(var ii=0;ii<selectstate.length;ii++){
            selectstate[ii]=ii==indexnumber?1:0;
            selectbackground[ii]=ii==indexnumber?"rgba(0,0,0,0.5)":"rgba(0,0,0,0)"
        }
        var allselectinfo = {
            selectImage:selectImage,
            selectstate:selectstate,
            selectbackground:selectbackground
        };

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
            allselectinfo:allselectinfo,
            selectImage:selectImage,
            indexImage:this.props.indexImage,
            dataSource: ds.cloneWithRows(this._genRows(allselectinfo)),
        };
    }

    componentWillMount() {
        this._pressData = {};
    }

    _nextStep(){

        var myindexImage = {source:{uri:this.state.indexImage,isStatic: true}};

        var changeIndex = this.props.changeIndex;

        changeIndex(myindexImage);

        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
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
                            <Text style={styles.topBarText2}>完成</Text>
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
        var imgSource = {source:rowData.source};
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
        //这个pressData只有URL
        for (var ii = 0; ii < pressData.selectImage.length; ii++) {
            dataBlob[ii]={};
            dataBlob[ii].source={uri:pressData.selectImage[ii]};
            dataBlob[ii].selectstate=pressData.selectstate[ii];
            dataBlob[ii].selectbackground=pressData.selectbackground[ii];
            dataBlob[ii].selectImageState=pressData.selectstate[ii]==0?require("../images/select.png"):require('../images/selected.png');
        }
        console.log("datablob",dataBlob);
        return dataBlob;
    }

    _pressRow(rowID) {
        var indexImage=this.state.indexImage;
        var selectImage = this.state.selectImage;
        var allselectinfo = this.state.allselectinfo;
        if(indexImage!=selectImage[rowID]){
            allselectinfo.selectstate[selectImage.indexOf(indexImage)]=0;
            allselectinfo.selectbackground[selectImage.indexOf(indexImage)]="rgba(0,0,0,0)";
            indexImage=selectImage[rowID];
            allselectinfo.selectstate[rowID]=1;
            allselectinfo.selectbackground[rowID]="rgba(0,0,0,0.5)";
        }
        else{
            //do nothing
        }
        this.setState({
            allselectinfo:allselectinfo,
            indexImage:indexImage,
            dataSource: this.state.dataSource.cloneWithRows(this._genRows(allselectinfo))
        });
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

