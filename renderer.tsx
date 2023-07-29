/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { Renderer } from "@k8slens/extensions";
import { NodeMenu } from "./src/node-menu";
import { ForceDeletePodMenu } from "./src/force-delete-menu";
import { PodShellMenu } from "./src/shell-menu";
import { PodLogsMenu } from "./src/logs-menu";
import React from "react";

export default class PodMenuRendererExtension extends Renderer.LensExtension {
  kubeObjectMenuItems = [
    {
      kind: "Pod",
      apiVersions: ["v1"],
      components: {
        MenuItem: (props: Renderer.Component.KubeObjectMenuProps<Renderer.K8sApi.Pod>) => <ForceDeletePodMenu {...props} />,
      },
    },
  ];
}
