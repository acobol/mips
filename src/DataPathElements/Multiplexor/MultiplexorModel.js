import ElementNode from "../../Nodes/ElementNode";
import {action, makeObservable, observable, observe, reaction} from "mobx";

const SIGNAL_PORT = "Señal";
const OUT_PORT = "Salida"

class MultiplexorModel extends ElementNode {
  constructor(name = "Multiplexor") {
    super({name, type: 'multiplexor'});
    this.addInPort(SIGNAL_PORT);
    this.addOutPort(OUT_PORT, 0);
    this.out = undefined
    makeObservable(this, {
      out: observable,
      processState: action,
    })
    reaction(() => this.getPort(SIGNAL_PORT).bits, (newBits, prevBits) => {
      if(newBits !== prevBits) {
        if(newBits > prevBits) {
          for (let i = this.getInPorts().length - 1; i < 2 ** newBits; i++) {
            const name = `signal${i}`;
            const newPort = this.addInPort(name);
            observe(newPort, "bits", this.updateOutBits.bind(this));
          }
        } else {
          const deletedPorts = [...this.getInPorts()].splice(newBits > 0 ? 2 ** newBits + 1 : 1);
          this.clearPorts(deletedPorts);
        }
        this.updateOutBits();
      }
    });
  }

  updateOutBits() {
    let max = 0;
    for (let i = 0; i < this.getInPorts().length - 1; i++) {
      max = Math.max(max, this.getPort(`signal${i}`).bits);
    }
    this.getPort(OUT_PORT).changeBitsNumber(max);
  }

  processState() {
    const signal = this.getPort(SIGNAL_PORT).getSignal();
    if(signal) {
      const intValue = parseInt(signal, 2);
      if(Number.isInteger(intValue)) {
        this.out = this.getPort(`signal${intValue}`).getSignal();
        this.getPort(OUT_PORT).putSignal(this.out);
      }
    }
    this.stageProcessed = true;
  }

  getConfigForm(engine) {
    return <label>
      <div>Current Out: {this.out}</div>
      <button onClick={() => {
        this.processState();
      }}>Next state</button>
    </label>
  }
}

export default MultiplexorModel;
