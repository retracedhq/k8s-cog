import "source-map-support/register";
import * as jsyaml from "js-yaml";

import getKubeApi from "./getKubeApi";

export default async function apply(clusterConfig: ClusterConfig, manifest: string) {
  const kubeApi = getKubeApi(clusterConfig);
  const body = jsyaml.load(manifest);
  const objectType: string = body.kind;
  const name = body.metadata.name;

  let category: any;
  switch (objectType.toLowerCase()) {
    case "deployment":
      category = kubeApi.extensions.namespaces.deployments;
      break;

    case "ingress":
      category = kubeApi.extensions.namespaces.ingresses;
      break;

    case "service":
      category = kubeApi.core.namespaces.services;
      break;

    default:
      throw new Error(`Unhandled k8s object type: '${objectType}'`);
  }

  return new Promise((resolve, reject) => {
    category.patch({ name, body }, (err: Error, resp: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(resp);
    });
  });
}
