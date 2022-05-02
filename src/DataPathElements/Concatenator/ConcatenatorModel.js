import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import RightAnglePortModel from "../../Ports/RigthAnglePort/RightAnglePortModel";

class ConcatenatorModel extends DefaultNodeModel {
  constructor(name = "concatenator") {
    super({name, type: 'concatenator'});
    this.addPort(new RightAnglePortModel(false, 'out', 'out'));
    this.addInPort('a', 'a');
    this.addInPort('b', 'b');
  }
}

export default ConcatenatorModel;
