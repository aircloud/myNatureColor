/**
 * Created by hh on 1/10/2016.
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TabBarIOS,
    View,
    Navigator,
    NetInfo
} from 'react-native';
import { connect } from 'react-redux'
import {getIfPraise,getAllarticle,userlogin,usernotlogin,userlogout} from "./actions";

import {GlobalStorage} from './components/Storage';

import Color from './components/Color';
import Center from './components/Center';
import Square from './components/Square';

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

class HomeApp extends Component{
    // statics:{
    //     title: '<TabBarIOS>',
    //     description: 'Tab-based navigation.',
    // },
    //
    // displayName: 'TabBarExample'

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Color',
            notifCount: 0,
            presses: 0,
        };
    }

    componentWillMount() {
        NetInfo.fetch().done((status)=> {
            console.log('Status:' + status);
        });
        //监听网络状态改变
        NetInfo.addEventListener('change', this.handleConnectivityChange.bind(this));
    }

    componentDidMount() {

        var {dispatch} =this.props;

        GlobalStorage.load({
            key:'user',
            autoSync:true,
            syncInBackground: false,
        }).then(resp=>{
            dispatch(userlogin(resp));
            console.log("from homeapp:resp",resp);
        }).catch(err => {
            dispatch(usernotlogin());
            console.log("from homeapp:no data user");
        });

        // NetInfo.isConnected.fetch().done((isConnected) => {
        //     console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        // });

        dispatch(getAllarticle());

    }

    handleConnectivityChange(status) {

        const {dispatch} =this.props;

        console.log('status change:' + status);

        if(status=="wifi" || status == "cell" || status == "unknown"){
            dispatch(getAllarticle());
            NetInfo.removeEventListener('change', this.handleConnectivityChange.bind(this));
        }
    }

    componentWillUnMount() {
        console.log("componentWillUnMount");
        NetInfo.removeEventListener('change', this.handleConnectivityChange.bind(this));
    }

    _renderContent(color, page) {
        // var allAppArticles="";
        // var appUserStatus;
        let rootViewName = page;
        let rootComponent;
        let squareType = "square_square";
        if(page=="Color")
            rootComponent = Color;
        else if(page=="Square") {
            rootComponent = Square;
            // allAppArticles = this.props.allAppArticles;
            // appUserStatus=this.props.appUserStatus;
            // console.log("allapp",allAppArticles);
        }
        else if(page=="Center")
            rootComponent = Center;

        return (
            <Navigator
                initialRoute = {{ name: rootViewName, component: rootComponent }}
                configureScene = {(route) => {
                    return Navigator.SceneConfigs.HorizontalSwipeJump ;
                }}
                renderScene = {(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator = {navigator} color={color}  squareType={squareType}/>
                }} />
            //这三个nav是返回的三个实例，所以我们可以把这三个当作三个顶层组件来用
        );
    }

    render() {
        return (
            <TabBarIOS
                barTintColor="#000000"
                unselectedTintColor="#FFFFFF"
                tintColor="#eeeeee"
              >
                <TabBarIOS.Item
                    renderAsOriginal
                    title="Color"
                    icon={require('./images/logo.png')}
                    selectedIcon={require('./images/logo0.png')}
                    selected={this.state.selectedTab === 'Color'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Color',
                        });
                    }}>
                    {this._renderContent('#414A8C', 'Color')}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('./images/Square1.png')}
                    selectedIcon={require('./images/Square2.png')}
                    title="Square"
                    selected={this.state.selectedTab === 'Square'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Square',
                            notifCount: this.state.notifCount + 1,
                        });
                    }}>
                    {this._renderContent('#783E33', 'Square')}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('./images/Center1.png')}
                    selectedIcon={require('./images/Center2.png')}
                    title="Center"
                    selected={this.state.selectedTab === 'Center'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Center',
                            presses: this.state.presses + 1
                        });
                    }}>
                    {this._renderContent('#21551C', 'Center')}
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

}

var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
});

function select(state){
    return{
        allAppArticles:state.allArticles,
        appUserStatus:state.appuser
    }
}

export default connect(select)(HomeApp);


// AppRegistry.registerComponent('HomeApp', () => HomeApp);
