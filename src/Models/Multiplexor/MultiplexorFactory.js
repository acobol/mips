import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultNodeWidget } from "@projectstorm/react-diagrams";
import MultiplexorModel from "./MultiplexorModel";

class MultiplexorFactory extends AbstractReactFactory {
  constructor() {
    super('multiplexor');
  }

  generateReactWidget(event) {
    return <DefaultNodeWidget engine={this.engine} size={50} node={event.model}></DefaultNodeWidget>
  }

  generateModel(event) {
    return new MultiplexorModel();
  }
}

export default MultiplexorFactory;
