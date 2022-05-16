import ElementNode from "../../Nodes/ElementNode";
import {action, makeObservable, observable, reaction} from "mobx";

class ConcatenatorModel extends ElementNode {
  constructor(name = "Concatenador") {
    super({name, type: 'concatenator'});
    this.resultPort = this.addOutPort('Salida');
    this.a = this.addInPort('Dato1');
    this.b = this.addInPort('Dato2');
    reaction(
      () => this.a.bits + this.b.bits,
      (newBits) => {
        this.resultPort.changeBitsNumber(newBits);
      }
    );
    this.result = undefined;
    makeObservable(this, {
      result: observable,
      processState: action
    })
  }

  processState() {
    const aValue = this.a.getSignal();
    const bValue = this.b.getSignal();
    if(aValue && bValue) {
      this.result = aValue + bValue;
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

export default ConcatenatorModel;
