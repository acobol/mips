import ElementNode from "../../Nodes/ElementNode";
import {reaction} from "mobx";

class RegistryModel extends ElementNode {
  constructor(name = "Registro") {
    super({name, type: 'registry'});
    const outSignal = this.addOutPort('Entrada');
    const inSignal = this.addInPort('Salida');
    reaction(
      () => inSignal.bits,
      (newBits) => {
        outSignal.changeBitsNumber(newBits);
      }
    );
  }
}

export default RegistryModel;