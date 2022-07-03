import { DefaultLinkFactory } from "@projectstorm/react-diagrams";
import BitsLinkWidget from "../../Links/BitsLinkWidget";
import StateLinkModel from "./StateLinkModel";

class StateLinkFactory extends DefaultLinkFactory {
  constructor() {
      super('stateLink')
  }

  generateModel(event) {
    return new StateLinkModel();
  }

  generateReactWidget(event) {
		return <BitsLinkWidget diagramEngine={this.engine} link={event.model} factory={this} />;
	}
}

export default StateLinkFactory;
