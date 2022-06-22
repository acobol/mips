import { action, makeObservable, observable } from "mobx";
import ElementNode from "../../Nodes/ElementNode";

const OPERATIONS = {
  '00': '0010',
  '01': '0110'
};

const FUNCT_OPERATIONS = {
  '100000': '0010',
  '100010': '0110',
  '100100': '0000',
  '100101': '0001',
  '100111': '1100',
  '101010': '0111',
}

const OPERATION_PORT = 'Operación ALU';
const INSTRUCTION_PORT = 'Instrucción';
const ALU_OP_PORT = 'ALUOp';

class ALUControlModel extends ElementNode {
  constructor(name = "ALUControl") {
    super({name, type: 'ALUControl', color: 'orange'});
    this.addOutPort(OPERATION_PORT, true, 4);
    this.addInPort(INSTRUCTION_PORT);
    this.addInPort(ALU_OP_PORT);
    this.operation = undefined;
    makeObservable(this, {
      operation: observable,
      processState: action
    })
  }

  processState() {
    const aluSignal = this.getPort(ALU_OP_PORT).getSignal();
    if(aluSignal === '10') {
      const instruction =  this.getPort(INSTRUCTION_PORT).getSignal();
      this.operation = FUNCT_OPERATIONS[instruction];
    } else {
      this.operation = OPERATIONS[aluSignal]
    }
    this.getPort(OPERATION_PORT).putSignal(this.operation);
    this.stageProcessed = true;
  }

  getConfigForm(engine) {
    return <label>
      Operation: {this.operation}
      <button onClick={() => {
        this.processState();
      }}>Next state</button>
    </label>
  }
}

export default ALUControlModel;
