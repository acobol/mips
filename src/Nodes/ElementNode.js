import { DefaultNodeModel, PortModelAlignment } from "@projectstorm/react-diagrams";
import InPortModel from "../Ports/InPort/InPortModel";
import OutPortModel from "../Ports/OutPort/OutPortModel";


class ElementNode extends DefaultNodeModel {
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
  addOutPort(label, after = true) {
    const p = new OutPortModel({
      in: false,
      name: label,
      label: label,
      alignment: PortModelAlignment.RIGHT
    });
    if (!after) {
      this.portsOut.splice(0, 0, p);
    }
    return this.addPort(p);
  }
}

export default ElementNode;
