import "source-map-support/register";
import * as base64 from "base-64";

const cachedConfigs: any = {};

export default function (name: string): ClusterConfig {
  const maybeCached = cachedConfigs[name];
  if (maybeCached) {
    return maybeCached;
  }

  let idx = -1;
  const count = parseInt(process.env.K8S_CLUSTER_COUNT, 10);
  for (let i = 0; i < count; i++) {
    if (process.env[`K8S_CLUSTER_${i}_NAME`] === name) {
      idx = i;
      break;
    }
  }

  if (idx < 0) {
    throw new Error(`Couldn't find cluster config for name '${name}'`);
  }

  const prefix = `K8S_CLUSTER_${idx}`;

  const maybeCaCert = process.env[`${prefix}_CA_CERT`];
  const maybeClientCert = process.env[`${prefix}_CLIENT_CERT`];
  const maybeClientKey = process.env[`${prefix}_CLIENT_KEY`];

  const newConfig: ClusterConfig = {
    name: process.env[`${prefix}_NAME`],
    endpoint: process.env[`${prefix}_ENDPOINT`],
    authType: process.env[`${prefix}_AUTH_TYPE`],
    githubRepo: process.env[`${prefix}_GITHUB_REPO`],
    githubBranch: process.env[`${prefix}_GITHUB_BRANCH`],
    username: process.env[`${prefix}_USERNAME`],
    password: process.env[`${prefix}_PASSWORD`],
    authToken: process.env[`${prefix}_AUTH_TOKEN`],
    caCert: maybeCaCert ? base64.decode(maybeCaCert) : undefined,
    clientCert: maybeClientCert ? base64.decode(maybeClientCert) : undefined,
    clientKey: maybeClientKey ? base64.decode(maybeClientKey) : undefined,
  };

  cachedConfigs[name] = newConfig;
  return newConfig;
}
