import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { RightAnglePortModel } from "../../App";

class ALUControlModel extends DefaultNodeModel {
  constructor(name = "ALUControl") {
    super({name, type: 'ALUControl'});
    this.addPort(new RightAnglePortModel(false, 'operation', 'operation'));
    this.addInPort('instruction', 'instruction');
    this.addInPort('aluop', 'aluop');
  }
}

export default ALUControlModel;
