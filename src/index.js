const _ = require('lodash');
const { Openys7BizBuilder } = require('./ys7.js');

module.exports = {
  bind: (fpm) => {
    const bizModule = Openys7BizBuilder(fpm);
    // Run When Server Start
    fpm.registerAction('BEFORE_SERVER_START', () => {
      const c = fpm.getConfig('ys7', {
        apps: [ ]
      })
      const { apps } = c;
      if(!apps)
        return;
      _.map(apps, app => {
        bizModule.setAppkey(app);
      })

      fpm.extendModule('ys7', bizModule);
    })
    
    
    return bizModule;
  }
}
