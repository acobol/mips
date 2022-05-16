import ElementNode from "../../Nodes/ElementNode";

class ALUModel extends ElementNode {
  constructor(name = "ALU") {
    super({name, type: 'ALU'});
    this.addInPort('Registro1');
    this.addInPort('Registro2');
    this.addInPort('ALU Operation');
    this.addOutPort('Resultado', true, 32);
    this.addOutPort('Cero', true, 1);
  }
}

export default ALUModel;
