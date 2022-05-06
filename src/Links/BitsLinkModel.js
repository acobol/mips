import { DefaultLabelModel, DefaultLinkWidget, RightAngleLinkModel } from "@projectstorm/react-diagrams";
import BitsLinkWidget from "./BitsLinkWidget";

class BitsLink extends RightAngleLinkModel {
  constructor(options, bits) {
    super({
      ...options,
      type: 'bitsLink'
    });
    this.bits = bits;
  }

  getSelectedBitsText() {
    return `[${this.selectedBits.to}-${this.selectedBits.from}]`
  }

  generateReactWidget(event) {
		return <BitsLinkWidget diagramEngine={this.engine} link={event.model} factory={this} />;
	}

  resetLabels() {
    if(!this.getLabels().length) {
      this.addLabel(`${this.bits}`);
    }
  }

  setTargetPort(port) {
    super.setTargetPort(port);
    this.addLabel(new DefaultLabelModel({ label: 'Label' }));
  }
}

export default BitsLink;
