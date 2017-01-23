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
    Alert,
} from 'react-native';

import { connect } from 'react-redux'

import Login from './Login';
import {GlobalStorage} from './Storage';
import {getIfPraise,getAllarticle,userlogin,usernotlogin,userlogout} from "../actions";
import MyAllArticle from './MyAllArticle';
import SquareListView from './SquareListView';

import Toast, {DURATION} from 'react-native-easy-toast'

import CenterMyHistory from './CenterMyHistory';

import {UrlPrefix} from "./configs/config";

import CenterCopyright from "./CenterCopyright";

import CenterExplain from "./CenterExplain";

class Center extends Component{

    constructor(props) {
        super(props);
        var that = this;
        that.state={};
        console.log("constructor");

        GlobalStorage.load({
            key:'user',
            autoSync:true,
            syncInBackground: false,
        }).then(resp=>{
            console.log(resp);
            that.setState ({
                titleLogImg:require('../images/logo4.png'),
                titleImg:require('../images/logo0.png'),
                iflogin:1,
                phone:resp.phone,
                name:resp.name
            });
            console.log(that.state);
        }).catch(err => {
            console.log("error");
            that.setState ({
                titleLogImg:require('../images/logo4.png'),
                titleImg:require('../images/logo0.png'),
                iflogin:0,
            });
            console.log(that.state);
        });
    }

    hellopress(){
        console.log("hello");
        // Toast.showShortCenter.bind(null, "this is a message");
        this.refs.toast.show('hello world!');
    }

