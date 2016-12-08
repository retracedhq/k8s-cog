#!/usr/bin/env node

import "source-map-support/register";
import * as fs from "fs";
import * as request from "request";
import * as tmp from "tmp";
import * as util from "util";
import * as path from "path";

import getClusterConfig from "../config/getClusterConfig";
import getCommits from "../github/getCommits";
import getContent from "../github/getContent";
import kubeApply from "../k8s/apply";

const applyExts = [".yml", ".yaml", ".json"];

// Expects:
// 0: cluster name
// 1: commit SHA
export default async function run() {
  try {
    const clusterConfig = getClusterConfig(process.env.COG_ARGV_0);
    const sha = process.env.COG_ARGV_1;

    let fullSha: string = "";
    if (sha === "HEAD") {
      // Allow HEAD as passthrough value.
      fullSha = sha;
    } else {
      const allCommits = await getCommits(clusterConfig);
      for (const commit of allCommits) {
        if (commit.sha.startsWith(sha)) {
          fullSha = commit.sha;
          break;
        }
      }
    }

    if (!fullSha) {
      throw new Error(`Unable to find commit with id '${sha}'`);
    }

    const results: any[] = [];
    const contents = await getContent(clusterConfig, fullSha);
    for (const item of contents) {
      if (applyExts.indexOf(path.extname(item.name)) !== -1) {
        const output = await fetchAndProcessFile(clusterConfig, item);
        results.push({
          name: item.name,
          output: output.trim(),
        });
      }
    }

    process.stdout.write("COG_TEMPLATE: deploy\n");
    process.stdout.write("JSON\n");
    process.stdout.write(JSON.stringify(results));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// TODO: De-callbackify this tangle.
function fetchAndProcessFile(cl: ClusterConfig, f: GithubFile): Promise<string> {
  return new Promise((resolve, reject) => {
    tmp.file({ postfix: path.extname(f.name) }, (tmpErr, tmpPath, tmpFd, tmpCleanup) => {
      if (tmpErr) {
        reject(tmpErr);
        return;
      }

      const out = fs.createWriteStream("", { fd: tmpFd });
      const pipeStream = request
        .get(f.downloadUrl)
        .on("error", (requestErr) => {
          tmpCleanup();
          reject(requestErr);
        })
        .pipe(out);

      pipeStream.on("finish", () => {
        kubeApply(cl, tmpPath)
          .then((output: string) => {
            resolve(output);
          })
          .catch(reject);
      });
    });
  });
}

run();
