import "source-map-support/register";

export default function findClusterIdx(name: string): number {
  const count = parseInt(process.env.K8S_CLUSTER_COUNT, 10);
  for (let i = 0; i < count; i++) {
    if (process.env[`K8S_CLUSTER_${i}_NAME`] === name) {
      return i;
    }
  }

  return -1;
};
