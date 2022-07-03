import { action, makeObservable, observable } from "mobx";
import ElementNode from "../../Nodes/ElementNode";

const FIRST_BITS_PORT = 'Instrucción [31 - 26]';
const SECOND_BITS_PORT = 'Instrucción [25 - 21]';
const THIRD_BITS_PORT = 'Instrucción [20 - 16]';
const FOURTH_BITS_PORT = 'Instrucción [15 - 0]';
const ADDRESSS_PORT = 'Dirección';
const ESCR_IR_PORT = 'EscrIR';

class InstructionsRegsitryModel extends ElementNode {
  constructor(name = "Registro de instrucciones") {
    super({name, type: 'instructionsRegistry'});
    this.addOutPort(FIRST_BITS_PORT, true, 6);
    this.addOutPort(SECOND_BITS_PORT, true, 5);
    this.addOutPort(THIRD_BITS_PORT, true, 5);
    this.addOutPort(FOURTH_BITS_PORT, true, 16);
    this.addInPort(ADDRESSS_PORT);
    this.addInPort(ESCR_IR_PORT)
    this.instruction = undefined;
    makeObservable(this, {
      instruction: observable,
      processState: action
    })
  }

  processState() {
    if(this.instruction) {
      const groups = this.instruction.match(/([0-1]{6})([0-1]{5})([0-1]{5})([0-1]{16})/);
      this.getPort(FIRST_BITS_PORT).putSignal(groups[1]);
      this.getPort(SECOND_BITS_PORT).putSignal(groups[2]);
      this.getPort(THIRD_BITS_PORT).putSignal(groups[3]);
      this.getPort(FOURTH_BITS_PORT).putSignal(groups[4]);
    }
    const escrIRSignal = this.getPort(ESCR_IR_PORT).getSignal();
    if(escrIRSignal === '1') {
      this.instruction = this.getPort(ADDRESSS_PORT).getSignal();
      this.colorLinks(ADDRESSS_PORT);
    }
    this.stageProcessed = true;
  }

  getConfigForm(engine) {
    return <label>
      Instruction: {this.instruction}
      <button onClick={() => {
        this.processState();
      }}>Next state</button>
    </label>
  }
}

export default InstructionsRegsitryModel;

