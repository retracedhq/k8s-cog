import "source-map-support/register";

import getGithub from "./getGithub";

export default async function getCommits(clusterConfig: ClusterConfig): Promise<any[]> {
  const github = getGithub(clusterConfig);

  const githubToks = clusterConfig.githubRepo.split("/");
  return await github.repos.getCommits({
    owner: githubToks[0],
    repo: githubToks[1],
    sha: clusterConfig.githubBranch,
  });
}
