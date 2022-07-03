import { RightAngleLinkModel } from "@projectstorm/react-diagrams";
import BitsLinkWidget from "../../Links/BitsLinkWidget";

class StateLink extends RightAngleLinkModel {
  constructor(options, bits) {
    super({
      ...options,
      type: 'stateLink'
    });
  }

  generateReactWidget(event) {
		return <BitsLinkWidget diagramEngine={this.engine} link={event.model} factory={this} />;
	}
}

export default StateLink;
