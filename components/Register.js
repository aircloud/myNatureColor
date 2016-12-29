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
    TouchableHighlight,
    AlertIOS
} from 'react-native';

import Toast from "react-native-toast";
import {GlobalStorage} from './Storage';
import {trim} from "./tools/String.tools";

import {UrlPrefix} from "./configs/config";

export default class Register extends Component{

    constructor(props){
        super(props);
        this.state={
            phone:"",
            vertify:"",
            vertifyTest:"获取验证码",
            ifright:0,
            ifpending:0,
            count:30,
            ifsend:0,
            name:"",
        }
    }

    _tologin(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
            // navigator.popToRoute(navigator.getCurrentRoutes()[0]);
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
        if(this.state.phone==""){
            AlertIOS.alert("Failure","请填写手机号");
        }
        else if(this.state.ifpending==1){
            Toast.show.bind(null,"请等待30秒后重新发送");
            AlertIOS.alert("Failure","请等待30秒后重新发送");
        }
        else {
            console.log(temp_phone);
            fetch("https://back.10000h.top/find/" + temp_phone).then((response)=>response.json()).then((responseText)=> {
                if (responseText.find == 1) {
                    AlertIOS.alert("Vertify failuer", "账户已存在，请直接登录");
                }
                else {
                    fetch("https://back.10000h.top/send6427/" + temp_phone).then((response)=> {
                        console.log(response);
                        if (response.status == 200) {
                            this.setState({
                                ifpending: 1,
                                ifsend: 1,
                                vertifyTest: "已发送",
                            });
                            this._countdowm30();
                        }
                        else {
                            AlertIOS.alert("Network failure", "请检查您的网络");
                        }
                    });
                }
            });
        }
    }

    _register(){

        var temp_phone = this.state.phone;
        var temp_name = this.state.name;

        if(this.state.ifsend==0){
            AlertIOS.alert("Failure","请发送并填写验证码");
        }
        else if(this.state.name==""){
            AlertIOS.alert("Information needed","请填写您的姓名");
        }
        else
        {

            fetch("https://back.10000h.top/get6427/" + temp_phone).then((response)=>response.text()).then((responseText2)=> {
                if(responseText2==this.state.vertify) {
                    fetch("https://back.10000h.top/insert",{
                        method:"POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify({
                            phone:temp_phone,
                            name:temp_name
                        })
                    }).then(response=>{
                        if(response.status==200){
                            GlobalStorage.save({
                                key: 'user',
                                rawData: {
                                    phone: temp_phone,
                                    name: temp_name
                                }
                            }).then(()=> {
                                this.props._getuser(temp_phone,temp_name);
                                clearTimeout(this.timer);
                                const {navigator} = this.props;
                                if (navigator) {
                                    navigator.popToRoute(navigator.getCurrentRoutes()[0]);
                                }
                            });
                        }
                        else{
                            AlertIOS.alert("Login in failure", "网络错误,请重新输入");
                        }
                    });
                }
                else{
                    AlertIOS.alert("Login in failure", "验证码错误");
                }
            });
        }
    }

    render(){

        return(
            <View style={styles.topView}>

                <View style={styles.logoView}>

                    <Image source={require('../images/naco7.png')} style={styles.logoPng}/>

                </View>
                <View style={styles.loginMain}>

                    <View style={styles.inputView}>
                        <View style={styles.inputViewText}>
                            <TextInput
                                style={styles.realinputViewText}
                                autoFocus={true}
                                placeholder="Please input your phone number"
                                onChangeText={(phone) => this.setState({phone:trim(phone)})}
                                value={this.state.text}
                            />
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <View style={styles.inputViewText}>
                            <TextInput
                                style={styles.realinputViewText}
                                placeholder="Please input your name"
                                onChangeText={(name) => this.setState({name:trim(name)})}
                                value={this.state.text}
                            />
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <View  style={styles.VertifyTextInput}>
                            <TextInput
                                style={styles.realinputViewText}
                                placeholder="vertify number"
                                onChangeText={(vertify) => this.setState({vertify:trim(vertify)})}
                                value={this.state.text}
                            />
                        </View>
                        <TouchableHighlight style={styles.vertifyTestViewT} activeOpacity={1} onPress={this._sendvertify.bind(this)} underlayColor="rgba(255,255,255,0)">
                            <View style={styles.vertifyTestView}>
                                <Text style={styles.vertifyTestViewText}>
                                    {this.state.vertifyTest}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.inputView}>
                        <TouchableHighlight style={styles.uploadButtonT} activeOpacity={1} onPress={this._register.bind(this)} underlayColor="rgba(255,255,255,0)">
                            <View style={styles.uploadButton}>
                                <View style={styles.uploadButtonBox}>
                                    <Text style={styles.uploadButtonLabel}>立即注册</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight style={styles.toregister} onPress={this._tologin.bind(this)} activeOpacity={1} underlayColor="rgba(255,255,255,0)">
                        <Text style={styles.toregisterText}>
                            已有账号？立即登陆
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
    inputView:{
        margin:5,
        flexDirection:'row',
    },
    VertifyTextInput:{
        height: 35, borderColor: '#333333', borderWidth: 1,
        flex:2,
    },
    logoView:{
        height:100,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
    },
    logoPng:{
        width:150,
        height:45,
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
        marginTop:20,
        alignItems:"center",
    },
    toregisterText:{
        color:"#4A90E2",
        fontSize:13,
    },
    realinputViewText:{
        marginTop:2,
        marginBottom:2,
        marginLeft:10,
        flex:1,
        height:31
    },

});
