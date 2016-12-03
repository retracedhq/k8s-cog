// TODO: Turn this into a proper type definition.
declare module "kubernetes-client";
interface GetPodsResponse {
    kind: string;
    apiVersion: string;
    metadata: any;
    items: PodDesc[];
}
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