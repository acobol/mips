import { action, makeObservable, observable } from "mobx";
import ElementNode from "../../Nodes/ElementNode";

const states = {
  '0000': {
    signals: {
      'EscrPC': '1',
      'EscrPC Cond': '0',
      'IoD': '0',
      'LeerMem': '1',
      'EscrMem': '0',
      'EscrIR': '1',
      'MemaReg': 'X',
      'FuentePC': '00',
      'ALUOp': '00',
      'SelALUB': '01',
      'SelALUA': '0',
      'EscrReg': '0',
      'RegDest': 'X'
    },
    nextState: {
      '000000': '0001',
      '000010': '0001',
      '000100': '0001',
      '100011': '0001',
      '101011': '0001',
    }
  },
  '0001': {
    signals: {
      'EscrPC': '0',
      'EscrPC Cond': '0',
      'IoD': 'X',
      'LeerMem': '0',
      'EscrMem': '0',
      'EscrIR': '0',
      'MemaReg': 'X',
      'FuentePC': 'XX',
      'ALUOp': '00',
      'SelALUB': '11',
      'SelALUA': '0',
      'EscrReg': '0',
      'RegDest': 'X'
    },
    nextState: {
      '000000': '0110',
      '000010': '1001',
      '000100': '1000',
      '100011': '0010',
      '101011': '0010',
    }
  },
  '0010': {
    signals: {
      'EscrPC': '0',
      'EscrPC Cond': '0',
      'IoD': 'X',
      'LeerMem': '0',
      'EscrMem': '0',
      'EscrIR': '0',
      'MemaReg': 'X',
      'FuentePC': 'XX',
      'ALUOp': '00',
      'SelALUB': '10',
      'SelALUA': '1',
      'EscrReg': '0',
      'RegDest': 'X'
    },
    nextState: {
      '000000': 'XXXX',
      '000010': 'XXXX',
      '000100': 'XXXX',
      '100011': '0011',
      '101011': '0101',
    },
  },
  '0011': {
    signals: {
      'EscrPC': '0',
      'EscrPC Cond': '0',
      'IoD': '1',
      'LeerMem': '1',
      'EscrMem': '0',
      'EscrIR': '0',
      'MemaReg': 'X',
      'FuentePC': 'XX',
      'ALUOp': 'XX',
      'SelALUB': 'XX',
      'SelALUA': 'X',
      'EscrReg': '0',
      'RegDest': 'X'
    },
    nextState: {
      '000000': 'XXXX',
      '000010': 'XXXX',
      '000100': 'XXXX',
      '100011': '0100',
      '101011': 'XXXX',
    }
  },
  '0100': {
    signals: {
      'EscrPC': '0',
      'EscrPC Cond': '0',
      'IoD': 'X',
      'LeerMem': '0',
      'EscrMem': '0',
      'EscrIR': '0',
      'MemaReg': '1',
      'FuentePC': 'XX',
      'ALUOp': 'XX',
      'SelALUB': 'XX',
      'SelALUA': 'X',
      'EscrReg': '1',
      'RegDest': '0'
    },
    nextState: {
      '000000': 'XXXX',
      '000010': 'XXXX',
      '000100': 'XXXX',
      '100011': '0000',
      '101011': 'XXXX'
    }
  },
  '0101': {
    signals: {
      'EscrPC': '0',
      'EscrPC Cond': '0',
      'IoD': '1',
      'LeerMem': '0',
      'EscrMem': '1',
      'EscrIR': '0',
      'MemaReg': 'X',
      'FuentePC': 'XX',
      'ALUOp': 'XX',
      'SelALUB': 'XX',
      'SelALUA': 'X',
      'EscrReg': '0',
      'RegDest': 'X'
    },
    nextState: {
      '000000': 'XXXX',
      '000010': 'XXXX',
      '000100': 'XXXX',
      '100011': 'XXXX',
      '101011': '0000'
    }
  },
  '0110': {
    signals: {
      'EscrPC': '0',
      'EscrPC Cond': '0',
      'IoD': 'X',
      'LeerMem': '0',
      'EscrMem': '0',
      'EscrIR': '0',
      'MemaReg': 'X',
      'FuentePC': 'XX',
      'ALUOp': '10',
      'SelALUB': '00',
      'SelALUA': '1',
      'EscrReg': '0',
      'RegDest': 'X'
    },
    nextState: {
      '000000': '0111',
      '000010': 'XXXX',
      '000100': 'XXXX',
      '100011': 'XXXX',
      '101011': 'XXXX'
    }
  },
  '0111': {
    signals: {
      'EscrPC': '0',
      'EscrPC Cond': '0',
      'IoD': 'X',
      'LeerMem': '0',
      'EscrMem': '0',
      'EscrIR': '0',
      'MemaReg': '0',
      'FuentePC': 'XX',
      'ALUOp': 'XX',
      'SelALUB': 'XX',
      'SelALUA': 'X',
      'EscrReg': '1',
      'RegDest': '1'
    },
    nextState: {
      '000000': '0000',
      '000010': 'XXXX',
      '000100': 'XXXX',
      '100011': 'XXXX',
      '101011': 'XXXX'
    }
  },
  '1000': {
    signals: {
      'EscrPC': '0',
      'EscrPC Cond': '1',
      'IoD': 'X',
      'LeerMem': '0',
      'EscrMem': '0',
      'EscrIR': '0',
      'MemaReg': 'X',
      'FuentePC': '01',
      'ALUOp': '01',
      'SelALUB': '00',
      'SelALUA': '1',
      'EscrReg': '0',
      'RegDest': 'X'
    },
    nextState: {
      '000000': 'XXXX',
      '000010': 'XXXX',
      '000100': '0000',
      '100011': 'XXXX',
      '101011': 'XXXX'
    }
  },
  '1001': {
    signals: {
      'EscrPC': '1',
      'EscrPC Cond': '0',
      'IoD': 'X',
      'LeerMem': '0',
      'EscrMem': '0',
      'EscrIR': '0',
      'MemaReg': 'X',
      'FuentePC': '10',
      'ALUOp': 'XX',
      'SelALUB': 'XX',
      'SelALUA': 'X',
      'EscrReg': '0',
      'RegDest': 'X'
    },
    nextState: {
      '000000': 'XXXX',
      '000010': '0000',
      '000100': 'XXXX',
      '100011': 'XXXX',
      '101011': 'XXXX'
    }
  },
}

