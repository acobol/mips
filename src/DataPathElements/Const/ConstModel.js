import ElementNode from "../../Nodes/ElementNode";
class ConstModel extends ElementNode {
  constructor(name = "000000") {
    super({name, type: 'const'});
    this.addOutPort('Valor', true, 32);
    this.value = "000000";
  }

  processState() {
    this.getOutPorts().forEach((port) => {
      port.putSignal(this.value);
    });
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

