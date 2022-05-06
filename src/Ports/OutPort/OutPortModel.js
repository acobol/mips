import {DefaultPortModel} from '@projectstorm/react-diagrams';
import BitsLinkModel from '../../Links/BitsLinkModel';

export class OutPortModel extends DefaultPortModel {
  constructor(options, bitsNumber = 32) {
    super({
      ...options,
      type: 'outPort'
    });
    this.bitsNumber = bitsNumber;
  }

	createLinkModel(factory) {
    return new BitsLinkModel({}, this.bitsNumber);
	}
}

export default OutPortModel;
