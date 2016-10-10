/**
 * Created by Xiaotao on 2/10/2016.
 */

'use strict';

import React, { Component } from 'react';
import {
    StatusBar,
    AppRegistry,
    StyleSheet,
    Image,
    View,
    ListView,
    RecyclerViewBackedScrollView,
    TouchableHighlight,
    Text,
    Navigator,
    ScrollView
} from 'react-native';

import SquareListDetailListView from './SquareListDetailListView';

export default class SquareListDetail extends Component{
    constructor(props){
        super(props);

        this.state={
            source:{uri: "assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG", isStatic: true},
            listbackgroundColor:"#d4c7be",
            text:"On iOS, the tag can be any image URI (including local, remote asset-library and base64 data URIs) or a local video file URI (remote or data URIs are not supported for saving video at this time).If the tag has a file extension of .mov or .mp4, it will be inferred as a video. Otherwise it will be treated as a photo. To override the automatic choice, you can pass an optional type parameter that must be one of 'photo' or 'video'.Returns a Promise which will resolve with the new URI.",
        };
    }

    render(){
        var ii=0;
        return(
            <ScrollView style={styles.ScrollViewStyle}>
                <View style={[styles.listDetailView,{backgroundColor:this.state.listbackgroundColor}]}>
                    <View style={styles.thisDetailView}>
                        <View style={styles.thisDetailViewBorder}>
                            <View style={styles.likeView}>
                                <Text style={styles.likeTextName}>易小天</Text>
                                <Text style={styles.likeText}>1550</Text>
                                <Image source={require('../images/like.png')} style={styles.like} />
                            </View>
                        </View>
                        <Text style={styles.thisDetailText}>
                            {this.state.text}
                        </Text>

                        <SquareListDetailListView/>

                        <View style={styles.tipView}>
                            <Text style={styles.tip}>
                                已经到底啦，左滑返回
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }

}

var styles = StyleSheet.create({
    listDetailView:{
        flex:1,
        alignItems:'center',
    },
    thisDetailView:{

    },
    thisDetailImage:{
        width:320,
        height:320,
    },
    thisDetailText:{
        width:320,
        textAlign:'justify',
        marginBottom:15,
        marginTop:15,
    },
    like:{
        width:15,
        height:15,
    },
    likeView:{
        width:320,
        flexDirection:'row',
        height:30,
        flex:1,
        justifyContent:"flex-end",
        alignItems:'flex-end',
        marginBottom:15,
    },
    likeText:{
        fontSize:14,
        marginRight:3,
        color:"#eb4f38",
        marginTop:5,
    },
    thisDetailViewBorder:{
        borderBottomWidth:1,
        borderBottomColor:"#444444",
    },
    likeTextName:{
        flex:1,
        fontSize:14,
        color:"#666666"
    },
    ScrollViewStyle:{
        flex:1,
    },
    tipView:{
        width:320,
    },
    tip:{
        fontSize:14,
        color:"#666666",
        marginTop:15,
        marginBottom:70
    }
});


