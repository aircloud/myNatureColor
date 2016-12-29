/**
 * Created by Xiaotao.Nie on 2/12/2016.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */

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
    ScrollView,
} from 'react-native';

import {GlobalStorage} from './Storage';
import {getIfPraise,getAllarticle,userlogin,usernotlogin,userlogout} from "../actions";
import {UrlPrefix} from "./configs/config";240

export default class CenterCopyright extends Component{

    constructor(props){
        super(props);

    }

    render(){
        return (
            <ScrollView style={styles.topView} alwaysBounceHorizontal={false} bounces={false}>

                <View style={styles.mainView}>
                    <Text>
                        Center for Copyright Information (CCI) is an American organization focused on advocacy and initiatives in support of copyright law. The CCI aims to educate the public about copyright law; coordinates with copyright owners and Internet service providers (ISPs) about issues related to online copyright infringement; assists with the design, implementation, review, and promotion of an online infringement notification and mitigation system (the Copyright Alert System); collects and disseminates online infringement data; and promotes lawful means of obtaining copyrighted works.[1] The organization was created as a partnership between industry associations, including the Motion Picture Association of America, the Recording Industry Association of America, and five major American Internet service providers.
                    </Text>
                </View>

            </ScrollView>
        )
    }
}

var styles =  StyleSheet.create({

    topView:{
        flexDirection:"column",
        backgroundColor:"#F3F4F8",
        marginBottom:50,
        // flex:1,
    },

    mainView:{
        flex:1,
        marginTop:20,
        marginLeft:15,
        marginRight:15,
    }

});