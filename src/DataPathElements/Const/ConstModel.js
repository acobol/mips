import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import RightAnglePortModel from "../../Ports/RigthAnglePort/RightAnglePortModel";

class ConstModel extends DefaultNodeModel {
  constructor(name = "const") {
    super({name, type: 'const'});
    this.addPort(new RightAnglePortModel(false, 'result', 'result'));
  }
}

export default ConstModel;

