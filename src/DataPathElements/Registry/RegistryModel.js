import ElementNode from "../../Nodes/ElementNode";
import {action, makeObservable, observable, reaction} from "mobx";

const IN_SIGNAL_PORT = 'Entrada';
const OUT_SIGNAL_PORT = 'Salida';

class RegistryModel extends ElementNode {
  constructor(name = "Registro") {
    super({name, type: 'registry'});
    this.addInPort(IN_SIGNAL_PORT);
    this.addOutPort(OUT_SIGNAL_PORT);
    reaction(
      () => this.getPort(IN_SIGNAL_PORT).bits,
      (newBits) => {
        this.getPort(OUT_SIGNAL_PORT).changeBitsNumber(newBits);
      }
    );
    this.currentValue = undefined;
    makeObservable(this, {
      currentValue: observable,
      processState: action
    })
  }

  processState() {
    if(this.currentValue) {
      this.getPort(OUT_SIGNAL_PORT).putSignal(this.currentValue);
    }
    this.currentValue = this.getPort(IN_SIGNAL_PORT).getSignal();
    if(this.currentValue) {
      this.colorLinks(IN_SIGNAL_PORT);
    }
    this.stageProcessed = true;
  }

  getConfigForm(engine) {
    return <div>
      Current value: {this.currentValue}
    </div>
  }
}

export default RegistryModel;