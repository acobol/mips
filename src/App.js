import './App.css';
import Stencil from './stencil';
import Canvas from './canvas';
import createEngine, {DiagramModel, RightAngleLinkFactory, RightAngleLinkModel, DefaultPortModel} from '@projectstorm/react-diagrams';
import MultiplexorFactory from './Models/Multiplexor/MultiplexorFactory';
import ALUFactory from './Models/ALU/ALUFactory';
import RegistryBankFactory from './Models/RegistryBank/RegistryBankFactory';
import MemoryBankFactory from './Models/MemoryBank/MemoryBankFactory';
import SignExtensorFactory from './Models/SignExtend/SignExtendFactory';
import InstructionsMemoryFactory from './Models/InstructionsMemory/InstructionsMemoryFactory';
import PCFactory from './Models/PC/PCFactory';
import AddFactory from './Models/Add/AddFactory';
import ConstFactory from './Models/Const/ConstFactory';
import ShiftLeftFactory from './Models/ShiftLeft/ShiftLeftFactory';
import ALUControlFactory from './Models/ALUControl/ALUControlFactory';
import AndFactory from './Models/And/AndFactory';
import ControlFactory from './Models/Control/ControlFactory';
import ConcatenatorFactory from './Models/Concatenator/ConcatenatorFactory';
import datapath from './datapath.json';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';

const factories = [
  MultiplexorFactory,
  ALUFactory,
  RegistryBankFactory,
  MemoryBankFactory,
  SignExtensorFactory,
  InstructionsMemoryFactory,
  PCFactory,
  AddFactory,
  ConstFactory,
  ShiftLeftFactory,
  ALUControlFactory,
  AndFactory,
  ControlFactory,
  ConcatenatorFactory
]

export class RightAnglePortModel extends DefaultPortModel {
  constructor(isIn, name, label) {
    super(isIn, name, label);
    this.options.type = 'rightAnglePort';
  }

	createLinkModel(factory) {
		return new RightAngleLinkModel();
	}
}

export class RightAnglePortFactory extends AbstractModelFactory {
  constructor() {
    super('rightAnglePort');
  }

  generateModel() {
    return new RightAnglePortModel(false, 'unknown', 'unknown');
  }
}


function App() {
  const engine = createEngine();
  for (const factory of factories) {
    engine.getNodeFactories().registerFactory(new factory());
  }
  engine.getLinkFactories().registerFactory(new RightAngleLinkFactory());
  engine.getPortFactories().registerFactory(new RightAnglePortFactory());
  const diagram = new DiagramModel();
  diagram.deserializeModel(datapath, engine);
  engine.setModel(diagram);
  return (
    <div className="App">
      <div id='main'>
        <Stencil></Stencil>
        <Canvas engine={engine}>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
