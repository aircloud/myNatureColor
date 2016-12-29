/**
 * Created by Xiaotao.Nie on 2/12/2016.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    Navigator,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import {GlobalStorage} from './Storage';
import {getIfPraise,getAllarticle,userlogin,usernotlogin,userlogout} from "../actions";
import {UrlPrefix} from "./configs/config";

export default class CenterExplain extends Component{

    constructor(props){
        super(props);

    }

    render(){
        return (
            <View style={styles.MainView}>
                <Text style={styles.textView}>
                    投稿说明：
                </Text>
                <Text style={styles.textView}>
                    1. 任何用户可以将自己通过本平台创造出的图片，上传投稿，并辅以简短的文字说明。
                </Text>
                <Text style={styles.textView}>
                    2. 每一个稿件中，可以出现一张图或者多张图，建议如果出现多张图时，图片之间有所关联，成一体系。
                </Text>
                <Text style={styles.textView}>
                    3. 所有稿件我们均会筛选鉴别，并且不定期将一些优秀稿件放在我们的作品广场，将美好的作品一起共享。(注:关于作品详情页背景色等，我们会进行定制化配色)
                </Text>
                <Text style={styles.textView}>
                    4. 本app声明永不盈利。
                </Text>
                <Text style={styles.textView}>
                    如果对以上说明有疑问，请发送邮件至networknxt@gmail.com，我会在第一时间回复，另外如果您对这个app有更多的想法，也欢迎邮件联系我。
                </Text>
            </View>
        )
    }
}

var styles =  StyleSheet.create({
    MainView:{
        flex:1,
        marginTop:20,
        marginLeft:15,
        marginRight:15,
    },

    textView:{
        marginTop:20,
    }

});