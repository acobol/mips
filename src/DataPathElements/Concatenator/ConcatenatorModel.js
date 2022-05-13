import ElementNode from "../../Nodes/ElementNode";
import {reaction} from "mobx";

class ConcatenatorModel extends ElementNode {
  constructor(name = "concatenator") {
    super({name, type: 'concatenator'});
    const result = this.addOutPort('out');
    const a = this.addInPort('a');
    const b = this.addInPort('b');
    reaction(
      () => a.bits + b.bits,
      (newBits) => {
        result.changeBitsNumber(newBits);
      }
    );
  }
}

export default ConcatenatorModel;
