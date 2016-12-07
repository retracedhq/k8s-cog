import "source-map-support/register";
import * as github from "github";

const sharedClients: any = {};

export default function getGithub(clusterConfig: ClusterConfig) {
    const maybeCached = sharedClients[clusterConfig.name];
    if (maybeCached) {
        return maybeCached;
    }

    const newClient = github({
        protocol: "https",
    });

    sharedClients[clusterConfig.name] = newClient;
    return newClient;
}
