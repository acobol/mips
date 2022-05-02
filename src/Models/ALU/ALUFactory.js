import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import ALUModel from "./ALUModel";

class ALUFactory extends AbstractReactFactory {
  constructor() {
    super('ALU');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new ALUModel();
  }
}

export default ALUFactory;
