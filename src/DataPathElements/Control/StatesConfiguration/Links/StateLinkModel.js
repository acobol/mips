import { RightAngleLinkModel } from "@projectstorm/react-diagrams";
import StateLinkWidget from "./StateLinkWidget";

class StateLink extends RightAngleLinkModel {
  constructor(options, bits) {
    super({
      ...options,
      type: 'stateLink'
    });
  }

  generateReactWidget(event) {
		return <StateLinkWidget diagramEngine={this.engine} link={event.model} factory={this} />;
	}
}

export default StateLink;
