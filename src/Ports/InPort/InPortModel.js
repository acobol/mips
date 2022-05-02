import {DefaultPortModel} from '@projectstorm/react-diagrams';

export class InPortModel extends DefaultPortModel {
  constructor(options) {
    super({
      ...options,
      type: 'inPort'
    });
  }

	createLinkModel(factory) {
    return false;
	}
}

export default InPortModel;