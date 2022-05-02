import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { RightAnglePortModel } from "../../App";

class MemoryBankModel extends DefaultNodeModel {
  constructor(name = "memoryBank") {
    super({name, type: 'memoryBank'});
    this.addPort(new RightAnglePortModel(false, 'Data', 'Data'));
    this.addInPort('MemWrite', 'MemWrite');
    this.addInPort('MemRead', 'MemRead');
    this.addInPort('Address', 'Address');
    this.addInPort('WriteData', 'WriteData');
  }
}

export default MemoryBankModel;

