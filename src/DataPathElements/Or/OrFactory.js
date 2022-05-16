import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import OrModel from "./OrModel";

class OrFactory extends AbstractReactFactory {
  constructor() {
    super('or');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new OrModel();
  }
}

export default OrFactory;

