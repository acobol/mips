import ElementNode from "../../Nodes/ElementNode";

class AndModel extends ElementNode {
  constructor(name = "and") {
    super({name, type: 'and'});
    this.addOutPort('result');
    this.addInPort('add1');
    this.addInPort('add2');
  }
}

export default AndModel;

