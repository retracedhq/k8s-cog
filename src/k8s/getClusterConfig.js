import * as base64 from 'base-64';

module.exports = async function(idx) {
  let config = {
    url: process.env[`K8S_CLUSTER_${idx}_ENDPOINT`]
  };

  if (process.env[`K8S_CLUSTER_${idx}_CA_CERT`]) {
    config.ca = base64.decode(process.env[`K8S_CLUSTER_${idx}_CA_CERT`]);
  }

  switch (process.env[`K8S_CLUSTER_${idx}_AUTH_TYPE`]) {
    case 'username':
      config.auth = {
        username: process.env[`K8S_CLUSTER_${idx}_USERNAME`],
        password: process.env[`K8S_CLUSTER_${idx}_PASSWORD`]
      };
      break;

    default:
      console.log('unknown auth type');
  }

  return config;
};

