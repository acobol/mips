import ElementNode from "../../Nodes/ElementNode";

class AddModel extends ElementNode {
  constructor(name = "add") {
    super({name, type: 'add'});
    this.addOutPort('result');
    this.addInPort('add1');
    this.addInPort('add2');
  }
}

export default AddModel;

