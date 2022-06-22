import { action, makeObservable, observable } from "mobx";
import ElementNode from "../../Nodes/ElementNode";

const IN_PORT = 'Entrada';
const OUT_PORT = 'Salida';

class SignExtensorModel extends ElementNode {
  constructor(name = "Extensión de signo") {
    super({name, type: 'signExtend'});
    this.addOutPort(OUT_PORT, true, 32);
    this.addInPort(IN_PORT);
    this.result = undefined;
    makeObservable(this, {
      result: observable,
      processState: action
    })
  }

  processState() {
    const signal = this.getPort(IN_PORT).getSignal();
    if(signal) {
      this.result = signal.padStart(this.getPort(OUT_PORT).bitsNumber, signal.charAt(0));
      this.getPort(OUT_PORT).putSignal(this.result);
    }
    this.stageProcessed = true;
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
