import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import RightAnglePortModel from "../../Ports/RigthAnglePort/RightAnglePortModel";

class ALUModel extends DefaultNodeModel {
  constructor(name = "ALU") {
    super({name, type: 'ALU'});
    this.addInPort('reg1', 'reg1');
    this.addInPort('reg2', 'reg2');
    this.addInPort('ALUOp', 'ALUOp');
    this.addPort(new RightAnglePortModel(false, 'result', 'result'));
    this.addPort(new RightAnglePortModel(false, 'zero', 'zero'));
  }
}

export default ALUModel;
