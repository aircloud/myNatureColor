/**
 * Created by Xiaotao on 1/10/2016.
 */
import React, { Component } from 'react';
import {
    StatusBar,
    AppRegistry,
    StyleSheet,
    Image,
    View,
    Text,
    Navigator
} from 'react-native';

import { connect } from 'react-redux'

import SquareListView from './SquareListView';
import {GlobalStorage} from './Storage';


class Square extends Component{
    constructor(props) {
        super(props);

        let squareType = this.props.squareType;

        this.state = {
            photoSoure: {
                // uri:'https://www.10000h.top/images/1.jpg',
                uri:"assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG",
                isStatic: true,
                squareType:squareType
            },
        };
        console.log("square",this.props.allAppArticles);
        // GlobalStorage.save({
        //     key:'user',
        //     rawData:{
        //         phone:"199999999",
        //         name:'哈哈哈哈'
        //     }
        // });
    }

    render(){
        return(
            <View style={{flex:1}}>
                <StatusBar
                    hidden={true}
                />
                <View style={styles.picListView}>
                    <SquareListView
                        style={styles.SquareListView}
                        navigator={this.props.navigator}
                        allAppArticles={this.props.allAppArticles}
                        appUserStatus={this.props.appUserStatus}
                        dispatch = {this.props.dispatch}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topview:{
        backgroundColor:"#eecc00",
        flex:1
    },
    picListView:{
        alignItems:'center',
        flexDirection:'row',
        flex:1,
        margin:0,
    },
    listViewImage:{
        width:100,
        height:100
    },
    SquareListView:{
        flex:1,
        flexDirection:'column',
    }
});

function select(state){
    return{
        allAppArticles:state.allArticles,
        appUserStatus:state.appuser
    }
}
// AppRegistry.registerComponent('Square', () => Square);
export default connect(select)(Square);