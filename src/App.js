import './App.css';
import Stencil from './stencil';
import Canvas from './canvas';
import createEngine, {DiagramModel, RightAngleLinkFactory} from '@projectstorm/react-diagrams';
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
import RightAnglePortFactory from './Ports/RigthAnglePort/RightAnglePortFactory';

const nodeFactories = [
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
];

const linkFactories = [
  RightAngleLinkFactory
];

const portFactories = [
  RightAnglePortFactory
];

function App() {
  const engine = createEngine();
  for (const factory of nodeFactories) {
    engine.getNodeFactories().registerFactory(new factory());
  }
  for (const factory of linkFactories) {
    engine.getLinkFactories().registerFactory(new factory());
  }
  for (const factory of portFactories) {
    engine.getPortFactories().registerFactory(new factory());
  }
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
