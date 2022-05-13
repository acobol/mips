import ElementNode from "../../Nodes/ElementNode";
import {reaction} from "mobx";

class MultiplexorModel extends ElementNode {
  constructor(name = "multiplexor") {
    super({name, type: 'multiplexor'});
    const signalPort = this.addInPort('signal');
    const outPort = this.addOutPort("out", 0);
    this.signalPorts = [];
    reaction(() => signalPort.bits, (newBits, prevBits) => {
      if(newBits !== prevBits) {
        if(newBits > prevBits) {
          for (let i = this.signalPorts.length; i < 2 ** newBits; i++) {
            const name = `signal${i}`;
            const newPort = this.addInPort(name);
            this.signalPorts.push(newPort);
          }
        } else {
          const deletedPorts = this.signalPorts.splice(newBits > 0 ? 2 ** newBits : 0);
          this.clearPorts(deletedPorts);
        }
        let max = 0;
        for (let i = 0; i < this.signalPorts; i++) {
          max = Math.max(max, this.signalPorts[i].bits);
        }
        outPort.changeBitsNumber(max);
      }
    });
  }
}

export default MultiplexorModel;
