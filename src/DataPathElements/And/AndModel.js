import ElementNode from "../../Nodes/ElementNode";

const and  = (a, b) => a & b;

const RESULT_PORT = 'Resultado';
const AND1_PORT = 'And1';
const AND2_PORT = 'And2';

class AndModel extends ElementNode {
  constructor(name = "and") {
    super({ name, type: "and" });
    this.addOutPort(RESULT_PORT, true, 1);
    this.addInPort(AND1_PORT);
    this.addInPort(AND2_PORT);
  }

  processState() {
    const op1 = this.getPort(AND1_PORT).getSignal();
    const op2 = this.getPort(AND2_PORT).getSignal();
    this.value = and(op1, op2).toString();
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

export default AndModel;
