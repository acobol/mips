import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import InstructionsMemoryModel from "./InstructionsMemoryModel";

class InstructionsMemoryFactory extends AbstractReactFactory {
  constructor() {
    super('instructionsMemory');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new InstructionsMemoryModel();
  }
}

export default InstructionsMemoryFactory;

