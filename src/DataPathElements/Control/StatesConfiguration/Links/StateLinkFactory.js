import { DefaultLinkFactory} from "@projectstorm/react-diagrams";
import StateLinkModel from "./StateLinkModel";
import StateLinkWidget from "./StateLinkWidget";

class StateLinkFactory extends DefaultLinkFactory {
  constructor() {
      super('stateLink')
  }

  generateModel(event) {
    return new StateLinkModel();
  }

  generateReactWidget(event) {
		return <StateLinkWidget diagramEngine={this.engine} link={event.model} factory={this} />;
	}
}

export default StateLinkFactory;
