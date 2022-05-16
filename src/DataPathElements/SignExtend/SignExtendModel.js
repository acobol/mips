import { action, makeObservable, observable } from "mobx";
import ElementNode from "../../Nodes/ElementNode";

class SignExtensorModel extends ElementNode {
  constructor(name = "Extensión de signo") {
    super({name, type: 'signExtend'});
    this.outPort = this.addOutPort('Salida', true, 32);
    this.inPort = this.addInPort('Entrada');
    this.result = undefined;
    makeObservable(this, {
      result: observable,
      processState: action
    })
  }

  processState() {
    const signal = this.inPort.getSignal();
    if(signal) {
      this.result = signal.padStart(this.outPort.bitsNumber, signal.charAt(0));
    }
  }

  getConfigForm(engine) {
    return <label>
      <div>Current result: {this.result}</div>
      <button onClick={() => {
        this.processState();
      }}>Next state</button>
    </label>
  }
}

export default SignExtensorModel;
