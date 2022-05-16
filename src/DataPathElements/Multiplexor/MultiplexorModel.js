import ElementNode from "../../Nodes/ElementNode";
import {action, makeObservable, observable, reaction} from "mobx";

class MultiplexorModel extends ElementNode {
  constructor(name = "Multiplexor") {
    super({name, type: 'multiplexor'});
    this.signalPort = this.addInPort('Señal');
    this.outPort = this.addOutPort("Salida", 0);
    this.signalPorts = [];
    this.out = undefined
    makeObservable(this, {
      out: observable,
      processState: action
    })
    reaction(() => this.signalPort.bits, (newBits, prevBits) => {
      if(newBits !== prevBits) {
        if(newBits > prevBits) {
          for (let i = this.signalPorts.length; i < 2 ** newBits; i++) {
            const name = `signal${i}`;
            const newPort = this.addInPort(name);
            this.signalPorts.push(newPort);
          }
        } else {
          const deletedPorts = this.signalPorts.splice(newBits > 0 ? 2 ** newBits : 0);
          this.clearPorts(deletedPorts);
        }
        let max = 0;
        for (let i = 0; i < this.signalPorts; i++) {
          max = Math.max(max, this.signalPorts[i].bits);
        }
        this.outPort.changeBitsNumber(max);
      }
    });
  }

  processState() {
    const signal = this.signalPort.getSignal();
    if(signal) {
      const intValue = parseInt(signal, 2);
      this.out = this.signalPorts[intValue].getSignal();
    }
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
