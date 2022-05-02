import {RightAngleLinkModel, DefaultPortModel} from '@projectstorm/react-diagrams';

export class OutPortModel extends DefaultPortModel {
  constructor(options) {
    super({
      ...options,
      type: 'outPort'
    })
  }

	createLinkModel(factory) {
		return new RightAngleLinkModel();
	}
}

export default OutPortModel;
