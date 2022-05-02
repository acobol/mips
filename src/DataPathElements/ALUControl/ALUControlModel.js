import ElementNode from "../../Nodes/ElementNode";

class ALUControlModel extends ElementNode {
  constructor(name = "ALUControl") {
    super({name, type: 'ALUControl'});
    this.addOutPort('operation');
    this.addInPort('instruction');
    this.addInPort('aluop');
  }
}

export default ALUControlModel;
