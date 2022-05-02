import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import RightAnglePortModel from "../../Ports/RigthAnglePort/RightAnglePortModel";

class AddModel extends DefaultNodeModel {
  constructor(name = "add") {
    super({name, type: 'add'});
    this.addPort(new RightAnglePortModel(false, 'result', 'result'));
    this.addInPort('add1', 'add1');
    this.addInPort('add2', 'add2');
  }
}

export default AddModel;

