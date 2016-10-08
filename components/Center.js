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
                iflogin:1,
                phone:resp.phone,
                name:resp.name
            });
            console.log(that.state);
        }).catch(err => {
            console.log("error");
            that.setState ({
                iflogin:0,
            });
            console.log(that.state);
        });
    }


    hellopress(){
        console.log("hello");
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
                            <Image source={require('../images/b-10.gif')} style={styles.infoViewPic}/>
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
                        <TouchableHighlight onPress={this.hellopress.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>配色历史</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.hellopress.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>我的投稿</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.hellopress.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>我赞过的</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>

                        <View style={styles.listViewSpace}/>

                        <TouchableHighlight onPress={this.hellopress.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>投稿说明</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.hellopress.bind(this)}>
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
                            <Image source={require('../images/b-10.gif')} style={styles.infoViewPic}/>
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
                        <TouchableHighlight onPress={this.hellopress.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>配色历史</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.hellopress.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>我的投稿</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.hellopress.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>我赞过的</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>

                        <View style={styles.listViewSpace}/>

                        <TouchableHighlight onPress={this.hellopress.bind(this)}>
                            <View style={styles.listView}>
                                <Text style={styles.listViewText}>投稿说明</Text>
                                <Image source={require('../images/toright.png')} style={styles.listViewPic}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.hellopress.bind(this)}>
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
        borderRadius:30,
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