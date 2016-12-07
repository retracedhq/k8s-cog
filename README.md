# Kubernetes Bundle for Cog

![Build Status](https://circleci.com/gh/retracedhq/kubernetes-cog.png)

## Commands
```
k8s:deploy <cluster> <sha> - (similar to: kubectl apply)
k8s:pods <cluster> - (similar to: kubectl get pods)
k8s:pod <cluster> <pod_name> - (similar to: kubectl describe pod <pod_name>)
k8s:svc <cluster> - (similar to: kubectl get svc)
k8s:pv <cluster> - (similar to: kubectl get pv)
k8s:pvc <cluster> - (similar to: kubectl get pvc)
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
K8S_CLUSTER_0_PASSWORD=<password, when auth_type is set to username>
K8S_CLUSTER_0_AUTH_TOKEN=<token, when auth_type is set to token>
K8S_CLUSTER_0_CLIENT_CERT=<auth cert, when auth_type is set to cert>
K8S_CLUSTER_0_CLIENT_KEY=<private key, when auth_type is set to cert>
K8S_CLUSTER_0_GITHUB_REPO=<"owner/repo" pointing to public Github repo containing deployment files>
K8S_CLUSTER_0_GITHUB_BRANCH=<name of branch to use when discovering deployment files>

K8S_CLUSTER_1_NAME=<a friendly name to use to reference the cluster in commands>
K8S_CLUSTER_1_ENDPOINT=<the endpoint of the cluster with protocol, ip and port>
K8S_CLUSTER_1_CA_CERT=<ca cert data, base64 encoded, if the cluster requires an untrusted cert>
K8S_CLUSTER_1_AUTH_TYPE=<username | token | cert>
K8S_CLUSTER_1_USERNAME=<username, when auth_type is set to username>
K8S_CLUSTER_1_PASSWORD=<password, when auth_type is set to username>
K8S_CLUSTER_1_AUTH_TOKEN=<token, when auth_type is set to token>
K8S_CLUSTER_1_CLIENT_CERT=<auth cert, when auth_type is set to cert>
K8S_CLUSTER_1_CLIENT_KEY=<private key, when auth_type is set to cert>
K8S_CLUSTER_1_GITHUB_REPO=<"owner/repo" pointing to public Github repo containing deployment files>
K8S_CLUSTER_1_GITHUB_BRANCH=<name of branch to use when discovering deployment files>
```

## Building
Clone this repo and then:

```shell
make build
```

This project is written in TypeScript, targeting Node 7.1.x