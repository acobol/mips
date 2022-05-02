import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import ConcatenatorModel from "./ConcatenatorModel";

class ConcatenatorFactory extends AbstractReactFactory {
  constructor() {
    super('concatenator');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new ConcatenatorModel();
  }
}

export default ConcatenatorFactory;
