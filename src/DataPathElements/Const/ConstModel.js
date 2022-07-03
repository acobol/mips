import ElementNode from "../../Nodes/ElementNode";

const VALUE_PORT = 'Valor'

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

class ConstModel extends ElementNode {
  constructor(name = "4") {
    super({name, type: 'const'});
    this.addOutPort(VALUE_PORT, true, 32);
    this.value = 4;
  }

  processState() {
    this.getPort(VALUE_PORT).putSignal(twosComplement(this.value, 32));
    this.stageProcessed = true;
  }

  getConfigForm(engine) {
    return <label>
      Value: 
      <input type={"text"} defaultValue={this.value} onChange={({target: {value}}) => {
        this.value = parseInt(value);
        this.changeName(value);
        engine.repaintCanvas();
      }}/>
      <button onClick={() => {
        this.processState();
      }}>Next state</button>
    </label>
  }
}

export default ConstModel;

