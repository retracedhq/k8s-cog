#!/usr/bin/env node

import "source-map-support/register";

import getClusterConfig from "../config/getClusterConfig";
import getLogs from "../k8s/getLogs";

// Expects:
// 0: cluster name
// 1: pod name
//
// Options:
// "count": max number of log lines to return 
export default async function run() {
  const clusterConfig = getClusterConfig(process.env.COG_ARGV_0);
  const count: number = process.env.COG_OPT_COUNT || 10;
  const logs = await getLogs(clusterConfig, process.env.COG_ARGV_1, count);
  process.stdout.write("COG_TEMPLATE: logs\n");
  process.stdout.write("JSON\n");
  process.stdout.write(JSON.stringify(logs));
};

run().catch(console.error);
