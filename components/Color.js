/**
 * Created by hh Xiaotao 1/10/2016.
 */
import React, { Component } from 'react';
import {
    StatusBar,
    AppRegistry,
    StyleSheet,
    Image,
    View,
    Text,
    ProgressViewIOS,
    Navigator,
    TouchableOpacity,
} from 'react-native';
// import  ImagePickerIOS from 'ImagePickerIOS';
// import TimerMixin from 'react-timer-mixin';
import imagePicker from 'react-native-imagepicker';
import UploadInfo from './UploadInfo';
import { connect } from 'react-redux';
import {UrlPrefix} from "./configs/config";

class Color extends Component{

    constructor(props) {
        super(props);
        this.state = {
            progress:1,
            viewColor:[],
            progressColor:[],
            number:0,
            camera:[require('../images/camera1.png'),require('../images/camera2.png'),require('../images/camera3.png')],
            library:[require('../images/library1.png'),require('../images/library2.png'),require('../images/library3.png')],
            naco:[require('../images/naco1.png'),require('../images/naco2.png'),require('../images/naco3.png')],
            imageSource:[require('../images/banner1.jpeg'),require('../images/banner2.jpeg'),require('../images/banner3.jpeg')]
        };
    }

    componentDidMount(){
        this.setState({
            progressColor:["#3f4867","#927775","#6f708e"],
            viewColor:["#a6e2e3","#d4c7be","#c3c1c4"],
            number:0
        });
        var that = this;
        setInterval(
            ()=>{
                var progress=that.state.progress;
                // console.log("progress",progress);

                if(progress==100){
                    // console.log("progress = 1");
                    var tempViewColor = that.state.viewColor;
                    if(that.state.number==(tempViewColor.length-1)){
                        that.setState({
                            number:0,
                            progress:1
                        })
                    }
                    else{
                        var temp_number = that.state.number;
                        temp_number++;
                        that.setState({
                            number:temp_number,
                            progress:1
                        })
                    }
                }
                else {
                    if(progress<5){

                    }
                    if(progress>90||progress<10){
                        progress = that.state.progress + 0.5;
                    }
                    else{
                        progress = that.state.progress + 1;
                    }
                    that.setState({
                        progress: progress
                    })
                }
            },
            25
        )
    }

    onPressButtonA() {
        let _this = this;
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'UploadInfo',
                component: UploadInfo,
                params: {
                    id: 1,
                    getUser: function(user) {
                        _this.setState({
                            user: user
                        })
                    },
                    dispatch:_this.props.dispatch,
                    ToastShow:_this.props.uploadToastShow
                }
            });
        }
    }
    getphotos(){
        let _this = this;
        imagePicker.open({
            takePhoto: true,
            useLastPhoto: false,
            chooseFromLibrary: true,
        }).then(function(image,height, width) {
            const { navigator } = _this.props;
            if(navigator) {
                navigator.push({
                    name: 'UploadInfo',
                    component: UploadInfo,
                    params: {
                        id: 1,
                        imageUri:image,
                        _getuser:_this.props._getuser,
                        dispatch:_this.props.dispatch,
                        ToastShow:_this.props.uploadToastShow
                    }
                });
            }
            console.log('image edit the source code', image,height,width);
        }, function() {
            console.log('user cancel');
        });

    }
    render(){
        let number = this.state.number;
        let changebackcolor=this.state.viewColor[number];
        let progresscolor=this.state.progressColor[number];
        let imageSource=this.state.imageSource[number];
        let nacoSource=this.state.naco[number];
        let cameraSource=this.state.camera[number];
        let librarySource=this.state.library[number];

        // console.log(imageSource);

        // console.log(changebackcolor);
        return(
            <View style={[styles.topview,{backgroundColor:changebackcolor}]}>
                <StatusBar
                    hidden={true}
                />
                <ProgressViewIOS style={styles.progressView} progress={this.state.progress/100} progressTintColor={progresscolor} />


                <View style={styles.bannerView}>
                    <Image source={nacoSource} style={styles.naco}/>

                    <Image source={imageSource} style={styles.bannerImage} />

                    <View style={styles.choiceView}>

                        <TouchableOpacity onPress={this.getphotos.bind(this)} style={styles.choiceViewTouch}>
                            <Image source={cameraSource} style={styles.choiceViewImage}/>
                            <Text style={[styles.choiceViewText,{color:progresscolor}]}>
                                CAMERA
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.getphotos.bind(this)} style={styles.choiceViewTouch}>
                            <Image source={librarySource} style={styles.choiceViewImage}/>
                            <Text style={[styles.choiceViewText,{color:progresscolor}]}>
                                LIBRARY
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topview:{
        flex:1,
        // alignItems:'center',
    },
    welcome: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight:'600',
        color:"#111111",

    },
    progressView:{
    },
    bannerView:{
        flex:1,
        height:550,
        alignItems:'center',
    },
    bannerImage:{
        margin:20,
        width:250,
        height:250,
        shadowOpacity: 0.5,
        shadowRadius:2,
        shadowColor: '#333333',
        shadowOffset: {width: 2, height: 2},
    },
    naco:{
        marginTop:55,
        width:75,
        height:75,
        marginBottom:30,
    },
    choiceView:{
        width:320,
        flex:1,
        flexDirection:'row',
        marginTop:35,
    },
    choiceViewImage:{
        width:40,
        height:40,
    },
    choiceViewTouch:{
        width:160,
        flexDirection:'column',
        alignItems:'center'
    },
    choiceViewText:{
        fontSize:18,
        marginTop:10
    }
});
function select(state){
    return{
        allAppArticles:state.allArticles,
        appUserStatus:state.appuser,
        uploadToastShow:state.uploadToastShow
    }
}
// AppRegistry.registerComponent('Square', () => Square);
export default connect(select)(Color);