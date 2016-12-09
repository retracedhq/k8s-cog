#!/usr/bin/env node

import "source-map-support/register";
import * as fs from "fs";
import * as request from "request-promise-native";
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
      const itemBody = await request(item.downloadUrl);
      const output = await kubeApply(clusterConfig, itemBody);
      results.push({
        name: item.name,
        result: "patched",
      });
    }
  }

  process.stdout.write("COG_TEMPLATE: deploy\n");
  process.stdout.write("JSON\n");
  process.stdout.write(JSON.stringify(results));
}

run().catch(console.error);
