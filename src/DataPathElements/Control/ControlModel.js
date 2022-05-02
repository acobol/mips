import ElementNode from "../../Nodes/ElementNode";

class ControlModel extends ElementNode {
  constructor(name = "control") {
    super({name, type: 'control'});
    this.addInPort('instruction');
    this.addOutPort('regdest');
    this.addOutPort('ALUSrc');
    this.addOutPort('jump');
    this.addOutPort('branch');
    this.addOutPort('memread');
    this.addOutPort('memtoreg');
    this.addOutPort('ALUOp');
    this.addOutPort('memwrite');
    this.addOutPort('regwrite');
  }
}

export default ControlModel;
