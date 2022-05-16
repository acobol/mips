import {DefaultPortModel} from '@projectstorm/react-diagrams';
import {makeObservable, observable, action, reaction} from "mobx";

export class InPortModel extends DefaultPortModel {
  constructor(options) {
    super({
      ...options,
      type: 'inPort',
      maximumLinks: 1
    });
    this.bits = 0;
    makeObservable(this, {
      bits: observable,
      addLink: action
    });
  }

	createLinkModel(factory) {
    return false;
	}

  addLink(link) {
    super.addLink(link);
    this.bits = link.selectedBits.to + 1 - link.selectedBits.from;
    reaction(() => link.selectedBits.to + 1 - link.selectedBits.from, (bits) => {
      this.bits = bits;
    });
  }

  removeLink(link) {
    super.removeLink(link);
    this.bits = 0;
  }

  getSignal() {
    return Object.keys(this.getLinks()).map((link) => {
      return this.links[link].getSignal();
    })[0];
  }
}

export default InPortModel;