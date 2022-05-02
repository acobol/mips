import ElementNode from "../../Nodes/ElementNode";

class PCModel extends ElementNode {
  constructor(name = "pc") {
    super({name, type: 'pc'});
    this.addOutPort('pc');
    this.addInPort('counter');
  }
}

export default PCModel;

