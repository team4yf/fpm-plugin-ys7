/*
  for open.ys7.com
  海康摄像头平台的接入方法
  https://open.ys7.com/doc/zh/book/index/device_option.html#device_option-api1
 */
const request = require('superagent');
const assert = require('assert');
const debug = require('debug')('fpm-plugin-ys7');

const _ = require('lodash');

// for support multi appkeys

/**
 * normally, it's like { 'appkey1': { appkey, expireTime } , ...};
 * so, we can access the data by the appkey.
 */
const AUTH_CACHE = {};
/*
const AUTH = {
  accessToken: '',
  expireTime: 0,
};
//*/

const setAppkey = (appid, appkey, appsecret) => {
  AUTH_CACHE[appid] = { appkey, appsecret };
}
const getAccessToken = async ( appid ) => {

  const auth = AUTH_CACHE[appid];
  assert(!!auth, 'appid havent be setted!');
  const { appkey, appsecret } = auth;

  let token = auth.token;
  if(token && token.expireTime > new Date().getTime()){
    // token still validate
    return token;
  }
  // get new token.
  try{
    const data = await request.post('https://open.ys7.com/api/lapp/token/get')
      .send({
        appKey: appkey,// || '159d12f188cc469b9197002a7e560036',
        appSecret: appsecret,// || '94cc7e2a175bfc3e7edec1c6622b61f1',
      })
      .type('application/x-www-form-urlencoded');
      auth.token = data.body.data;
      AUTH_CACHE[appid] = auth;
      return auth.token;
  }catch(e){
    debug('[ERROR] getAccessToken Error %O', e)
    return Promise.reject({ errno: -1, message: 'get access token error!', error: e });
  }
  
}

/**
 * 
 * @param {*} url 
 * @param {*} args  the args require the `appkey`
 */
const callApi = async (url, args) => {
  try{
    const { accessToken } = await getAccessToken(args.appid);
    const rsp = await request.post('https://open.ys7.com/api/lapp/' + url)
      .send(Object.assign(args, { accessToken }))
      .type('application/x-www-form-urlencoded');
    const { code, msg } = rsp.body;
    if(code != '200'){
      return Promise.reject({ errno: code, message: msg });
    }
    return rsp.body;
  }catch(e){
    debug('[ERROR] callApi Error %O', e)
    return Promise.reject(e);
  }
}

const Openys7BizBuilder = fpm => {
  return {
    setAppkey: args => {
      // add the appkey to the pool
      const { appkey, appsecret, appid } = args;
      try {
        assert(!!appid, 'appid required');
        assert(!!appsecret, 'appsecret required');
        assert(!!appkey, 'appkey required');
        setAppkey(appid, appkey, appsecret);
        return 1;
      } catch (error) {
        return Promise.reject({ errno: -7, message: error.message });
      }
      
    },
    bind: async args => {
      // should disable the encrypt
      let data;
      try{
        data = await callApi('device/add', args );
        await callApi('device/encrypt/off', args );
        // store the info
        return data;
      } catch (error) {
        debug('[ERROR] bind Error %O', error)
        let { errno } = error;
        if(isNaN(errno)){
          return Promise.reject(error);
        }
        errno = Math.abs( errno );
        if(errno == 60016){
          // 加密未开启，无需关闭
          
        }else if(errno == 20017){
          // 已添加

        }else{
          return Promise.reject(error);
        }
        
      }
      
      return { code: '200', message: 'OK' };
    },
    list: async args => {
      return callApi('device/list', args );
    },
    lives: async args => {
      return callApi('live/video/list', args );
    },
    live: async args => {
      return callApi('live/address/get', args );
    },
    unbind: async args => {
      return callApi('device/delete', args );
    },
    disableEncrypt: async args => {
      return callApi('device/encrypt/off', args );
    },
    enableEncrypt: async args => {
      return callApi('device/encrypt/on', args );
    },
    control: async args => {
      try{
        let data = await callApi('device/capacity', args );
        debug('the capacity of the device: %O', data);
        if(data.data.support_ptz == '0'){
          // not support control
          return Promise.reject({ code: -60000, message: '设备不支持云台控制' });
        }
        return callApi('device/ptz/start', args );
      } catch (error) {
        debug('[ERROR] control Error %O', error)
        return Promise.reject(error);
      }
      
    },
    release: async args => {
      return callApi('device/ptz/stop', args );
    },
    capacity: async args => {
      return callApi('device/capacity', args );
    }
  }
}

exports.Openys7BizBuilder = Openys7BizBuilder;