class ControlModel extends ElementNode {
  constructor(name = "Control") {
    super({name, type: 'control', color: 'orange'});
    this.addInPort('Instrucción');
    this.addOutPort('EscrPC Cond', true, 1);
    this.addOutPort('EscrPC', true, 1);
    this.addOutPort('IoD', true, 1);
    this.addOutPort('LeerMem', true, 1);
    this.addOutPort('EscrMem', true, 1);
    this.addOutPort('MemaReg', true, 1);
    this.addOutPort('EscrIR', true, 1);
    this.addOutPort('FuentePC', true, 2);
    this.addOutPort('ALUOp', true, 2);
    this.addOutPort('SelALUB', true, 2);
    this.addOutPort('SelALUA', true, 1);
    this.addOutPort('EscrReg', true, 1);
    this.addOutPort('RegDest', true, 1);
    this.state = '0000';
    makeObservable(this, {
      state: observable,
      processState: action
    })
  }

  processState() {
    const state = states[this.state];
    const instruction = this.state === '0000' ? '000000' : this.getInPorts()[0].getSignal();
    this.getOutPorts().forEach((port) => {
      port.putSignal(state.signals[port.options.name]);
    });
    this.state = state.nextState[instruction];
  }

  getConfigForm(engine) {
    return <div>
      State: {this.state}
      <button onClick={() => {
        this.processState();
      }}>Next state</button>
    </div>
  }
}

export default ControlModel;
