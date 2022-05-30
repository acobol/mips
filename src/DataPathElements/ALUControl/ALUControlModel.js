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

class ALUControlModel extends ElementNode {
  constructor(name = "ALUControl") {
    super({name, type: 'ALUControl', color: 'orange'});
    this.operationPort = this.addOutPort('Operación ALU', true, 4);
    this.instruction = this.addInPort('Instrucción');
    this.selALUB = this.addInPort('SelALUB');
    this.operation = undefined;
    makeObservable(this, {
      operation: observable,
      processState: action
    })
  }

  processState() {
    const aluSignal = this.selALUB.getSignal();
    const instruction =  this.instruction.getSignal();
    if(aluSignal === '10') {
      this.operation = FUNCT_OPERATIONS[instruction];
    } else {
      this.operation = OPERATIONS[aluSignal]
    }
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
