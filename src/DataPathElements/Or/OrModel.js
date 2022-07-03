import ElementNode from "../../Nodes/ElementNode";

const or = (a, b) => a | b;

const RESULT_PORT = 'Resultado';
const OR1_PORT = 'Or1';
const OR2_PORT = 'Or2';

class OrModel extends ElementNode {
  constructor(name = "Or") {
    super({ name, type: "or" });
    this.addOutPort(RESULT_PORT, true, 1);
    this.addInPort(OR1_PORT);
    this.addInPort(OR2_PORT);
  }

  processState() {
    const op1 = this.getPort(OR1_PORT).getSignal();
    const op2 = this.getPort(OR2_PORT).getSignal();
    this.value = or(op1, op2).toString();
    this.getPort(RESULT_PORT).putSignal(this.value);
    this.setLinkColor(this.value, RESULT_PORT);
    this.stageProcessed = true;
  }

  setLinkColor(signal, port) {
    let color = 'grey';
    const value = parseInt(signal);
    if(value === 0) {
      color = 'red';
    }
    if(value > 0) {
      color = 'orange';
    }
    this.colorLinks(port, color);
  }
}

export default OrModel;
