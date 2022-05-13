import ElementNode from "../../Nodes/ElementNode";

class RegistryBankModel extends ElementNode {
  constructor(name = "registryBank") {
    super({name, type: 'registryBank'});
    this.addOutPort('ReadData1', true, 32);
    this.addOutPort('ReadData2', true, 32);
    this.addInPort('RegWrite');
    this.addInPort('ReadRegister1');
    this.addInPort('ReadRegister2');
    this.addInPort('WriteRegister');
    this.addInPort('WriteData');
  }
}

export default RegistryBankModel;

