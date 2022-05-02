import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import PCModel from "./PCModel";

class PCFactory extends AbstractReactFactory {
  constructor() {
    super('pc');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new PCModel();
  }
}

export default PCFactory;

