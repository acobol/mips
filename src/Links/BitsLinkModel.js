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
    if(bitsNumber >= this.selectedBits.to) {
      this.selectedBits.to = bitsNumber;
    }
  }

  setSourcePort(port) {
    super.setSourcePort(port);
    reaction(() => this.sourcePort.bitsNumber, (bits) => {
      this.changeBits(bits);
    });
  }

  getSignal() {
    const signal = this.getSourcePort().getSignal();
    if(signal) {
      return signal.slice(this.selectedBits.from, this.selectedBits.to + 1)
    }
    return undefined;
  }
}

export default BitsLink;
