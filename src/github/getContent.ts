import "source-map-support/register";

import getGithub from "./getGithub";

export default async function getContent(cl: ClusterConfig, ref: string, path = ""): Promise<GithubFile[]> {
  const github = getGithub(cl);

  const githubToks = cl.githubRepo.split("/");
  const resp = await github.repos.getContent({
    owner: githubToks[0],
    repo: githubToks[1],
    path,
    ref,
  });

  const results: GithubFile[] = [];

  if (!Array.isArray(resp)) {
    results.push({
      name: resp.name,
      downloadUrl: resp.download_url,
    });
  } else {
    for (const item of resp) {
      results.push({
        name: item.name,
        downloadUrl: item.download_url,
      });
    }
  }

  return results;
}
