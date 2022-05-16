import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import InstructionsRegistryModel from "./InstructionsRegistryModel";

class InstructionsRegistryFactory extends AbstractReactFactory {
  constructor() {
    super('instructionsRegistry');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new InstructionsRegistryModel();
  }
}

export default InstructionsRegistryFactory;

