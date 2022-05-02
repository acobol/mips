import ElementNode from "../../Nodes/ElementNode";

class MultiplexorModel extends ElementNode {
  constructor(name = "multiplexor", signalBits = 1) {
    super({name, type: 'multiplexor'});
    this.addOutPort('out');
    this.addInPort('signal');
    for(let i = 0; i < 2 ** signalBits; i++) {
      const portName = `in${i}`;
      this.addInPort(portName, portName);
    }
  }
}

export default MultiplexorModel;
