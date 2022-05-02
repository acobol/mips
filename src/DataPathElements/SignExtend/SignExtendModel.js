import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { RightAnglePortModel } from "../../App";

class SignExtensorModel extends DefaultNodeModel {
  constructor(name = "signExtend") {
    super({name, type: 'signExtend'});
    this.addPort(new RightAnglePortModel(false, 'out', 'out'));
    this.addInPort('signal', 'signal');
  }
}

export default SignExtensorModel;
