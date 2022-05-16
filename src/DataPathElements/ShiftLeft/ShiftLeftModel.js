import ElementNode from "../../Nodes/ElementNode";
import {reaction, makeObservable, observable, action} from "mobx";

class ShiftLeftModel extends ElementNode {
  constructor(name = "Desp. Izquierda") {
    super({name, type: 'shiftLeft'});
    this.shift = 2;
    this.result = undefined;
    makeObservable(this, {
      shift: observable,
      processState: action,
      result: observable
    })
    this.outPort = this.addOutPort('Salida');
    this.signalPort = this.addInPort('Entrada');
    reaction(() => this.signalPort.bits + this.shift, (newBits) => {
      this.outPort.changeBitsNumber(newBits)
    });
  }

  processState() {
    const signal = this.signalPort.getSignal();
    if(signal) {
      const value = parseInt(signal, 2) << this.shift;
      this.result = value.toString(2).padStart(this.outPort.bitsNumber, "0");
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

export default ShiftLeftModel;