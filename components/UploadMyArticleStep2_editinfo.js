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
    CameraRoll,
    TextInput,
} from 'react-native';

export default class UploadMyArticleStep2_editinfo extends Component{

    constructor(props){
        super(props);
        this.state={
            info:""
        };
    }

    componentDidMount() {
        if(this.props.describe!=""){
            this.setState({info:this.props.describe})
        }
    }

    _return(){
        const { navigator } = this.props;
        if(this.state.info!=""){
            if(navigator) {
                this.props.changeDescribe(this.state.info);
                navigator.pop();
            }
        }else{
            //do nothing
        }
    }

    render(){
        return(
            <View>
                <View style={styles.topBarView}>
                    <View style={styles.topBarView1}>
                        <Text style={styles.topBarText1}>编辑说明</Text>
                    </View>
                    <TouchableHighlight onPress={this._return.bind(this)} underlayColor="transparent">
                        <View style={styles.topBarView2}>
                            <Text style={styles.topBarText2}>确认</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.outerView1}>
                    <View style={styles.outerView2}>
                        <TextInput
                            autoFocus={true}
                            style={styles.TextInputStyle}
                            onChangeText={(info) => this.setState({info})}
                            value={this.state.info}
                            multiline={true}
                            maxLength={500}
                            placeholder="请在这里输入关于本篇稿件的说明(限500字)"
                        />
                    </View>
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
        marginTop:16,
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
    outerView1:{
        margin:5,
        borderWidth:1,
        borderColor:"#666666",
        height:250
    },
    outerView2:{
        height:250,
        margin:5,
    },
    TextInputStyle:{
        flex:1,
        fontSize:14
    }

});