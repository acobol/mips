import { action, makeObservable, observable } from "mobx";
import ElementNode from "../../Nodes/ElementNode";

const STARTING_ADDRESS = "00000000010000000000000000000000";

const ADDRESS_PORT = "Dirección";
const NEW_ADDRESS_PORT = "Contador";
const ESCR_PORT = "Escr";

class PCModel extends ElementNode {
  constructor(name = "PC") {
    super({name, type: 'pc'});
    this.addOutPort(ADDRESS_PORT, true, 32);
    this.addInPort(NEW_ADDRESS_PORT);
    this.addInPort(ESCR_PORT);
    this.currentAddress = STARTING_ADDRESS;
    makeObservable(this, {
      currentAddress: observable,
      processState: action
    })
  }

  processState() {
    this.getPort(ADDRESS_PORT).putSignal(this.currentAddress);
    const escr = this.getPort(ESCR_PORT).getSignal();
    if(escr === "1") {
      this.currentAddress = this.getPort(NEW_ADDRESS_PORT).getSignal();
      this.colorLinks(NEW_ADDRESS_PORT);
    }
    this.stageProcessed = true;
  }

  getConfigForm(engine) {
    return <label>
      <div>Current Address: {this.currentAddress}</div>
      <button onClick={() => {
        this.processState();
      }}>Next state</button>
    </label>
  }
}

export default PCModel;
