import ElementNode from "../../Nodes/ElementNode";

class MemoryBankModel extends ElementNode {
  constructor(name = "memoryBank") {
    super({name, type: 'memoryBank'});
    this.addOutPort('Data', true, 32);
    this.addInPort('MemWrite');
    this.addInPort('MemRead');
    this.addInPort('Address');
    this.addInPort('WriteData');
  }
}

export default MemoryBankModel;

