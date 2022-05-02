import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import ShiftLeftModel from "./ShiftLeftModel";

class ShiftLeftFactory extends AbstractReactFactory {
  constructor() {
    super('shiftLeft');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new ShiftLeftModel();
  }
}

export default ShiftLeftFactory;
