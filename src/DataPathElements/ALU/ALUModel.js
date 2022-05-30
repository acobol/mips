import { action, makeObservable, observable } from "mobx";
import ElementNode from "../../Nodes/ElementNode";

const OPERATIONS = {
  '0000': 'and',
  '0001': 'or',
  '0010': 'add',
  '0110': 'sub',
  '0111': 'slt',
  '1100': 'nor'
};

class ALUModel extends ElementNode {
  constructor(name = "ALU") {
    super({name, type: 'ALU'});
    this.reg1 = this.addInPort('Registro1');
    this.reg2 = this.addInPort('Registro2');
    this.operation = this.addInPort('ALU Operation');
    this.result = this.addOutPort('Resultado', true, 32);
    this.zeroOut = this.addOutPort('Cero', true, 1);
    this.value = undefined;
    this.zero = undefined;
    makeObservable(this, {
      value: observable,
      zero: observable,
      processState: action
    })
  }

  processState() {
    const reg1 = this.reg1.getSignal();
    const value1 = parseInt(reg1, 2);
    const reg2 = this.reg2.getSignal();
    const value2 = parseInt(reg2, 2);
    const operationSignal = this.operation.getSignal();
    const operation = OPERATIONS[operationSignal];
    this.zero = value1 - value2 === 0 ? '1' : '0';
    this.zeroOut.putSignal(this.zero);
    switch (operation) {
      case 'and': {
        const resultValue = value1 & value2;
        this.value = resultValue.toString(2).padStart(32, '0');
        break;
      }
      case 'or': {
        const resultValue = value1 | value2;
        this.value = resultValue.toString(2).padStart(32, '0');
        break;
      }
      case 'add': {
        const resultValue = value1 + value2;
        this.value = resultValue.toString(2).padStart(32, '0');
        break;
      }
      case 'sub': {
        const resultValue = value1 - value2;
        const resultSignal = (resultValue >>> 0).toString(2);
        this.value = resultSignal.padStart(32, '0');
        break;
      }
      case 'slt': {
        const resultValue = value1 < value2;
        const resultSignal = resultValue ? '1' : '0';
        this.value = resultSignal.padStart(32, 0);
        break;
      }
      case 'nor': {
        const resultValue = ~(value1 | value2);
        this.value = (resultValue >>> 0).toString(2).padStart(32, '0');
        break;
      }
      default:
        break;
    }
    this.result.putSignal(this.value);
  }

  getConfigForm(engine) {
    return <label>
      Value: {this.value} | Zero: {this.zero}
      <button onClick={() => {
        this.processState();
      }}>Next state</button>
    </label>
  }
}

export default ALUModel;
