import * as _ from 'lodash';

module.exports = async function(name) {
  for (let i = 0; i < parseInt(process.env['K8S_CLUSTER_COUNT']); i++) {
    if (process.env[`K8S_CLUSTER_${i}_NAME`] === name) {
      return i;
    }
  }

  return -1;
};

