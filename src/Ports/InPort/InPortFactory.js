import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import InPortModel from './InPortModel';

export class InPortFactory extends AbstractModelFactory {
  constructor() {
    super('inPort');
  }

  generateModel() {
    return new InPortModel('unknown', 'unknown');
  }
}

export default InPortFactory;