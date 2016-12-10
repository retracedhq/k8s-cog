import "source-map-support/register";
import * as util from "util";

import getKubeApi from "./getKubeApi";

interface LineObj {
  line: string;
}

async function getLogs(clusterConfig: ClusterConfig, podName: string, tailLines: number): Promise<LineObj[]> {
  const kubeApi = getKubeApi(clusterConfig);

  const lines = await new Promise<string[]>((resolve, reject) => {
    const opts = {
      name: `${podName}/log`,
      qs: { tailLines },
    };
    kubeApi.core.namespaces.pods.get(opts, (err: Error, result: string) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.split("\n"));
    });
  });

  // Cog templates need objects, not just strings, so...
  const result: LineObj[] = [];
  for (const line of lines) {
    result.push({ line });
  }

  return result;
};

export default getLogs;
