import ElementNode from "../../Nodes/ElementNode";

class SignExtensorModel extends ElementNode {
  constructor(name = "signExtend") {
    super({name, type: 'signExtend'});
    this.addOutPort('out', true, 32);
    this.addInPort('signal');
  }
}

export default SignExtensorModel;
