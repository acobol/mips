import { RightAngleLinkModel } from "@projectstorm/react-diagrams";
import BitsLinkWidget from "./BitsLinkWidget";
import {makeObservable, observable, reaction, action} from "mobx";

class BitsLink extends RightAngleLinkModel {
  constructor(options, bits) {
    super({
      ...options,
      type: 'bitsLink'
    });
    this.bits = bits;
    this.selectedBits = {
      from: 0,
      to: this.bits ? this.bits - 1 : 0
    }
    makeObservable(this, {
      bits: observable,
      selectedBits: observable,
      changeSelectedBitsFrom: action,
      changeSelectedBitsTo: action
    })
  }

  generateReactWidget(event) {
		return <BitsLinkWidget diagramEngine={this.engine} link={event.model} factory={this} />;
	}

  changeBits(bits) {
    this.bits = bits;
    this.selectedBits = {
      from: this.selectedBits.from < bits - 1 ? this.selectedBits.from : 0,
      to: this.selectedBits.to < bits - 1 ? this.selectedBits.to : this.bits - 1
    }
  }

  changeSelectedBitsFrom(bits) {
    const bitsNumber = parseInt(bits);
    if(bitsNumber <= this.selectedBits.to) {
      this.selectedBits.from = bitsNumber;
    }
  }

  changeSelectedBitsTo(bits) {
    const bitsNumber = parseInt(bits);
    if(bitsNumber >= this.selectedBits.from) {
      this.selectedBits.to = bitsNumber;
    }
  }

  setSourcePort(port) {
    super.setSourcePort(port);
    reaction(() => this.sourcePort.bitsNumber, (bits) => {
      this.changeBits(bits);
    });
  }

  putSignal(signal) {
    this.signal = signal;
  }

  getSignal() {
    if(this.signal) {
      return this.signal;
    } else {
      const signal = this.getSourcePort().getSignal();
      if(signal) {
        const reversedBits = Array.from(signal).reverse();
        this.signal = reversedBits.slice(this.selectedBits.from, this.selectedBits.to + 1).reverse().join("");
        return this.signal;
      }
      return undefined;
    }
  }

  clearSignal() {
    this.signal = undefined;
  }

  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), {
      bits: this.bits,
      selectedBits: this.selectedBits
    });
  }

  deserialize(event) {
    super.deserialize(event);
    this.bits = event.data.bits;
    this.selectedBits.from = event.data.selectedBits.from;
    this.selectedBits.to = event.data.selectedBits.to;
  }
}

export default BitsLink;
