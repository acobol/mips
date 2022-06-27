const STATES = {
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
};

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

const SIGNALS = {
  [ESCR_PC_COND_PORT]: 1,
  [ESCR_PC_PORT]: 1,
  [IOD_PORT]: 1,
  [READ_MEM_PORT]: 1,
  [WRITE_MEM_PORT]: 1,
  [MEM_TO_REG_PORT]: 1,
  [IR_WRITE_PORT]: 1,
  [PC_SOURCE_PORT]: 2,
  [ALU_OP_PORT]: 2,
  [ALU_SOURCE_A_PORT]: 1,
  [ALU_SOURCE_B_PORT]: 2,
  [REG_WRITE_PORT]: 1,
  [REG_DEST_PORT]: 1,
}

export {STATES, SIGNALS};