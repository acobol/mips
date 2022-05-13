import ElementNode from "../../Nodes/ElementNode";
import {reaction} from "mobx";

class AddModel extends ElementNode {
  constructor(name = "add") {
    super({name, type: 'add'});
    const result = this.addOutPort('result');
    const add1 = this.addInPort('add1');
    const add2 = this.addInPort('add2');
    reaction(
      () => Math.max(add1.bits, add2.bits),
      (newBits) => {
        result.changeBitsNumber(newBits);
      }
    );
  }
}

export default AddModel;

