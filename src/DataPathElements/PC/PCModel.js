import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { RightAnglePortModel } from "../../App";

class PCModel extends DefaultNodeModel {
  constructor(name = "pc") {
    super({name, type: 'pc'});
    this.addPort(new RightAnglePortModel(false, 'pc', 'pc'));
    this.addInPort('counter', 'counter');
  }
}

export default PCModel;

