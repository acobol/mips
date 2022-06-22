import { DefaultLinkFactory} from "@projectstorm/react-diagrams";
import BitsLinkModel from "./BitsLinkModel";
import BitsLinkWidget from "./BitsLinkWidget";

class BitsLinkFactory extends DefaultLinkFactory {
  constructor() {
      super('bitsLink')
  }

  generateModel(event) {
    return new BitsLinkModel();
  }

  generateReactWidget(event) {
		return <BitsLinkWidget diagramEngine={this.engine} link={event.model} factory={this} />;
	}
}

export default BitsLinkFactory;
