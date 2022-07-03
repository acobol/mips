import { DefaultPortModel } from "@projectstorm/react-diagrams";
import BitsLinkModel from "../../Links/BitsLinkModel";
import { makeObservable, action, observable } from "mobx";

export class OutPortModel extends DefaultPortModel {
  constructor(options, bitsNumber = 0) {
    super({
      ...options,
      type: "outPort"
    });
    this.bitsNumber = bitsNumber;
    makeObservable(this, {
      bitsNumber: observable,
      changeBitsNumber: action
    });
  }

  createLinkModel(factory) {
    return new BitsLinkModel({}, this.bitsNumber);
  }

  changeBitsNumber(bitsNumber) {
    this.bitsNumber = bitsNumber;
    const links = this.getLinks();
    for (const id in links) {
      const link = links[id];
      link.changeBits(this.bitsNumber);
    }
  }

  changeName(name) {
    this.options.name = name;
    this.options.label = name;
  }

  canLinkToPort(port) {
    return (
      port.getMaximumLinks() >= Object.keys(port.links).length + 1 &&
      super.canLinkToPort(port)
    );
  }

  putSignal(signal) {
    this.signal = signal;
  }

  getSignal() {
    if (!this.signal && !this.parent.stageProcessed) {
      this.parent.processState(true);
    }
    return this.signal;
  }

  clearSignal() {
    this.signal = undefined;
    const links = this.getLinks();
    for (const id in links) {
      const link = links[id];
      link.clearSignal();
    }
  }

  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), {
      bitsNumber: this.bitsNumber
    });
  }

  deserialize(event) {
    super.deserialize(event);
    this.changeBitsNumber(event.data.bitsNumber);
  }
}

export default OutPortModel;
