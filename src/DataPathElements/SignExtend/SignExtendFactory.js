import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import SignExtensorModel from "./SignExtendModel";

class SignExtensorFactory extends AbstractReactFactory {
  constructor() {
    super('signExtend');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new SignExtensorModel();
  }
}

export default SignExtensorFactory;
