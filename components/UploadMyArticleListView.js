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

var THUMB_URLS = [
    require('./Thumbnails/like.png'),
    require('./Thumbnails/dislike.png'),
    require('./Thumbnails/call.png'),
    require('./Thumbnails/fist.png'),
    require('./Thumbnails/bandaged.png'),
    require('./Thumbnails/flowers.png'),
    require('./Thumbnails/heart.png'),
    require('./Thumbnails/liking.png'),
    require('./Thumbnails/party.png'),
    require('./Thumbnails/poke.png'),
    require('./Thumbnails/superlike.png'),
    require('./Thumbnails/victory.png'),
];

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
            data:data,
            dataSource: ds.cloneWithRows(this._genRows(data)),
        };
        // CameraRoll.getPhotos({first:10}).then((data) => {
        //     this.setState({
        //         dataSource:this.state.dataSource.cloneWithRows(this._genRows(data.edges))
        //     });
        //     // console.log("state.data",this.state.data);
        // });
    }


    componentWillMount() {
        this._pressData = {};
    }


    render() {
        return (
            // ListView wraps ScrollView and so takes on its properties.
            // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
            <ListView
                contentContainerStyle={styles.list}
                dataSource={this.state.dataSource}
                initialListSize={4}
                pageSize={3} // should be a multiple of the no. of visible cells per row
                scrollRenderAheadDistance={500}
                renderRow={this._renderRow.bind(this)}
            />
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        console.log("rowdata",rowData,rowID);
        var imgSource = {source:{uri: rowData.node.image.uri, isStatic: true}};
        var selectImgSource = rowData.selectImageState;
        console.log("imgsource",imgSource);
        return (
            <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="transparent">
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={imgSource.source} >
                            <Image style={styles.thumbSelect} source={selectImgSource}/>
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
        }
        console.log("datablob",dataBlob);
        return dataBlob;
    }

    _pressRow(rowID) {
        // this._pressData[rowID] = !this._pressData[rowID];
        // this.setState({dataSource: this.state.dataSource.cloneWithRows(
        //     this._genRows(this._pressData)
        // )});
        var data2 = this.state.data;
        console.log("data2before",data2[rowID].select);
        data2[rowID].selectImageState=require('../images/selected.png');
        data2[rowID].selectstate=1;
        console.log("data2after",data2[rowID].select);
        this.setState({
            data:data2,
            dataSource:this.state.dataSource.cloneWithRows(this._genRows(data2))
        });
        console.log("hello world");
    }


    /* eslint no-bitwise: 0 */



}

var styles = StyleSheet.create({
    list: {
        // flex:1,
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
    }
});

