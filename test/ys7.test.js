const assert = require('assert');
const request = require('superagent');


describe('Open.ys7.com', function(){
  const auth = {};
  before( function( done){
    // get the accessToken
    request.post('https://open.ys7.com/api/lapp/token/get')
      .send({
        appKey: '159d12f188cc469b9197002a7e560036',
        appSecret: '94cc7e2a175bfc3e7edec1c6622b61f1',
      })
      .type('application/x-www-form-urlencoded')
      .then(function( data ) {
        auth.accessToken = data.body.data.accessToken;
        auth.expireTime = data.body.data.expireTime;
        console.log(data.body.data)
        done();
      }).catch(function(e){
        console.error(e);
        done(e);
      })
  })

  after( async () => {
    try {
      const rsp = await request.post('https://open.ys7.com/api/lapp/device/delete')
      .send({
        accessToken: auth.accessToken,
        deviceSerial: '166246114',
        validateCode: 'PNHDRL',
      })
      .type('application/x-www-form-urlencoded');

      console.log(rsp)
    } catch (error) {
      throw error;
    }
  })
  // it('get the accessToken', function(done){
  //   request.post('https://open.ys7.com/api/lapp/token/get')
  //     .send({
  //       appKey: '159d12f188cc469b9197002a7e560036',
  //       appSecret: '94cc7e2a175bfc3e7edec1c6622b61f1',
  //     })
  //     .type('application/x-www-form-urlencoded')
  //     .then(function( data ) {
  //       console.log(data.body);
  //       done();
  //     }).catch(function(e){
  //       console.error(e);
  //       done(e);
  //     })
      
  // })

  /*
  it('add device to list', function(done){
    request.post('https://open.ys7.com/api/lapp/device/add')
      .send({
        accessToken: auth.accessToken,
        deviceSerial: '165933667',
        validateCode: 'DYLQJU',
      })
      .type('application/x-www-form-urlencoded')
      .then(function( data ) {
        console.log(data.body);
        done();
      }).catch(function(e){
        console.error(e);
        done(e);
      })
      
  }) //*/

  it('get the device list', function(done){
    request.post('https://open.ys7.com/api/lapp/device/list')
      .send({
        accessToken: auth.accessToken,
      })
      .type('application/x-www-form-urlencoded')
      .then(function( data ) {
        // console.log(data.body);
        done();
      }).catch(function(e){
        console.error(e);
        done(e);
      })
      
  })  

  it('off the encrypt', function(done){
    request.post('https://open.ys7.com/api/lapp/device/encrypt/off')
      .send({
        accessToken: auth.accessToken,
        deviceSerial: 'C18894186',
        validateCode: 'CJOESC',
      })
      .type('application/x-www-form-urlencoded')
      .then(function( data ) {
        // console.log(data.body);
        done();
      }).catch(function(e){
        console.error(e);
        done(e);
      })
      
  })

  it('get the hls address', function(done){
    request.post('https://open.ys7.com/api/lapp/live/address/get')
      .send({
        accessToken: auth.accessToken,
        source: 'C52249255:1',
      })
      .type('application/x-www-form-urlencoded')
      .then(function( data ) {
        assert(data.body.data.length == 1);
        console.log(data);
        done();
      }).catch(function(e){
        console.error(e);
        done(e);
      })
      
  })

  it('get the device capacity', function(done){
    request.post('https://open.ys7.com/api/lapp/device/capacity')
      .send({
        accessToken: auth.accessToken,
        deviceSerial: 'C52249255',
      })
      .type('application/x-www-form-urlencoded')
      .then(function( data ) {
        assert(data.body.code == '200');
        
        console.log(data.body.data)
        done();
      }).catch(function(e){
        console.error(e);
        done(e);
      })
      
  })

  it('control', function(done){
    //操作命令：0-上，1-下，2-左，3-右，4-左上，5-左下，6-右上，7-右下，8-放大，9-缩小，10-近焦距，11-远焦距
    request.post('https://open.ys7.com/api/lapp/device/ptz/start')
      .send({
        accessToken: auth.accessToken,
        deviceSerial: 'C52249255',
        channelNo: 1,
        direction: 1,
        speed: 2,
      })
      .type('application/x-www-form-urlencoded')
      .then(function( data ) {
        console.log(data.body)
        assert(data.body.code == '200');
        done();
      }).catch(function(e){
        console.error(e);
        done(e);
      })
      
  })

  it('release', function(done){
    //操作命令：0-上，1-下，2-左，3-右，4-左上，5-左下，6-右上，7-右下，8-放大，9-缩小，10-近焦距，11-远焦距
    request.post('https://open.ys7.com/api/lapp/device/ptz/stop')
      .send({
        accessToken: auth.accessToken,
        deviceSerial: 'C52249255',
        channelNo: 1,
        direction: 1,
        // speed: 1,
      })
      .type('application/x-www-form-urlencoded')
      .then(function( data ) {
        console.log(data.body)
        assert(data.body.code =='200');
        done();
      }).catch(function(e){
        console.error(e);
        done(e);
      })
      
  })



});