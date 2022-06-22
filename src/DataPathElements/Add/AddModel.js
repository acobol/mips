import ElementNode from "../../Nodes/ElementNode";
import {reaction} from "mobx";

class AddModel extends ElementNode {
  constructor(name = "Sumador") {
    super({name, type: 'add'});
    const result = this.addOutPort('Resultado');
    const add1 = this.addInPort('Sumando1');
    const add2 = this.addInPort('Sumando2');
    reaction(
      () => Math.max(add1.bits, add2.bits),
      (newBits) => {
        result.changeBitsNumber(newBits);
      }
    );
  }
}

export default AddModel;

