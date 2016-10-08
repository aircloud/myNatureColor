/**
 * Created by Xiaotao on 2/10/2016.
 */

import React, { Component } from 'react';
import {
    StatusBar,
    AppRegistry,
    StyleSheet,
    Image,
    View,
    Text,
    Navigator,
    Slider
} from 'react-native';


export default class UploadSilder extends Component{

    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
        };
    }

    render() {
        return (
            <View>
                <Text style={styles.text} >
                    {this.props.title}:{this.state.value && +this.state.value.toFixed(3)}
                </Text>
                <Slider
                    {...this.props}
                    onValueChange={(value) => this.setState({value: value})} />
            </View>
        );
    }
};

var styles = StyleSheet.create({
    slider: {
        height: 10,
        margin: 10,
        width:300,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        margin: 10,
    },
});
