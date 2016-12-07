interface ClusterConfig {
  readonly name: string;
  readonly endpoint: string;
  readonly authType: string;
  readonly githubRepo: string;
  readonly githubBranch: string;

  readonly username?: string;
  readonly password?: string;
  readonly authToken?: string;
  readonly caCert?: string;
  readonly clientCert?: string;
  readonly clientKey?: string;
}

// TODO: Turn this into a proper type definition.
declare module "k8s";
interface PodDesc {
  metadata: any;
  spec: any;
  status: PodStatus;
}
interface PodStatus {
  phase: string;
  conditions: any[];
  hostIP: string;
  podIP: string;
  startTime: string;
  containerStatuses: ContainerStatus[];
}
interface ContainerStatus {
  name: string;
  state: any;
  lastState: any;
  ready: boolean;
  restartCount: number;
  image: string;
  imageID: string;
  containerID: string;
}

declare module "base-64";

declare module "github";
interface GithubFile {
  name: string;
  downloadUrl: string;
}
