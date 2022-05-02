import ElementNode from "../../Nodes/ElementNode";

class ConcatenatorModel extends ElementNode {
  constructor(name = "concatenator") {
    super({name, type: 'concatenator'});
    this.addOutPort('out');
    this.addInPort('a');
    this.addInPort('b');
  }
}

export default ConcatenatorModel;
