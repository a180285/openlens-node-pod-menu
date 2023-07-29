/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */



import React from "react";
import { Renderer, Common } from "@k8slens/extensions";

type Pod = Renderer.K8sApi.Pod;

const {
  Component: {
    createTerminalTab,
    terminalStore,
    MenuItem,
    Icon,
  },
  Navigation,
} = Renderer;
const {
  Util,
  App,
} = Common;

export class ForceDeletePodMenu extends React.Component<Renderer.Component.KubeObjectMenuProps<Pod>> {
  async forceDeletePod() {
    const { object: pod } = this.props;

    const kubectlPath = App.Preferences.getKubectlPath() || "kubectl";
    const commandParts = [
      kubectlPath,
      "delete",
      "pod", pod.getName(),
      "-n", pod.getNs(),
      "--force",
      "--grace-period=0",
    ];

    if (window.navigator.platform !== "Win32") {
      commandParts.unshift("exec");
    }

    const shell = createTerminalTab({
      title: `Force delete Pod: ${pod.getName()}`,
    });

    terminalStore.sendCommand(commandParts.join(" "), {
      enter: true,
      tabId: shell.id,
    });

    Navigation.hideDetails();
  }

  render() {
    const { object, toolbar } = this.props;
    const containers = object.getRunningContainers();

    if (!containers.length) return null;

    return (
          <MenuItem onClick={Util.prevDefault(() => this.forceDeletePod())}>
            <Icon
                material="delete_forever"
                interactive={toolbar}
                tooltip={toolbar && "Force Delete Pod"}
            />
            <span className="title">Force Delete Pod</span>
          </MenuItem>
    );
  }
}
