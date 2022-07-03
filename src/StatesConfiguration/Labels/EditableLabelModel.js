import { LabelModel } from '@projectstorm/react-diagrams';

export class EditableLabelModel extends LabelModel {

	constructor(options) {
		super({
			...options,
			type: 'editable-label'
		});
		this.instructions = options?.instructions || [];
	}

	serialize() {
		return {
			...super.serialize(),
			instructions: this.instructions
		};
	}

	deserialize(event) {
		super.deserialize(event);
		this.instructions = event.data.instructions;
	}
}