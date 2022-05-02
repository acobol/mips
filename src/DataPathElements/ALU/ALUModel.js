import ElementNode from "../../Nodes/ElementNode";

class ALUModel extends ElementNode {
  constructor(name = "ALU") {
    super({name, type: 'ALU'});
    this.addInPort('reg1');
    this.addInPort('reg2');
    this.addInPort('ALUOp');
    this.addOutPort('result');
    this.addOutPort('zero');
  }
}

export default ALUModel;
