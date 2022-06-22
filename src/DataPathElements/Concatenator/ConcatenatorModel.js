import ElementNode from "../../Nodes/ElementNode";
import {action, makeObservable, observable, reaction} from "mobx";

const RESULT_PORT = 'Result';
const A_PORT = 'Dato1';
const B_PORT = 'Dato2';

class ConcatenatorModel extends ElementNode {
  constructor(name = "Concatenador") {
    super({name, type: 'concatenator'});
    this.addOutPort(RESULT_PORT);
    this.addInPort(A_PORT);
    this.addInPort(B_PORT);
    reaction(
      () => this.getPort(A_PORT).bits + this.getPort(B_PORT).bits,
      (newBits) => {
        this.getPort(RESULT_PORT).changeBitsNumber(newBits);
      }
    );
    this.result = undefined;
    makeObservable(this, {
      result: observable,
      processState: action
    })
  }

  processState() {
    const aValue = this.getPort(A_PORT).getSignal();
    const bValue = this.getPort(B_PORT).getSignal();
    if(aValue && bValue) {
      this.result = aValue + bValue;
      this.getPort(RESULT_PORT).putSignal(this.result);
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

export default ConcatenatorModel;
