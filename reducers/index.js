/**
 * Created by hh on 4/10/2016.
 */
import { combineReducers } from 'redux'
import {GET_IF_PRAISE,RECEIVE_ALL_ARTICLE,USER_LOGIN,USER_LOG_OUT,USER_NOT_LOGIN} from '../actions';

var ALLARTICLE = [
    {source:{uri: "assets-library://asset/asset.JPG?id=99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7&ext=JPG", isStatic: true},backgroundColor:"#a6e2e3",ifPraise:-1},
    {source:{uri: "assets-library://asset/asset.JPG?id=99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7&ext=JPG", isStatic: true},backgroundColor:"#d4c7be",ifPraise:-1},
    {source:{uri: "assets-library://asset/asset.JPG?id=99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7&ext=JPG", isStatic: true},backgroundColor:"#c3c1c4",ifPraise:-1},
    {source:{uri: "assets-library://asset/asset.JPG?id=99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7&ext=JPG", isStatic: true},backgroundColor:"#a6e2e3",ifPraise:-1},
    {source:{uri: "assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG", isStatic: true},backgroundColor:"#d4c7be",ifPraise:-1},
    {source:{uri: "assets-library://asset/asset.JPG?id=99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7&ext=JPG", isStatic: true},backgroundColor:"#c3c1c4",ifPraise:-1},
];

var USERDATA= {
  iflogin:0,
};

const allArticles = (state=ALLARTICLE,action) => {
    switch (action.type){
        case GET_IF_PRAISE:
            state[0].source.uri="assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG";
            return state;
        case RECEIVE_ALL_ARTICLE:
            return action.content;
        default:
            return state;
    }
};

const appuser = (state=USERDATA,action)=>{
    switch (action.type){
        case USER_LOGIN:
            return action.content;
        case USER_LOG_OUT:
            return USERDATA;
        case USER_NOT_LOGIN:
            return USERDATA;
        default:
            return state;
    }
};
const rootReducer = combineReducers({
    allArticles,
    appuser
});

export default rootReducer;