import { DefaultPortModel } from "@projectstorm/react-diagrams";
import StateLink from "../../Links/StateLinkModel";

export class OutPortModel extends DefaultPortModel {
  constructor(options) {
    super({
      ...options,
      type: "outPort"
    });
  }

  createLinkModel(factory) {
    return new StateLink({});
  }
}

export default OutPortModel;
