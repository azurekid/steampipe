import {
  CheckNodeStatus,
  CheckNodeType,
  CheckSummary,
  CheckNode,
} from "../index";

class RootNode implements CheckNode {
  private readonly _children: CheckNode[];

  constructor(children?: CheckNode[]) {
    this._children = children || [];
  }

  get sort(): string {
    return this.title;
  }

  get name(): string {
    return "root";
  }

  get title(): string {
    return "Root";
  }

  get type(): CheckNodeType {
    return "root";
  }

  get summary(): CheckSummary {
    const summary = {
      alarm: 0,
      ok: 0,
      info: 0,
      skip: 0,
      error: 0,
    };
    for (const child of this._children) {
      const nestedSummary = child.summary;
      summary.alarm += nestedSummary.alarm;
      summary.ok += nestedSummary.ok;
      summary.info += nestedSummary.info;
      summary.skip += nestedSummary.skip;
      summary.error += nestedSummary.error;
    }
    return summary;
  }

  get status(): CheckNodeStatus {
    let hasError = false;
    for (const child of this._children) {
      if (child.status === "ready") {
        return "ready";
      }
      if (child.status === "started") {
        return "started";
      }
      if (child.status === "error") {
        hasError = true;
      }
    }
    return hasError ? "error" : "complete";
  }

  get children(): CheckNode[] {
    return this._children;
  }
}

export default RootNode;