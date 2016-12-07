import "source-map-support/register";
import * as K8s from "kubernetes-client";

interface KubeConfig {
  url: string;
  version?: string;
  ca?: string;
  cert?: string;
  key?: string;
  auth: {
    user?: string;
    pass?: string;
    bearer?: string;
  };
}

interface KubeClient {
  core: any;
  extensions: any;
}

const sharedClients: any = {};

export default function getKubeApi(clusterConfig: ClusterConfig) {
  const maybeShared = sharedClients[clusterConfig.name];
  if (maybeShared) {
    return maybeShared;
  }

  const k8sConfig: KubeConfig = {
    url: clusterConfig.endpoint,
    auth: {},
  };

  // The CA might be used in any of these auth schemes.
  if (clusterConfig.caCert) {
    k8sConfig.ca = clusterConfig.caCert;
  }

  switch (clusterConfig.authType) {
    case "username":
      k8sConfig.auth.user = clusterConfig.username;
      k8sConfig.auth.pass = clusterConfig.password;
      break;

    case "token":
      k8sConfig.auth.bearer = clusterConfig.authToken;
      break;

    case "cert":
      k8sConfig.cert = clusterConfig.clientCert;
      k8sConfig.key = clusterConfig.clientKey;
      break;

    default:
      throw new Error(`Unknown k8s auth type: '${clusterConfig.authType}'`);
  }

  const newClient: KubeClient = {
    core: new K8s.Core(k8sConfig),
    extensions: new K8s.Extensions(k8sConfig),
  };
  sharedClients[clusterConfig.name] = newClient;
  return newClient;
}
