import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import ALUControlModel from "./ALUControlModel";

class ALUControlFactory extends AbstractReactFactory {
  constructor() {
    super('ALUControl');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new ALUControlModel();
  }
}

export default ALUControlFactory;
