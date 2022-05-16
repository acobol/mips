import ElementNode from "../../Nodes/ElementNode";

class InstructionsRegsitryModel extends ElementNode {
  constructor(name = "Registro de instrucciones") {
    super({name, type: 'instructionsRegistry'});
    this.addOutPort('Instrucción [31 - 26]', true, 6);
    this.addOutPort('Instrucción [25 - 21]', true, 5);
    this.addOutPort('Instrucción [20 - 16]', true, 5);
    this.addOutPort('Instrucción [15 - 0]', true, 16);
    this.addInPort('Dirección');
  }
}

export default InstructionsRegsitryModel;

