import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import RightAnglePortModel from "../../Ports/RigthAnglePort/RightAnglePortModel";

class AndModel extends DefaultNodeModel {
  constructor(name = "and") {
    super({name, type: 'and'});
    this.addPort(new RightAnglePortModel(false, 'result', 'result'));
    this.addInPort('add1', 'add1');
    this.addInPort('add2', 'add2');
  }
}

export default AndModel;

