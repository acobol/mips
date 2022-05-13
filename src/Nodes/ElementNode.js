import {
  DefaultNodeModel,
  PortModelAlignment
} from "@projectstorm/react-diagrams";
import InPortModel from "../Ports/InPort/InPortModel";
import OutPortModel from "../Ports/OutPort/OutPortModel";
import { makeObservable, observable } from "mobx";

class ElementNode extends DefaultNodeModel {
  constructor(options) {
    super(options);
    makeObservable(this, {
      portsOut: observable
    });
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
  changeName(name) {
    this.options.name = name;
  }
  clearPorts(ports) {
    ports.forEach((port) => {
      this.removePort(port);
    })
  }
}

export default ElementNode;
