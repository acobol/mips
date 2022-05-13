import ElementNode from "../../Nodes/ElementNode";

class ConstModel extends ElementNode {
  constructor(name = "const") {
    super({name, type: 'const'});
    this.addOutPort('result', true, 32);
  }
}

export default ConstModel;

