/**
 * Created by hh on 4/10/2016.
 */
export const GET_IF_PRAISE = "GET_IF_PRAISE";
export const RECEIVE_ALL_ARTICLE = "RECEIVE_ALL_ARTICLE";

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOG_OUT = 'USER_LOG_OUT';
export const USER_NOT_LOGIN = 'USER_NOT_LOGIN';

export const ADD_USER_FAVOR = "ADD_USER_FAVOR";

export const getIfPraise = userid => ({
   type: GET_IF_PRAISE,
   praise:[1,0,0,1,0,0]
});

export const getAllarticle = ()=> dispatch =>{
   return fetch("https://back.10000h.top/getallarticle").then(response=>response.json()).then(
       responseText=>{
          dispatch(receiveAllarticle(responseText));
       }
   )
};

export const receiveAllarticle = jsonText =>({
   type:RECEIVE_ALL_ARTICLE,
   content:jsonText
});

export const userlogin = (user) =>({
   type:USER_LOGIN,
   content:user,
});

export const usernotlogin = () =>({
   type:USER_NOT_LOGIN,
});
export const userlogout = () =>({
   type:USER_LOG_OUT,
});

export const adduserfavor = sequence => ({
   type:ADD_USER_FAVOR,
   content:sequence,
});