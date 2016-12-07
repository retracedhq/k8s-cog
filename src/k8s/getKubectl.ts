import "source-map-support/register";
import * as k8s from "k8s";

interface KubeConfig {
  endpoint: string;
  binary: string;
  auth: {
    caCert?: string;
    clientCert?: string;
    clientKey?: string;
    username?: string;
    password?: string;
    token?: string;
  };
}

const sharedClients: any = {};

export default function getKubectl(clusterConfig: ClusterConfig) {
  const maybeShared = sharedClients[clusterConfig.name];
  if (maybeShared) {
    return maybeShared;
  }

  const k8sConfig: KubeConfig = {
    endpoint: clusterConfig.endpoint,
    binary: "/usr/local/bin/kubectl",
    auth: {},
  };

  // The CA might be used in any of these auth schemes.
  if (clusterConfig.caCert) {
    k8sConfig.auth.caCert = clusterConfig.caCert;
  }

  switch (clusterConfig.authType) {
    case "username":
      k8sConfig.auth.username = clusterConfig.username;
      k8sConfig.auth.password = clusterConfig.password;
      break;

    case "token":
      k8sConfig.auth.token = clusterConfig.authToken;
      break;

    case "cert":
      k8sConfig.auth.clientCert = clusterConfig.clientCert;
      k8sConfig.auth.clientKey = clusterConfig.clientKey;
      break;

    default:
      throw new Error(`Unknown k8s auth type: '${clusterConfig.authType}'`);
  }

  const newClient = k8s.kubectl(k8sConfig);
  sharedClients[clusterConfig.name] = newClient;
  return newClient;
}
