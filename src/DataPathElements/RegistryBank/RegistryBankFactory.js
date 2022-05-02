import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import RegistryBankModel from "./RegistryBankModel";

class RegistryBankFactory extends AbstractReactFactory {
  constructor() {
    super('registryBank');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new RegistryBankModel();
  }
}

export default RegistryBankFactory;

