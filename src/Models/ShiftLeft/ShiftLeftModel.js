import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { RightAnglePortModel } from "../../App";

class ShiftLeftModel extends DefaultNodeModel {
  constructor(name = "shiftLeft") {
    super({name, type: 'shiftLeft'});
    this.addPort(new RightAnglePortModel(false, 'out', 'out'));
    this.addInPort('signal', 'signal');
  }
}

export default ShiftLeftModel;