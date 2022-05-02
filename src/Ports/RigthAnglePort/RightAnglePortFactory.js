import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import RightAnglePortModel from './RightAnglePortModel';

export class RightAnglePortFactory extends AbstractModelFactory {
  constructor() {
    super('rightAnglePort');
  }

  generateModel() {
    return new RightAnglePortModel(false, 'unknown', 'unknown');
  }
}

export default RightAnglePortFactory;
