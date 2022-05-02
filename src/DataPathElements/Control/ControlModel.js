import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { RightAnglePortModel } from "../../App";

class ControlModel extends DefaultNodeModel {
  constructor(name = "control") {
    super({name, type: 'control'});
    this.addInPort('instruction', 'instruction');
    this.addPort(new RightAnglePortModel(false, 'regdest', 'regdest'));
    this.addPort(new RightAnglePortModel(false, 'ALUSrc', 'ALUSrc'));
    this.addPort(new RightAnglePortModel(false, 'jump', 'jump'));
    this.addPort(new RightAnglePortModel(false, 'branch', 'branch'));
    this.addPort(new RightAnglePortModel(false, 'memread', 'memread'));
    this.addPort(new RightAnglePortModel(false, 'mentoreg', 'memtoreg'));
    this.addPort(new RightAnglePortModel(false, 'ALUOp', 'ALUOp'));
    this.addPort(new RightAnglePortModel(false, 'memwrite', 'memwrite'));
    this.addPort(new RightAnglePortModel(false, 'regwrite', 'regwrite'));
  }
}

export default ControlModel;
