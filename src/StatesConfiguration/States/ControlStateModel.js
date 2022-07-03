import { DefaultNodeModel, PortModelAlignment } from "@projectstorm/react-diagrams";
import InPortModel from "../Ports/InPort/InPortModel";
import OutPortModel from "../Ports/OutPort/OutPortModel";

export class ControlStateModel extends DefaultNodeModel {
  constructor(name) {
      super({
          name,
          type: 'state'
      });
      this.addInPort('In');
      this.addOutPort('Out');
      this.signals = [];
  }

  addSignal(signal) {
    this.signals.push(signal);
  }

  saveSignals(signals) {
    this.signals = signals;
  }

  addInPort(label, after = true) {
    const p = new InPortModel({
      in: true,
      name: label,
      label: label,
      alignment: PortModelAlignment.LEFT
    });
    if (!after) {
      this.portsIn.splice(0, 0, p);
    }
    return this.addPort(p);
  }

  addOutPort(label, after = true, bits = 0) {
    const p = new OutPortModel({
      in: false,
      name: label,
      label: label,
      alignment: PortModelAlignment.RIGHT
    }, bits);
    if (!after) {
      this.portsOut.splice(0, 0, p);
    }
    return this.addPort(p);
  }

  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), {
      signals: this.signals
    });
  }

  deserialize(event) {
    super.deserialize(event);
    this.signals = event.data.signals
  }
}
