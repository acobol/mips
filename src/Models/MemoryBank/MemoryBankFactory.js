import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import MemoryBankModel from "./MemoryBankModel";

class MemoryBankFactory extends AbstractReactFactory {
  constructor() {
    super('memoryBank');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new MemoryBankModel();
  }
}

export default MemoryBankFactory;

