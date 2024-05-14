import * as core from '@actions/core';
import * as kubernetes from '@kubernetes/client-node';

export default async function run(): Promise<void> {
  try {
    const namespace: string = core.getInput('namespace');

    // Get the Kubernetes configuration
    const kc = new kubernetes.KubeConfig();
    kc.loadFromDefault();

    // Create the Kubernetes API client
    const k8sApi = kc.makeApiClient(kubernetes.CoreV1Api);

    // Get the pods in the namespace
    const pods = await k8sApi.listNamespacedPod(namespace);

    // Log the pods
    core.info(`There are ${pods.body.items.length} pods in the namespace ${namespace}`);

    // Restarts the pods
    for (const pod of pods.body.items) {
      const podName = pod.metadata?.name;
      if (podName) {
        core.info(`Deleting pod ${podName}`);
        await k8sApi.deleteNamespacedPod(podName, namespace);
      }
    }

    // Log that the action has completed
    core.info(`Successfully restarted all pods in namespace ${namespace}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(`Failed to restart pods: ${error.message}`);
  }
}

if (require.main === module) {
  run();
}
