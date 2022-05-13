import ElementNode from "../../Nodes/ElementNode";

class PCModel extends ElementNode {
  constructor(name = "pc") {
    super({name, type: 'pc'});
    this.addOutPort('pc', true, 32);
    this.addInPort('counter');
  }
}

export default PCModel;

