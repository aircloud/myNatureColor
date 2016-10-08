/**
 * Created by Xiaotao on 4/10/2016.
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
    TextInput,
    Navigator,
    AlertIOS,
    TouchableHighlight
} from 'react-native';

import Register from './Register';
import Toast from "react-native-toast";
import {GlobalStorage} from './Storage';
import {trim} from "./tools/String.tools";
import {getIfPraise,getAllarticle,userlogin,usernotlogin,userlogout} from "../actions";

export default class Login extends Component{

    constructor(props){
        super(props);
        console.log("cons");
        this.state={
            phone:"",
            vertify:"",
            vertifyTest:"获取验证码",
            ifright:0,
            ifpending:0,
            count:30,
            ifsend:0,
        }
    }

    componentDidMount() {
        console.log('begin...');
        fetch("https://back.10000h.top/getallarticle").then(response=>response.json()).then(
            (responseText)=>{
                console.log("cr",responseText);
            });
    }

    _toregister(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'Register',
                component: Register,
                params: {
                    navigator:{navigator}
                }
            });
        }
    }

    _testLogin(){
        var temp_phone = this.state.phone;
        var temp_ifright = this.state.ifright;

        const dispatch = this.props.dispatch;
        if(this.state.ifsend==0){
            AlertIOS.alert("Failure","请发送并填写验证码");
        }
        else
        {
            fetch("https://back.10000h.top/find/" + temp_phone).then((response)=>response.json()).then((responseText)=> {
                if (responseText.find == 1) {
                    var name =responseText.name;
                    fetch("https://back.10000h.top/get6427/" + temp_phone).then((response)=>response.text()).then((responseText2)=> {
                        if(responseText2==this.state.vertify){
                            //终于可以进入个人中心
                            console.log(responseText);
                            console.log("responseText2",responseText2);
                            GlobalStorage.save({
                                key:'user',
                                rawData:{
                                    phone:temp_phone,
                                    name:name,
                                    iflogin:1,
                                }
                            }).then(()=>{
                                var t_user={
                                    phone:temp_phone,
                                    name:name,
                                    iflogin:1,
                                };
                                dispatch(userlogin(t_user));
                                this.props._getuser(temp_phone,name);
                                clearTimeout(this.timer);
                                const { navigator } = this.props;
                                if(navigator) {
                                    navigator.pop();
                                }
                            });
                        }
                        else{
                            AlertIOS.alert("Login in failure", "验证码错误");
                        }
                    });
                }
                else if (responseText.find == 0) {
                    AlertIOS.alert("Login in failure", "账户不存在");
                }
                else{
                    AlertIOS.alert("Login in failure", "网络错误,请重新输入");
                }
            });
        }
    }

    _countdowm30(){
        // console.log("a loop");
        if(this.state.count==0){
            this.setState({
                ifpending:0,
                count:30,
                vertifyTest:"重新发送",
            });
            return;
        }
        else if(this.state.count>0){
            var thiscount = this.state.count-1;
            this.setState({
                count:thiscount,
                vertifyTest:"重新发送"+thiscount
            });
            // console.log(this.state.vertifyTest);
            this.timer=setTimeout(this._countdowm30.bind(this),1000);
        }
    }

    _sendvertify(){
        var temp_phone = this.state.phone;

        if(this.state.ifpending==1){
            Toast.show.bind(null,"请等待30秒后重新发送");
            AlertIOS.alert("Failure","请等待30秒后重新发送");
        }
        else if(this.state.phone==""){
            AlertIOS.alert("Failure","请填写手机号");
        }
        else {
            fetch("https://back.10000h.top/send6427/" + temp_phone).then((response)=> {
                if(response.status==200) {
                    this.setState({
                        ifpending: 1,
                        ifsend:1,
                        vertifyTest: "已发送",
                    });
                    this._countdowm30();
                }
                else{
                    AlertIOS.alert("Network failure","请检查您的网络");
                }
            });
        }
    }

    render(){

        return(
            <View style={styles.topView}>

                <View style={styles.logoView}>

                    <Image source={require('../images/naco2.png')} style={styles.logoPng}/>

                </View>
                <View style={styles.loginMain}>

                    <View style={styles.inputView}>
                        <View style={styles.inputViewText}>
                            <TextInput
                                style={styles.realinputViewText}
                                autoFocus={true}
                                placeholder="Please input your phone number"
                                onChangeText={(phone) => this.setState({phone:trim(phone)})}
                                value={this.state.phone}
                            />
                        </View>
                    </View>
                    {/*<View style={styles.inputView}>*/}
                    {/*<TextInput*/}
                    {/*style={styles.inputViewText}*/}
                    {/*placeholder="Please input your name"*/}
                    {/*onChangeText={(phone) => this.setState({phone})}*/}
                    {/*value={this.state.text}*/}
                    {/*/>*/}
                    {/*</View>*/}
                    <View style={styles.inputView}>
                        <View  style={styles.VertifyTextInput}>
                            <TextInput
                                style={styles.realinputViewText}
                                placeholder="vertify number"
                                onChangeText={(vertify) => this.setState({vertify:trim(vertify)})}
                                value={this.state.vertify}
                            />
                        </View>
                        <TouchableHighlight style={styles.vertifyTestViewT} activeOpacity={1} onPress={this._sendvertify.bind(this)} underlayColor="rgba(255,255,255,0)">
                            <View style={styles.vertifyTestView}>
                                <Text style={styles.vertifyTestViewText} >
                                    {this.state.vertifyTest}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.inputView}>
                        <TouchableHighlight style={styles.uploadButtonT} activeOpacity={1} onPress={this._testLogin.bind(this)} underlayColor="rgba(255,255,255,0)">
                            <View style={styles.uploadButton}>
                                <View style={styles.uploadButtonBox}>
                                    <Text style={styles.uploadButtonLabel}>立即登录</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight style={styles.toregister} onPress={this._toregister.bind(this)} activeOpacity={1} underlayColor="rgba(255,255,255,0)">
                        <Text style={styles.toregisterText}>
                            没有账号？立即注册
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}


var styles = StyleSheet.create({
    topView:{
        alignItems:"center",
        flex:1,
        backgroundColor:"#f3f4f8",
    },
    inputViewText:{height: 35, borderColor: '#333333', borderWidth: 1,flex:1,},
    realinputViewText:{
        marginTop:2,
        marginBottom:2,
        marginLeft:10,
        flex:1,
        height:31
    },
    inputView:{
        margin:5,
        flexDirection:'row',
    },
    VertifyTextInput:{
        height: 35, borderColor: '#333333', borderWidth: 1,
        flex:2,
    },
    logoView:{
        height:250,
        alignItems:'center',
        flexDirection:'column',
    },
    logoPng:{
        width:75,
        height:75,
        marginTop:88
    },
    loginMain:{
        width:320,
        height:300
    },
    vertifyTestView:{
        borderColor: '#333333', borderWidth: 1,
        flex:1,
        height:35,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#333333"
    },
    vertifyTestViewText:{
        fontSize:15,
        color:"#ffffff",
    },
    vertifyTestViewT:{
        flex:1,
        height:35
    },
    vertifyTest:{
        flex:1,
    },
    uploadButtonT:{
        flex:1,
    },
    uploadButton: {
        marginTop: 5,
        flex:1,
    },
    uploadButtonBox: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#333333',
        borderRadius: 3,
    },
    uploadButtonLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    toregister:{
        marginTop:60,
        alignItems:"center",
    },
    toregisterText:{
        color:"#4A90E2",
        fontSize:13,
    }

});


