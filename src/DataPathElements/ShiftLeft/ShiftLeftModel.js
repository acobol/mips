import ElementNode from "../../Nodes/ElementNode";
import {reaction, makeObservable, observable} from "mobx";

class ShiftLeftModel extends ElementNode {
  constructor(name = "shiftLeft") {
    super({name, type: 'shiftLeft'});
    this.shift = 2;
    makeObservable(this, {
      shift: observable
    })
    const outPort = this.addOutPort('out');
    const signalPort = this.addInPort('signal');
    reaction(() => signalPort.bits + this.shift, (newBits) => {
      outPort.changeBitsNumber(newBits)
    });
  }
}

export default ShiftLeftModel;