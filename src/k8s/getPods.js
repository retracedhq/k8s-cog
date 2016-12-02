import * as _ from 'lodash';
import * as K8SApi from 'kubernetes-client';

import * as getClusterConfig from './getClusterConfig';
import * as findClusterIdx from './findClusterIdx';

module.exports = async function(args) {
  let clusterIdx = 0;
  if (args && args.length > 0) {
    clusterIdx = findClusterIdx(args[0]);
  }

  const k8s = new K8SApi.Core(await getClusterConfig(clusterIdx));
  const p = new Promise((resolve, reject) => {
    k8s.ns.po.get((err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      resolve(result.items);
    })
  });

  const pods = await p;
  const result = _.map(pods, (pod) => {
    const containerCount = pod.status.containerStatuses.length;
    const runningCount = _.filter(pod.status.containerStatuses, (containerStatus) => {
      return containerStatus.ready;
    }).length;

    let restarts = 0;
    _.forEach(pod.status.ContainerStatuses, (containerStatus) => {
      restarts += containerStatus.restartCount;
    });

    const age = pod.status.startTime;

    return {
      name: pod.metadata.name,
      status: pod.status.phase,
      ready: `${runningCount}/${containerCount}`,
      restarts: restarts,
      age: age
    };
  });

  return result;
};

