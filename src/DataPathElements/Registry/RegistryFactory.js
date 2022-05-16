import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import RegistryModel from "./RegistryModel";

class RegistryFactory extends AbstractReactFactory {
  constructor() {
    super('registry');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new RegistryModel();
  }
}

export default RegistryFactory;
