import "source-map-support/register";
import K8SApi = require("kubernetes-client");
import * as util from "util";

import getClusterConfig from "./getClusterConfig";
import findClusterIdx from "./findClusterIdx";

interface PodInfo {
  readonly name: string;
  readonly status: any;
  readonly ready: string;
  readonly restarts: number;
  readonly age: string;
}

export default async function getPods(clusterName?: string): Promise<PodInfo[]> {
  let clusterIdx = 0;
  if (clusterName) {
    clusterIdx = findClusterIdx(clusterName);
    if (clusterIdx < 0) {
      throw new Error(`Unknown cluster: '${clusterName}'`);
    }
  }

  const k8s = new K8SApi.Core(await getClusterConfig(clusterIdx));
  const pods = await callGetPods(k8s);
  const result = pods.map((pod: PodDesc) => {
    const statuses = pod.status.containerStatuses;
    const containerCount = statuses.length;
    const runningCount = statuses.filter((status) => {
      return status.ready;
    }).length;

    let restarts = 0;
    for (const status of statuses) {
      restarts += status.restartCount;
    }

    const age = pod.status.startTime;

    return {
      name: pod.metadata.name,
      status: pod.status.phase,
      ready: `${runningCount}/${containerCount}`,
      restarts,
      age,
    };
  });

  return result;
};

function callGetPods(k8s: any): Promise<PodDesc[]> {
  return new Promise((resolve, reject) => {
    k8s.ns.po.get((err: Error, result: GetPodsResponse) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.items);
    });
  });
}
