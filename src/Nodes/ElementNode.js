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
    this.stageProcessed = false;
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

  getConfigForm() {
    return null;
  }
  
  startStage() {
    this.stageProcessed = false;
    this.getOutPorts().forEach((port) => {
      port.clearSignal();
    })
  }

  colorLinks(port, color = 'blue') {
    const links = this.getPort(port).getLinks();
    for (const linkId in links) {
      const link = links[linkId];
      link.getOptions().color = color;
    }
  }
}

export default ElementNode;
