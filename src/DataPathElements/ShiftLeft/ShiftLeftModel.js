import ElementNode from "../../Nodes/ElementNode";

class ShiftLeftModel extends ElementNode {
  constructor(name = "shiftLeft") {
    super({name, type: 'shiftLeft'});
    this.addOutPort('out');
    this.addInPort('signal');
  }
}

export default ShiftLeftModel;