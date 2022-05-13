import ElementNode from "../../Nodes/ElementNode";

class ControlModel extends ElementNode {
  constructor(name = "control") {
    super({name, type: 'control', color: 'orange'});
    this.addInPort('instruction');
    this.addOutPort('regdest', true, 1);
    this.addOutPort('ALUSrc', true, 1);
    this.addOutPort('jump', true, 1);
    this.addOutPort('branch', true, 1);
    this.addOutPort('memread', true, 1);
    this.addOutPort('memtoreg', true, 1);
    this.addOutPort('ALUOp', true, 2);
    this.addOutPort('memwrite', true, 1);
    this.addOutPort('regwrite', true, 1);
  }
}

export default ControlModel;
