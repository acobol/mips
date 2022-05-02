import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import RightAnglePortModel from "../../Ports/RigthAnglePort/RightAnglePortModel";

class InstructionsMemoryModel extends DefaultNodeModel {
  constructor(name = "instructionsMemory") {
    super({name, type: 'instructionsMemory'});
    this.addPort(new RightAnglePortModel(false, 'Instruction', 'Instruction'));
    this.addInPort('Address', 'Address');
  }
}

export default InstructionsMemoryModel;

