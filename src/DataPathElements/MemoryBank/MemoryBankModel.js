import ElementNode from "../../Nodes/ElementNode";

class MemoryBankModel extends ElementNode {
  constructor(name = "Memoria") {
    super({name, type: 'memoryBank'});
    this.addOutPort('Dato/Instrucción', true, 32);
    this.addInPort('Dirección');
    this.addInPort('Dato a escribir');
    this.addInPort('LeerMem');
    this.addInPort('EscrMem');
  }
}

export default MemoryBankModel;

