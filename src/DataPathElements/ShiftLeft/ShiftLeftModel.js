import ElementNode from "../../Nodes/ElementNode";
import {reaction, makeObservable, observable, action} from "mobx";

//TODO extraer a función auxiliar
const twosComplement = (value, bitsNumber) => {
  const bitsString = value.toString(2);
  const bits = Array.from(bitsString);
  if(bits[0] !== '-') {
    return bitsString.padStart(bitsNumber, '0');
  } else {
    bits.shift();
    let flip = false;
    for(let i = bits.length - 1; i >= 0; i--) {
      if(flip) {
        bits[i] = bits[i] === '1' ? '0' : '1';
      } else {
        if(bits[i] === '1') {
          flip = true
        }
      }
    }
    return ('1' + bits.join("")).padStart(bitsNumber, '1');
  }
}

const IN_PORT = 'Entrada';
const OUT_PORT = 'Salida';

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
    this.addOutPort(OUT_PORT);
    this.addInPort(IN_PORT);
    reaction(() => this.getPort(IN_PORT).bits < 32 ? this.getPort(IN_PORT).bits + this.shift : this.getPort(IN_PORT).bits, (newBits) => {
      this.getPort(OUT_PORT).changeBitsNumber(newBits)
    });
  }

  processState() {
    const signal = this.getPort(IN_PORT).getSignal();
    if(signal) {
      const value = parseInt(signal, 2) << this.shift;
      this.result = twosComplement(value, this.getPort(OUT_PORT).bitsNumber);
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

export default ShiftLeftModel;