import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import AndModel from "./AndModel";

class AndFactory extends AbstractReactFactory {
  constructor() {
    super('and');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new AndModel();
  }
}

export default AndFactory;

