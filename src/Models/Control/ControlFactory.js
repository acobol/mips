import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import ControlModel from "./ControlModel";

class ControlFactory extends AbstractReactFactory {
  constructor() {
    super('control');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new ControlModel();
  }
}

export default ControlFactory;
