import ElementNode from "../../Nodes/ElementNode";

class ALUControlModel extends ElementNode {
  constructor(name = "ALUControl") {
    super({name, type: 'ALUControl', color: 'orange'});
    this.addOutPort('Operación ALU', true, 4);
    this.addInPort('Instrucción');
    this.addInPort('SelALUB');
  }
}

export default ALUControlModel;
