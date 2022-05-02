import {RightAngleLinkModel, DefaultPortModel} from '@projectstorm/react-diagrams';

export class RightAnglePortModel extends DefaultPortModel {
  constructor(isIn, name, label) {
    super(isIn, name, label);
    this.options.type = 'rightAnglePort';
  }

	createLinkModel(factory) {
		return new RightAngleLinkModel({color: 'orange', selectedColor: 'orange'});
	}
}

export default RightAnglePortModel;
