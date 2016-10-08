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
    Text,
    Navigator
} from 'react-native';

import UploadSilder from './UploadSilder';
import ColorImageUpload from './ColorImageUpload';


export default class UploadInfo extends Component{

    constructor(props) {
        super(props);
        this.state = {
            photoSoure: {
                uri:this.props.imageUri,
                isStatic: true
            },
        };
    }

    render(){
        console.log(this.state.photoSoure);
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
                        <UploadSilder step={1} minimumValue={2} minimumTrackTintColor={"#333333"} title="颜色数目" maximumValue={9} value={2} style={styles.UploadSilderStyle}/>
                    </View>
                    <View style={styles.UploadSilderView}>
                        <UploadSilder step={1} minimumValue={1} minimumTrackTintColor={"#333333"} title="冷暖值" maximumValue={5} value={1} style={styles.UploadSilderStyle}/>
                    </View>
                    <ColorImageUpload uri={this.state.photoSoure.uri}/>
                    <View style={styles.tipView}>
                        <Text style={styles.tip}>左滑返回</Text>
                    </View>
                </View>
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
    }
});


AppRegistry.registerComponent('UploadInfo', () => UploadInfo);
