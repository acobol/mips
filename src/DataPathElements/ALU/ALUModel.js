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

const or = (a, b) => a | b;
const and  = (a, b) => a & b;
// eslint-disable-next-line
const not = (a) => a == '1' ? '0' : '1';
const xor = (a, b) => and(or(a,b), not(and(a,b)));
const halfAdder = (a, b) => [and(a, b), xor(a, b)];
const fullAdder = (a, b, c) => {
  const [carry1, result1] = halfAdder(a,b);
  return [or(carry1, and(result1, c)), xor(result1, c)];
};

const REG1_PORT = "Registro1";
const REG2_PORT = "Registro2";
const ALU_OPERATION_PORT = "Operación ALU";
const RESULT_PORT = "Resultado";
const ZERO_PORT = "Cero";

class ALUModel extends ElementNode {
  constructor(name = "ALU") {
    super({name, type: 'ALU'});
    this.addInPort(REG1_PORT);
    this.addInPort(REG2_PORT);
    this.addInPort(ALU_OPERATION_PORT);
    this.addOutPort(RESULT_PORT, true, 32);
    this.addOutPort(ZERO_PORT, true, 1);
    this.value = undefined;
    this.zero = undefined;
    makeObservable(this, {
      value: observable,
      zero: observable,
      processState: action
    })
  }

  processState() {
    const reg1 = this.getPort(REG1_PORT).getSignal();
    if(reg1) {
      this.colorLinks(REG1_PORT);
      const a = Array.from(reg1);
      const reg2 = this.getPort(REG2_PORT).getSignal();
      if(reg2) {
        this.colorLinks(REG2_PORT);
        const b = Array.from(reg2);
        const operationSignal = this.getPort(ALU_OPERATION_PORT).getSignal();
        this.colorLinks(ALU_OPERATION_PORT, 'orange');
        const operation = OPERATIONS[operationSignal];
        const result = [];
        switch (operation) {
          case 'and': {
            for(let i = a.length - 1; i>= 0; i--) {
              result[i] = and(a[i], b[i]);
            }
            break;
          }
          case 'or': {
            for(let i = a.length - 1; i>= 0; i--) {
              result[i] = or(a[i], b[i]);
            }
            break;
          }
          case 'add': {
            let carry = "0";
            for(let i = a.length - 1; i>= 0; i--) {
              const [carryI, resultI] = fullAdder(a[i], b[i], carry);
              result[i] = resultI;
              carry = carryI;
            }
            break;
          }
          case 'sub': {
            let carry = "1";
            for(let i = a.length - 1; i>= 0; i--) {
              const [carryI, resultI] = fullAdder(a[i], not(b[i]), carry);
              result[i] = resultI;
              carry = carryI;
            }
            break;
          }
          case 'slt': {
            let carry = "1";
            let lastResult;
            for(let i = a.length - 1; i>= 0; i--) {
              const [carryI, resultI] = fullAdder(a[i], not(b[i]), carry);
              result[i] = "0";
              carry = carryI;
              lastResult = resultI;
            }
            result[0] = xor(lastResult, carry);
            break;
          }
          case 'nor': {
            for(let i = a.length - 1; i>= 0; i--) {
              result[i] = not(or(a[i], b[i]));
            }
            break;
          }
          default:
            break;
        }
        this.value = result.join("");
        this.zero = not(result.reduce((acc, a) => {
          return or(acc, a);
        }, "0"));
        this.getPort(RESULT_PORT).putSignal(this.value);
        this.getPort(ZERO_PORT).putSignal(this.zero);
        this.colorLinks(ZERO_PORT, this.zero === '0' ? 'grey' : 'orange');
      }
    }
    this.stageProcessed = true;
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
