import {DefaultPortModel} from '@projectstorm/react-diagrams';
import { EditableLabelModel } from '../../Labels/EditableLabelModel';

export class InPortModel extends DefaultPortModel {
  constructor(options) {
    super({
      ...options,
      type: 'inPort',
    });
  }

	createLinkModel(factory) {
    return false;
	}

  addLink(link) {
    super.addLink(link);
    if(!link.getLabels().length) {
      link.addLabel(new EditableLabelModel());
    }
  }
}

export default InPortModel;