# Kubernetes Bundle for Cog

![Build Status](https://circleci.com/gh/marccampbell/kubernetes-cog.png)

Note: most commands have a <cluster> argument. If the cog is only configured with a single cluster, this param can be ignored.

## Commands
```
k8s:pods <cluster> - `kubectl get pods`
k8s:pod <cluster> <pod_name> - `kubectl describe pod <pod_name>`
k8s:svc <cluster> - `kubectl get svc`
k8s:pv <cluster> - `kubectl get pv`
k8s:pvc <cluster> - `kubectl get pvc`
```

## Configuration
```
K8S_DEFAULT_CLUSTER=<the default cluster idx when one is not specified>
K8S_CLUSTER_COUNT=<the number of clusters configured>

K8S_CLUSTER_0_NAME=<a friendly name to use to reference the cluster in commands>
K8S_CLUSTER_0_ENDPOINT=<the endpoint of the cluster with protocol, ip and port>
K8S_CLUSTER_0_CA_CERT=<ca cert data, base64 encoded, if the cluster requires an untrusted cert>
K8S_CLUSTER_0_AUTH_TYPE=<username | token | cert>
K8S_CLUSTER_0_USERNAME=<username, when auth_type is set to username>
K8S_CLUSTER_0_PASSWORD=<password, when auth_type is set to password>

K8S_CLUSTER_1_NAME=<a friendly name to use to reference the cluster in commands>
K8S_CLUSTER_1_ENDPOINT=<the endpoint of the cluster with protocol, ip and port>
K8S_CLUSTER_1_CA_CERT=<ca cert data, base64 encoded, if the cluster requires an untrusted cert>
K8S_CLUSTER_1_AUTH_TYPE=<username | token | cert>
K8S_CLUSTER_1_USERNAME=<username, when auth_type is set to username>
K8S_CLUSTER_1_PASSWORD=<password, when auth_type is set to password>
```

## Building
Clone this repo and then:

```shell
make build
```

This project is written in Node, but using a typescript transpiler to take advantage of async/await functionality. It could also use typescript!