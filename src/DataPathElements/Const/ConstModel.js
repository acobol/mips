import ElementNode from "../../Nodes/ElementNode";

const VALUE_PORT = 'Valor'

class ConstModel extends ElementNode {
  constructor(name = "00000000000000000000000000000100") {
    super({name, type: 'const'});
    this.addOutPort(VALUE_PORT, true, 32);
    this.value = "00000000000000000000000000000100";
  }

  processState() {
    this.getPort(VALUE_PORT).putSignal(this.value);
    this.stageProcessed = true;
  }

  getConfigForm(engine) {
    return <label>
      Value: 
      <input type={"text"} defaultValue={this.value} onChange={({target: {value}}) => {
        //this.value = parseInt(value);
        this.value = value;
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

