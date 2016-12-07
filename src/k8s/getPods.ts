import "source-map-support/register";
import getKubeApi from "./getKubeApi";

interface PodInfo {
  readonly name: string;
  readonly status: any;
  readonly ready: string;
  readonly restarts: number;
  readonly age: string;
}

export default async function getPods(clusterConfig: ClusterConfig): Promise<PodInfo[]> {
  const kubeApi = getKubeApi(clusterConfig);
  const pods = await new Promise<any[]>((resolve, reject) => {
    kubeApi.core.namespaces.pods.get((err: any, result: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.items);
    });
  });

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
