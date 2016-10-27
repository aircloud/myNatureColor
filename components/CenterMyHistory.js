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
    ScrollView
} from 'react-native';

import {GlobalStorage} from './Storage';
import  CenterMyHistoryList  from './CenterMyHistoryList';
var Toast = require('react-native-toast');

export default class CenterMyHistory extends Component{
    constructor(props) {
        super(props);
        this.state={
            ifgot:0
        };
    }

    componentDidMount() {
        Toast.show.bind(null, "this is a message");
        Toast.showShortCenter.bind(null, "this is a message");

        GlobalStorage.load({
            key:'user',
            autoSync:true,
            syncInBackground: false,
        }).then(resp=>{
            console.log(resp);
            this.setState ({
                iflogin:1,
                phone:resp.phone,
                name:resp.name,
            });

            fetch("https://back.10000h.top/gethistory/"+resp.phone).then((response)=>response.json()).then((responseText)=> {
                console.log("getmyhistory",responseText);
                this.setState({
                    HistoryInfo : responseText,
                    ifgot:1
                })
            });

        }).catch(err => {
            this.setState ({
                iflogin:0,
            });
            console.log(this.state);
        });
    }

    render(){
        if(this.state.ifgot==1){
            return(
                    <View style={styles.topView}>
                        <View style={{flex:1}}>
                            <CenterMyHistoryList detailInfo = {this.state.HistoryInfo} style={{flex:1}}/>
                        </View>
                    </View>
            )
        }
        else{
            return(
                <ScrollView style={styles.topView} alwaysBounceHorizontal={false} bounces={false}>

                    <View>
                        <View>
                            <Text>
                                正在加载
                            </Text>
                        </View>

                    </View>
                </ScrollView>
            )
        }

    }

}

var styles =  StyleSheet.create({
    topView:{
        flexDirection:"column",
        backgroundColor:"#F3F4F8",
        marginBottom:50,
        flex:1,
        // justifyContent: 'flex-start',
        flexWrap: 'wrap',
        // alignItems: 'flex-start',
    },
});