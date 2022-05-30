import { action, makeObservable, observable } from "mobx";
import ElementNode from "../../Nodes/ElementNode";

class InstructionsRegsitryModel extends ElementNode {
  constructor(name = "Registro de instrucciones") {
    super({name, type: 'instructionsRegistry'});
    this.addOutPort('Instrucción [31 - 26]', true, 6);
    this.addOutPort('Instrucción [25 - 21]', true, 5);
    this.addOutPort('Instrucción [20 - 16]', true, 5);
    this.addOutPort('Instrucción [15 - 0]', true, 16);
    this.address = this.addInPort('Dirección');
    this.escrIR = this.addInPort('EscrIR')
    this.instruction = undefined;
    makeObservable(this, {
      instruction: observable,
      processState: action
    })
  }

  processState() {
    const escrIRSignal = this.escrIR.getSignal();
    if(escrIRSignal === '1') {
      this.instruction = this.address.getSignal();
    }
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

