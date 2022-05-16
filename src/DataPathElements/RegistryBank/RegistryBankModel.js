import ElementNode from "../../Nodes/ElementNode";

class RegistryBankModel extends ElementNode {
  constructor(name = "Banco de registros") {
    super({name, type: 'registryBank'});
    this.addOutPort('Dato1', true, 32);
    this.addOutPort('Dato2', true, 32);
    this.addInPort('EscrReg');
    this.addInPort('Reg. lectura 1');
    this.addInPort('Reg. lectura 2');
    this.addInPort('Reg. escritura');
    this.addInPort('Dato a escribir');
  }
}

export default RegistryBankModel;

