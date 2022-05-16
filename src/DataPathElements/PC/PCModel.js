import { action, makeObservable, observable } from "mobx";
import ElementNode from "../../Nodes/ElementNode";

class PCModel extends ElementNode {
  constructor(name = "PC") {
    super({name, type: 'pc'});
    this.addressPort = this.addOutPort('Dirección', true, 32);
    this.contador = this.addInPort('Contador');
    this.escr = this.addInPort('Escr');
    this.currentAddress = '0'.repeat(32);
    makeObservable(this, {
      currentAddress: observable,
      processState: action
    })
  }

  processState() {
    this.addressPort.putSignal(this.currentAddress);
    const escr = this.escr.getSignal();
    if(escr === "1") {
      this.currentAddress = this.contador.getSignal();
    }
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

