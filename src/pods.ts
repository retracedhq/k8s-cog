import "source-map-support/register";

import getPods from "./k8s/getPods";

export default async function run() {
  try {
    const pods = await getPods(process.env.COG_ARGV_0);
    process.stdout.write("COG_TEMPLATE: pods\n");
    process.stdout.write("JSON\n");
    process.stdout.write(JSON.stringify(pods));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
