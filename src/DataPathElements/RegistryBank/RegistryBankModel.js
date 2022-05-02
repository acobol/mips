import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import RightAnglePortModel from "../../Ports/RigthAnglePort/RightAnglePortModel";

class RegistryBankModel extends DefaultNodeModel {
  constructor(name = "registryBank") {
    super({name, type: 'registryBank'});
    this.addPort(new RightAnglePortModel(false, 'ReadData1', 'ReadData1'));
    this.addPort(new RightAnglePortModel(false, 'ReadData2', 'ReadData2'));
    this.addInPort('RegWrite', 'RegWrite');
    this.addInPort('ReadRegister1', 'ReadRegister1');
    this.addInPort('ReadRegister2', 'ReadRegister2');
    this.addInPort('WriteRegister', 'WriteRegister');
    this.addInPort('WriteData', 'WriteData');
  }
}

export default RegistryBankModel;

