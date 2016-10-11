/**
 * Created by hh on 11/10/2016.
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

export default class UploadMyArticleStep2_changeIndexImage extends Component{

    constructor(props){
        super(props);
        this.state={}
    }

    _return(){

    }

    render(){
        return(
            <View>
                <View style={styles.topBarView}>
                    <View style={styles.topBarView1}>
                        <Text style={styles.topBarText1}>编辑</Text>
                    </View>
                    <TouchableHighlight onPress={this._return.bind(this)} underlayColor="transparent">
                        <View style={styles.topBarView2}>
                            <Text style={styles.topBarText2}>确认</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
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