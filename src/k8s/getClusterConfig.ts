import "source-map-support/register";
import * as base64 from "base-64";

interface ClusterConfig {
  url: string;
  ca?: string;
  auth?: {
    username?: string;
    password?: string;
  };
}

export default async function(idx: number): Promise<ClusterConfig> {
  let config: ClusterConfig = {
    url: process.env[`K8S_CLUSTER_${idx}_ENDPOINT`],
  };

  if (process.env[`K8S_CLUSTER_${idx}_CA_CERT`]) {
    config.ca = base64.decode(process.env[`K8S_CLUSTER_${idx}_CA_CERT`]);
  }

  const authType = process.env[`K8S_CLUSTER_${idx}_AUTH_TYPE`];
  switch (authType) {
    case "username":
      config.auth = {
        username: process.env[`K8S_CLUSTER_${idx}_USERNAME`],
        password: process.env[`K8S_CLUSTER_${idx}_PASSWORD`],
      };
      break;

    default:
      throw new Error(`unknown auth type: ${authType}`);
  }

  return config;
};
