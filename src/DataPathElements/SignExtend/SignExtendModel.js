import ElementNode from "../../Nodes/ElementNode";

class SignExtensorModel extends ElementNode {
  constructor(name = "signExtend") {
    super({name, type: 'signExtend'});
    this.addOutPort('out');
    this.addInPort('signal');
  }
}

export default SignExtensorModel;
