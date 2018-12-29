require("chai").should();
const fpmc = require("fpmc-jssdk");
const assert = require('assert');
const { Func, init } = fpmc;
init({ appkey:'123123', masterKey:'123123', endpoint: 'http://localhost:9999/api' });


describe('ys7 Biz Test Unit', function(){
  before(function(done){
    const func = new Func('ys7.setAppkey');
    func.invoke({ appid: 22, appkey: '159d12f188cc469b9197002a7e560036', appsecret: '94cc7e2a175bfc3e7edec1c6622b61f1' })
      .then(function(data){
        assert.strictEqual(data, 1, 'shoule set ok')
        done();
      }).catch(function(err){
        done(err);
      })
  })

  it('List', function(done){
    const func = new Func('ys7.list');
    func.invoke({ appid: 22 })
      .then(function(data){
        data.code.should.equal('200');
        done();
      }).catch(function(err){
        done(err);
      })
  })
  /*
  it('Unbind', function(done){
    const func = new Func('ys7.unbind');
    func.invoke({ deviceSerial: '165933667' })
      .then(function(data){
        data.code.should.equal('200');
        done();
      }).catch(function(err){
        done(err);
      })
  })//*/
  it('Bind', function(done){
    const func = new Func('ys7.bind');
    func.invoke({ appid: 22, deviceSerial: '165933667', validateCode: 'DYLQJU' })
      .then(function(data){
        data.code.should.equal('200');
        done();
      }).catch(function(err){
        done(err);
      })
  })
  it('live', function(done){
    const func = new Func('ys7.live');
    func.invoke({ appid: 22, source: '165933667:1'})
      .then(function(data){
        data.code.should.equal('200');
        console.log(data.data)
        done();
      }).catch(function(err){
        done(err);
      })
  })
  /*
  it('disableEncrypt', function(done){
    const func = new Func('ys7.disableEncrypt');
    func.invoke({ deviceSerial: '165933667', validateCode: 'DYLQJU' })
      .then(function(data){
        data.code.should.equal('200');
        console.log(data.data)
        done();
      }).catch(function(err){
        done(err);
      })
  })//*/

  it('control', function(done){
    const func = new Func('ys7.control');
    //操作命令：0-上，1-下，2-左，3-右，4-左上，5-左下，6-右上，7-右下，8-放大，9-缩小，10-近焦距，11-远焦距
    func.invoke({
      appid: 22,
      deviceSerial: 'C54938441',
      channelNo: 1,
      direction: 11,
      speed: 1,
    })
      .then(function(data){
        data.code.should.equal('200');
        done();
      }).catch(function(err){
        done(err);
      })
  })

  it('release', function(done){
    const func = new Func('ys7.release');
    //操作命令：0-上，1-下，2-左，3-右，4-左上，5-左下，6-右上，7-右下，8-放大，9-缩小，10-近焦距，11-远焦距
    func.invoke({
      appid: 22,
      deviceSerial: 'C54938441',
      channelNo: 1,
      direction: 11,
    })
      .then(function(data){
        data.code.should.equal('200');
        done();
      }).catch(function(err){
        done(err);
      })
  })

  it('capacity', function(done){
    const func = new Func('ys7.capacity');
    func.invoke({
      appid: 22,
      deviceSerial: 'C54938441',
    })
      .then(function(data){
        data.code.should.equal('200');
        done();
      }).catch(function(err){
        done(err);
      })
  })
})
