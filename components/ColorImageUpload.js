/**
 * Created by Xiaotao on 3/10/2016.
 */

'use strict';

import React, { Component } from 'react';
import {
    StatusBar,
    CameraRoll,
    AppRegistry,
    StyleSheet,
    Image,
    View,
    ListView,
    RecyclerViewBackedScrollView,
    TouchableHighlight,
    Text,
    Navigator,
    AlertIOS
} from 'react-native';
var PAGE_SIZE = 20;

// var XHRExampleHeaders = require('./XHRExampleHeaders');
// var XHRExampleFetch = require('./XHRExampleFetch');
// var XHRExampleOnTimeOut = require('./XHRExampleOnTimeOut');
// var XHRExampleCookies = require('./XHRExampleCookies');
import {GlobalStorage} from './Storage';
import ColorImageResult from './ColorImageResult';
import {showuploadtoast,hideuploadtoast} from '../actions';
import {UrlPrefix} from "./configs/config";

export default class ColorImageUpload extends  Component {

    constructor(props) {
        super(props);
        this.state = {
            isUploading: false,
            uploadProgress: null,
            textParams: [],
            randomPhoto: null,
            calculate:false,
        };

        GlobalStorage.load({
            key:'user',
            autoSync:true,
            syncInBackground: false,
        }).then(resp=>{
            this.setState ({
                iflogin:1,
                phone:resp.phone,
                name:resp.name
            });
            console.log(this.state);
        }).catch(err => {
            this.setState ({
                iflogin:0,
            });
            console.log(this.state);
        });
    }

    componentWillUnMount() {
        this.setState({
            calculate:true,
            uploadProgress:"生成配色"
        });
    }

    componentDidMount() {
        // this._fetchRandomPhoto();
        Image.getSize(this.props.uri, (imageWidth, imageHeight) => {
            this.setState({imageWidth, imageHeight});
            console.log(imageWidth, imageHeight);
        });
    }

    _upload()
    {
        var dispatch = this.props.dispatch;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://back.10000h.top/file_upload');
        // xhr.open('POST', 'http://localhost:3000/file_upload');
        xhr.onload = () => {
            this.setState({isUploading: false});
            if (xhr.status !== 200) {
                AlertIOS.alert(
                    'Upload failed',
                    'Expected HTTP 200 OK response, got ' + xhr.status
                );
                return;
            }
            else{
                // AlertIOS.alert(
                //     'Upload succeed',
                //     'Expected HTTP 200 OK response, got ' + xhr.status
                // );
                console.log(xhr.responseText);
                let _this = this;
                const { navigator } = this.props;
                if(navigator) {
                    navigator.push({
                        name: 'ColorImageResult',
                        component: ColorImageResult,
                        params: {
                            info: xhr.responseText
                        }
                    });
                }
                return;
            }
        };
        var formdata = new FormData();
        var thisuri=this.props.uri;
        formdata.append('image', {uri: thisuri, type: 'image/jpeg', name: 'image.jpg'});
        formdata.append("width",this.state.imageWidth);
        formdata.append("height",this.state.imageHeight);
        formdata.append("colorNumber",this.props.colorNumber);
        formdata.append("contrastOffset",this.props.contrastOffset);
        if(this.state.iflogin==0)
            formdata.append("user_phone"," ");
        else
            formdata.append("user_phone",this.state.phone);

        this.state.textParams.forEach(
            (param) => formdata.append(param.name, param.value)
        );
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                this.setState({uploadProgress: (event.loaded / event.total).toFixed(2)});
                if(this.state.uploadProgress>=0.99){
                    console.log("should be here");
                    this.setState({
                        calculate:true,
                        uploadProgress:"计算中..."
                    });
                    dispatch(showuploadtoast);
                }
            }
        };
        xhr.send(formdata);
        console.log(formdata);
        this.setState({isUploading: true});
    }

    render(){
        var uploadButtonLabel = this.state.isUploading ? 'Uploading...' : '生成配色';
        var uploadProgress = this.state.uploadProgress;
        if(!this.state.calculate) {
            if (uploadProgress !== null) {
                uploadButtonLabel += ' ' + Math.round(uploadProgress * 100) + '%';
            }
        }
        else{
            uploadButtonLabel=this.state.uploadProgress;
        }
        var uploadButton = (
            <View style={styles.uploadButtonBox}>
                <Text style={styles.uploadButtonLabel}>{uploadButtonLabel}</Text>
            </View>
        );

        return(
            <TouchableHighlight onPress={this._upload.bind(this)} activeOpacity={1} underlayColor="rgba(255,255,255,0)">
                <View style={styles.uploadButton}>
                    {uploadButton}
                </View>
            </TouchableHighlight>
        )
    }
}


var styles = StyleSheet.create({
    wrapper: {
        borderRadius: 5,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#eeeeee',
        padding: 8,
    },
    progressBarLabel: {
        marginTop: 12,
        marginBottom: 8,
    },
    configRow: {
        flexDirection: 'row',
        paddingVertical: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    paramRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
    },
    photoLabel: {
        flex: 1,
    },
    randomPhoto: {
        width: 50,
        height: 50,
    },
    textButton: {
        color: 'blue',
    },
    addTextParamButton: {
        marginTop: 8,
    },
    textInput: {
        flex: 1,
        borderRadius: 3,
        borderColor: 'grey',
        borderWidth: 1,
        height: 30,
        paddingLeft: 8,
    },
    equalSign: {
        paddingHorizontal: 4,
    },
    uploadButton: {
        marginTop: 35,
    },
    uploadButtonBox: {
        width:320,
        flex: 1,
        paddingVertical: 9,
        alignItems: 'center',
        backgroundColor: '#333333',
        borderRadius: 4,
    },
    uploadButtonLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});