    _toExplain(){
        let _this = this;
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'CenterExplain',
                component: CenterExplain,
                params: {
                    navigator:{navigator},
                    dispatch:_this.props.dispatch
                }
            });
        }
    }

    _toCopyright(){
        let _this = this;
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'CenterCopyright',
                component: CenterCopyright,
                params: {
                    navigator:{navigator},
                    dispatch:_this.props.dispatch
                }
            });
        }
    }

    _tologin(){
        let _this = this;
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'Login',
                component: Login,
                params: {
                    navigator:{navigator},
                    _getuser:function _getuser(phone,name){
                        _this.setState ({
                            phone:phone,
                            name:name,
                            iflogin:1,
                        });
                    },
                    dispatch:_this.props.dispatch
                }
            });
        }
    }

    _getMyFavor(){
        if(this.state.iflogin==1){
        fetch(UrlPrefix+"getMyFavor/"+this.state.phone).then(response2=>response2.json()).then(
            (responseText2)=>{
                // console.log(responseText2);
                const { navigator } = this.props;
                console.log("to my article");
                if(navigator) {
                    navigator.push({
                        name: 'SquareListView',
                        component: SquareListView,
                        params: {
                            navigator:{navigator},
                            dispatch:this.props.dispatch,
                            appUserStatus:this.props.appUserStatus,
                            allAppArticles:responseText2,
                        }
                    });
                }
            });
        }
        else{
            // please login
            // Alert.alert(
            //     'Attention',
            //     '请先登录后查看',
            // );
            this.refs.toast.show('请先登录后查看');
        }
    }

    _toMyHistory(){
        if(this.state.iflogin == 0) {
            this.refs.toast.show('请先登录后查看');
        }
        else {
            let _this = this;
            const {navigator} = this.props;
            console.log("to my article");
            if (navigator) {
                navigator.push({
                    name: 'CenterMyHistory',
                    component: CenterMyHistory,
                    params: {
                        navigator: {navigator},
                        dispatch: _this.props.dispatch,
                        appUserStatus: _this.props.appUserStatus,
                    }
                });
            }
        }
    }

    _toallmyarticle(){
        let _this = this;
        const { navigator } = this.props;
        console.log("to my article");
        if(navigator) {
            navigator.push({
                name: 'MyAllArticle',
                component: MyAllArticle,
                params: {
                    navigator:{navigator},
                    dispatch:_this.props.dispatch,
                    appUserStatus:_this.props.appUserStatus,

                }
            });
        }
    }

    _cancelLogin(){

        var _that = this;
        const dispatch = this.props.dispatch;

        Alert.alert(
            '取消登录',
            '您确定要注销当前账户吗?',
            [
                {text: 'Cancel', onPress: () =>{}},
                {text: 'OK', onPress: () =>{
                    GlobalStorage.remove({
                        key: 'user',
                    }).then(()=>{
                        dispatch(usernotlogin());
                        _that.setState({
                            iflogin:0,
                        });
                    });
                }},
            ]
        );

    }

    render(){
        var boolLogin = this.state.iflogin;
        if(boolLogin==0) {
            return (
                <View style={styles.centerTopView}>
                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                        hidden={true}
                    />
                    <View style={styles.infoView}>
                        <View style={styles.infoViewPicView}>
                            <Image source={this.state.titleImg} style={styles.infoViewPic}/>
                        </View>
                        <View style={styles.infoTextView0}>
                            <TouchableHighlight activeOpacity={1} underlayColor="rgba(255,255,255,0)" onPress={this._tologin.bind(this)}>
                                <Text style={styles.infoTextName}>
                                    未登陆，点击登陆
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={styles.mainView}>
                        <TouchableHighlight onPress={this._toMyHistory.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>配色历史</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this._toallmyarticle.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>我的投稿</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this._getMyFavor.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>我赞过的</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>

                        <View style={styles.listViewSpace}/>

                        <TouchableHighlight onPress={this._toExplain.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>投稿说明</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this._toCopyright.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>版权信息</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>

                        <View style={styles.listViewSpace}/>

                        <TouchableHighlight onPress={this._tologin.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={[styles.listViewText, styles.attention]}>立即登录</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Toast ref="toast"/>
                </View>
            )
        }
        else{
            return(
                <View style={styles.centerTopView}>
                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                        hidden={true}
                    />
                    <View style={styles.infoView}>
                        <View style={styles.infoViewPicView}>
                            <Image source={this.state.titleLogImg} style={styles.infoViewPic}/>
                        </View>
                        <View style={styles.infoTextView}>
                            <Text style={styles.infoTextName}>
                                {this.state.name}
                            </Text>
                            <Text style={styles.infoTextTel}>
                                {this.state.phone}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.mainView}>
                        <TouchableHighlight onPress={this._toMyHistory.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>配色历史</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this._toallmyarticle.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>我的投稿</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this._getMyFavor.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>我赞过的</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>

                        <View style={styles.listViewSpace}/>

                        <TouchableHighlight onPress={this._toExplain.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>投稿说明</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this._toCopyright.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>版权信息</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>

                        <View style={styles.listViewSpace}/>

                        <TouchableHighlight onPress={this._cancelLogin.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={[styles.listViewText, styles.warn]}>退出登录</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Toast ref="toast"/>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    centerTopView:{
        flex:1,
    },
    topview:{
        backgroundColor:"#eecc00",
        flex:1
    },
    picListView:{
        height:250,
        overflow:"hidden",
        alignItems:'center'
    },
    listViewImage:{
        width:300,
    },
    infoView:{
        backgroundColor:'#333333',
        height:250,
        alignItems:'center',
    },
    infoViewPicView:{
        marginTop:60,
    },
    infoViewPic:{
        width:60,
        height:60,
        borderRadius:10,
    },
    infoTextView:{
        margin:10,
        alignItems:'center'
    },
    infoTextView0:{
        marginTop:40,
        alignItems:'center'
    },
    infoTextName:{
        fontSize:16,
        margin:10,
        color:'#ffffff'
    },
    infoTextTel:{
        fontSize:16,
        margin:10,
        color:'#ffffff'
    },
    mainView:{
        flex:1,
        backgroundColor:"#F3F4F8",
    },
    listView:{
        backgroundColor:"#ffffff",
        height:45,
        alignItems:'center',
        flexDirection:'row',
        borderBottomColor:"#F3F4F8",
        borderBottomWidth:2,
    },
    listViewText:{
        marginLeft:25,
        flex:1,
        fontSize:15,
    },
    listViewPic:{
        width:15,
        height:15,
        marginRight:25,
    },
    listViewSpace:{
        height:15,
        backgroundColor:"#F3F4F8",
    },
    warn:{
        color:"#7f0404"
    },
    attention:{
        color:"#4A90E2"
    }

});

function select(state){
    return{
        appUserStatus:state.appuser
    }
}

export default connect(select)(Center);
