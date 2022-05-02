import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import AddModel from "./AddModel";

class AddFactory extends AbstractReactFactory {
  constructor() {
    super('add');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new AddModel();
  }
}

export default AddFactory;

