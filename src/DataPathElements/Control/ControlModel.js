import { action, makeObservable, observable } from "mobx";
import ElementNode from "../../Nodes/ElementNode";
import {STATES} from './helpers/states.js';
import StateConfiguration from "./StatesConfiguration/StateConfiguration";

const INSTRUCTION_PORT = "Instrucción";
const ESCR_PC_COND_PORT = "EscrPC Cond";
const ESCR_PC_PORT = "EscrPC";
const IOD_PORT = "IoD";
const READ_MEM_PORT = "LeerMem";
const WRITE_MEM_PORT = "EscrMem";
const MEM_TO_REG_PORT = "MemaReg";
const IR_WRITE_PORT = "EscrIR";
const PC_SOURCE_PORT = "FuentePC";
const ALU_OP_PORT = "ALUOp";
const ALU_SOURCE_A_PORT = "SelALUA";
const ALU_SOURCE_B_PORT = "SelALUB";
const REG_WRITE_PORT = "EscrReg";
const REG_DEST_PORT = "RegDest";

class ControlModel extends ElementNode {
  constructor(name = "Control") {
    super({name, type: 'control', color: 'orange'});
    this.addInPort(INSTRUCTION_PORT);
    this.addOutPort(ESCR_PC_COND_PORT, true, 1);
    this.addOutPort(ESCR_PC_PORT, true, 1);
    this.addOutPort(IOD_PORT, true, 1);
    this.addOutPort(READ_MEM_PORT, true, 1);
    this.addOutPort(WRITE_MEM_PORT, true, 1);
    this.addOutPort(MEM_TO_REG_PORT, true, 1);
    this.addOutPort(IR_WRITE_PORT, true, 1);
    this.addOutPort(PC_SOURCE_PORT, true, 2);
    this.addOutPort(ALU_OP_PORT, true, 2);
    this.addOutPort(ALU_SOURCE_A_PORT, true, 1);
    this.addOutPort(ALU_SOURCE_B_PORT, true, 2);
    this.addOutPort(REG_WRITE_PORT, true, 1);
    this.addOutPort(REG_DEST_PORT, true, 1);
    this.state = '0000';
    this.states = STATES;
    makeObservable(this, {
      state: observable,
      processState: action
    })
  }

  processState() {
    const state = this.states[this.state];
    this.getOutPorts().forEach((port) => {
      port.putSignal(state.signals[port.options.name]);
    });
    const instruction = this.state === '0000' ? '000000' : this.getPort(INSTRUCTION_PORT).getSignal();
    this.state = state.nextState[instruction];
    this.stageProcessed = true;
  }

  getConfigForm(engine) {
    return <div>
      State: {this.state}
      <button onClick={() => {
        this.processState();
      }}>Next state</button>
      <StateConfiguration></StateConfiguration>
    </div>
  }
}

export default ControlModel;
