const fpmc = require("fpmc-jssdk");
const assert = require('assert');
const { Func, init } = fpmc;
init({ appkey:'123123', masterKey:'123123', endpoint: 'http://localhost:9999/api' });


describe('ys7 Biz Test Unit', function(){
  before( async () =>{
    try {
      func = new Func('ys7.setAppkey');
      data = await func.invoke({ appid: 22, appkey: '159d12f188cc469b9197002a7e560036', appsecret: '94cc7e2a175bfc3e7edec1c6622b61f1' })  
      assert.strictEqual(data, 1, 'shoule set ok')
      data = await new Func('ys7.info')
        .invoke({ appid: 22, deviceSerial: '166246114' })
      data = await new Func('ys7.unbind')
        .invoke({ appid: 22, deviceSerial: '166246114' })

    } catch (error) {
      throw error
    }
    
      
  })
  
  /*
  it('Unbind', async() => {
    try {
      // let rsp = await new Func('ys7.enableEncrypt').invoke({ appid: 22, deviceSerial: '166246114' });
      // assert( rsp.code == '200', 'enableEncrypt Error')
      rsp = await new Func('ys7.unbind').invoke({ appid: 22, deviceSerial: '166246114' });
      assert( rsp.code == '200', 'UnBind Error');

    } catch (error) {
      throw error;
    }
  })//*/

  /*
  it('enableEncrypt', async() => {
    try {
      let rsp = await new Func('ys7.enableEncrypt').invoke({ appid: 22, deviceSerial: '166246114' });
      assert( rsp.code == '200', 'enableEncrypt Error')
    } catch (error) {
      throw error;
    }
  })//*/
  //*
  it('Bind', function(done){
    const func = new Func('ys7.bind');
    func.invoke({ appid: 22, deviceSerial: '166246114', validateCode: 'PNHDRL' })
      .then(function(data){
        assert(data.code == '200');
        console.log(data)
        done();
      }).catch(function(err){
        done(err);
      })
  })//*/
})
