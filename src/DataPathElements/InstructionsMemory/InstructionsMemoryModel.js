import ElementNode from "../../Nodes/ElementNode";

class InstructionsMemoryModel extends ElementNode {
  constructor(name = "instructionsMemory") {
    super({name, type: 'instructionsMemory'});
    this.addOutPort('Instruction');
    this.addInPort('Address');
  }
}

export default InstructionsMemoryModel;

