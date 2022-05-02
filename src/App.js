import './App.css';
import Stencil from './stencil';
import Canvas from './canvas';
import createEngine, {DiagramModel, RightAngleLinkFactory, RightAngleLinkModel, DefaultPortModel} from '@projectstorm/react-diagrams';
import MultiplexorFactory from './DataPathElements/Multiplexor/MultiplexorFactory';
import ALUFactory from './DataPathElements/ALU/ALUFactory';
import RegistryBankFactory from './DataPathElements/RegistryBank/RegistryBankFactory';
import MemoryBankFactory from './DataPathElements/MemoryBank/MemoryBankFactory';
import SignExtensorFactory from './DataPathElements/SignExtend/SignExtendFactory';
import InstructionsMemoryFactory from './DataPathElements/InstructionsMemory/InstructionsMemoryFactory';
import PCFactory from './DataPathElements/PC/PCFactory';
import AddFactory from './DataPathElements/Add/AddFactory';
import ConstFactory from './DataPathElements/Const/ConstFactory';
import ShiftLeftFactory from './DataPathElements/ShiftLeft/ShiftLeftFactory';
import ALUControlFactory from './DataPathElements/ALUControl/ALUControlFactory';
import AndFactory from './DataPathElements/And/AndFactory';
import ControlFactory from './DataPathElements/Control/ControlFactory';
import ConcatenatorFactory from './DataPathElements/Concatenator/ConcatenatorFactory';
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
		return new RightAngleLinkModel({color: 'orange', selectedColor: 'orange'});
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
  engine.getStateMachine().getCurrentState().dragNewLink.config.allowLooseLinks = false;
  debugger;
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
