import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import RightAnglePortModel from "../../Ports/RigthAnglePort/RightAnglePortModel";

class MultiplexorModel extends DefaultNodeModel {
  constructor(name = "multiplexor", signalBits = 1) {
    super({name, type: 'multiplexor'});
    this.addPort(new RightAnglePortModel(false, 'out', 'out'));
    this.addInPort('signal', 'signal');
    for(let i = 0; i < 2 ** signalBits; i++) {
      const portName = `in${i}`;
      this.addInPort(portName, portName);
    }
  }
}

export default MultiplexorModel;
