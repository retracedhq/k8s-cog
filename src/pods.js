import 'source-map-support/register';

import * as getPods from './k8s/getPods';

module.exports = function() {
  getPods().then((pods) => {
    console.log('COG_TEMPLATE: pods')
    console.log('JSON\n');
    console.log(JSON.stringify(pods));
  });
};
