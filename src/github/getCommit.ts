import "source-map-support/register";

import getGithub from "./getGithub";

export default async function getCommit(clusterConfig: ClusterConfig, sha: string) {
  const github = getGithub(clusterConfig);

  const githubToks = clusterConfig.githubRepo.split("/");
  return await github.gitdata.getCommit({
    owner: githubToks[0],
    repo: githubToks[1],
    sha,
  });
}
