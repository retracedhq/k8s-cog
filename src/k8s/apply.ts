import "source-map-support/register";

import getKubectl from "./getKubectl";

export default async function apply(clusterConfig: ClusterConfig, path: string) {
  const kubectl = getKubectl(clusterConfig);
  return await kubectl.command(`apply -f ${path}`);
}
