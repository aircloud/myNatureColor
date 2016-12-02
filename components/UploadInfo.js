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
    Slider,
    Text,
    Navigator
} from 'react-native';

import ColorImageUpload from './ColorImageUpload';
import Toast, {DURATION} from 'react-native-easy-toast'
import {UrlPrefix} from "./configs/config";

export default class UploadInfo extends Component{

    constructor(props) {
        super(props);
        console.log('ToastShow',this.props.ToastShow);
        this.state = {
            ToastShow:this.props.ToastShow,
            photoSoure: {
                uri:this.props.imageUri,
                isStatic: true,
            },
            contrastOffset:1,
            colorNumber:2,
            toastShow:false,
        };
    }

    componentDidMount() {
        // this.refs.toast.show("计算中...",5000);
    }

    _toastClose(){
        this.refs.toast.close();
    }

    render(){
        console.log(this.state.photoSoure);
        var _that = this;
        if(this.state.ToastShow.show==true){
            console.log('ToastShow',this.state.ToastShow);
            this.refs.toast.show("计算中...",5000);
        }
        return(
            <View>
                <StatusBar
                    hidden={true}
                />
                <View style={styles.picListView}>
                    <View style={styles.picListTitle}>
                        <Text style={styles.picListText}>MORE CONFIG</Text>
                    </View>
                    <Image source={this.state.photoSoure} style={styles.listViewImage} />
                </View>
                <View style={styles.configView}>
                    <View style={styles.UploadSilderView}>
                        <View style={styles.UploadSilderStyle}>
                            <Text style={styles.text} >
                                颜色数目:{this.state.colorNumber && +this.state.colorNumber.toFixed(3)}
                            </Text>
                            <Slider style={styles.slider}
                                step={1} minimumValue={2} minimumTrackTintColor={"#333333"} maximumValue={9} value={this.state.colorNumber}
                                onValueChange={(colorNumber) => this.setState({colorNumber:colorNumber})} />
                        </View>

                    </View>
                    <View style={styles.UploadSilderView}>
                        <View style={styles.UploadSilderStyle}>
                            <Text style={styles.text} >
                                冷暖值:{this.state.contrastOffset && +this.state.contrastOffset.toFixed(3)}
                            </Text>
                            <Slider style={styles.slider}
                                    step={1} minimumValue={1} minimumTrackTintColor={"#333333"}  maximumValue={5} value={this.state.contrastOffset}
                                    onValueChange={(contrastOffset) => this.setState({contrastOffset:contrastOffset})} />
                        </View>
                    </View>
                    <ColorImageUpload uri={this.state.photoSoure.uri}
                                      navigator = {this.props.navigator}
                                      colorNumber={this.state.colorNumber}
                                      contrastOffset={this.state.contrastOffset}
                                      dispatch = {this.props.dispatch}
                    />
                    <View style={styles.tipView}>
                        <Text style={styles.tip}>左滑返回</Text>
                    </View>
                </View>
                <Toast ref="toast"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    picListText:{
        fontSize: 20,
        marginTop:15,
    },
    picListTitle:{
        height:50,
    },
    topview:{
        backgroundColor:"#eeffdd",
        flex:1
    },
    picListView:{
        shadowColor:"#999999",
        backgroundColor:"#F3F4F8",
        height:250,
        overflow:"hidden",
        alignItems:'center'
    },
    listViewImage:{
        width:300,
        height:300
    },
    configView:{
        alignItems:'center',
        borderTopColor:"#979797",
    },
    UploadSilderView:{
        alignItems:'center',
        marginTop:10,
    },
    UploadSilderStyle:{
        width:320,
        alignItems:'flex-start',
    },
    tipView:{
        width:320,
    },
    tip:{
        fontSize:14,
        color:"#666666",
        marginTop:25,
    },
    slider: {
        height: 10,
        // margin: 10,
        marginTop:10,
        marginBottom:10,
        width:320,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        margin: 10,
    },
});


AppRegistry.registerComponent('UploadInfo', () => UploadInfo);
