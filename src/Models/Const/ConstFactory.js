import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import ConstModel from "./ConstModel";

class ConstFactory extends AbstractReactFactory {
  constructor() {
    super('const');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new ConstModel();
  }
}

export default ConstFactory;

