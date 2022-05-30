import './App.css';
import Stencil from './stencil';
import Canvas from './canvas';
import createEngine, {DiagramModel} from '@projectstorm/react-diagrams';
import MultiplexorFactory from './DataPathElements/Multiplexor/MultiplexorFactory';
import ALUFactory from './DataPathElements/ALU/ALUFactory';
import RegistryBankFactory from './DataPathElements/RegistryBank/RegistryBankFactory';
import MemoryBankFactory from './DataPathElements/MemoryBank/MemoryBankFactory';
import SignExtensorFactory from './DataPathElements/SignExtend/SignExtendFactory';
import InstructionsRegistryFactory from './DataPathElements/InstructionsRegistry/InstructionsRegistryFactory';
import PCFactory from './DataPathElements/PC/PCFactory';
import AddFactory from './DataPathElements/Add/AddFactory';
import ConstFactory from './DataPathElements/Const/ConstFactory';
import ShiftLeftFactory from './DataPathElements/ShiftLeft/ShiftLeftFactory';
import ALUControlFactory from './DataPathElements/ALUControl/ALUControlFactory';
import AndFactory from './DataPathElements/And/AndFactory';
import ControlFactory from './DataPathElements/Control/ControlFactory';
import ConcatenatorFactory from './DataPathElements/Concatenator/ConcatenatorFactory';
//import datapath from './datapath.json';
import OutPortFactory from './Ports/OutPort/OutPortFactory';
import InPortFactory from './Ports/InPort/InPortFactory';
import BitsLinkFactory from './Links/BitsLinkFactory';
import ConfigPanel from './ConfigPanel';
import { DeleteItemsAction } from '@projectstorm/react-canvas-core/dist/actions/DeleteItemsAction';
import OrFactory from './DataPathElements/Or/OrFactory';
import RegistryFactory from './DataPathElements/Registry/RegistryFactory';
import ControlModel from './DataPathElements/Control/ControlModel';
import PCModel from './DataPathElements/PC/PCModel';
import MultiplexorModel from './DataPathElements/Multiplexor/MultiplexorModel';
import { FormatForms } from './Assembly/FormatsForm';
import { AssemblyConstructor } from './Assembly/AssemblyConstructor';

const nodeFactories = [
  MultiplexorFactory,
  ALUFactory,
  RegistryBankFactory,
  MemoryBankFactory,
  SignExtensorFactory,
  InstructionsRegistryFactory,
  PCFactory,
  AddFactory,
  ConstFactory,
  ShiftLeftFactory,
  ALUControlFactory,
  AndFactory,
  ControlFactory,
  ConcatenatorFactory,
  OrFactory,
  RegistryFactory
];

const linkFactories = [
  BitsLinkFactory
];

const portFactories = [
  OutPortFactory,
  InPortFactory
];

function App() {
/*   const engine = createEngine({registerDefaultDeleteItemsAction: false});
  engine.getActionEventBus().registerAction(new DeleteItemsAction({keyCodes: [46]}))
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
  //diagram.deserializeModel(datapath, engine);
  engine.setModel(diagram);
  return (
    <div className="App">
      <div id='main'>
        <Stencil/>
        <Canvas engine={engine}/>
        <ConfigPanel diagram={diagram} engine={engine}/>
      </div>
    </div>
  ); */
  return <AssemblyConstructor></AssemblyConstructor>
}

export default App;
