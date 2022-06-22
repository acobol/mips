import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import OutPortModel from './OutPortModel';

export class OutPortFactory extends AbstractModelFactory {
  constructor() {
    super('outPort');
  }

  generateModel() {
    return new OutPortModel(false, 'unknown', 'unknown');
  }
}

export default OutPortFactory;
