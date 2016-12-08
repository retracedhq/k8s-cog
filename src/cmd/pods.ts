#!/usr/bin/env node

import "source-map-support/register";

import getClusterConfig from "../config/getClusterConfig";
import getPods from "../k8s/getPods";

// Expects:
// 0: cluster name
export default async function run() {
  try {
    const clusterConfig = getClusterConfig(process.env.COG_ARGV_0);
    const pods = await getPods(clusterConfig);
    process.stdout.write("COG_TEMPLATE: pods\n");
    process.stdout.write("JSON\n");
    process.stdout.write(JSON.stringify(pods));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
