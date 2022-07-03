import ElementNode from "../../Nodes/ElementNode";

const REGISTERS = {
"$zero": 0,
"$at": 1,
"$v0": 2,
"$v1": 3,
"$a0": 4,
"$a1": 5,
"$a2": 6,
"$a3": 7,
"$t0": 8,
"$t1": 9,
"$t2": 10,
"$t3": 11,
"$t4": 12,
"$t5": 13,
"$t6": 14,
"$t7": 15,
"$s0": 16,
"$s1": 17,
"$s2": 18,
"$s3": 19,
"$s4": 20,
"$s5": 21,
"$s6": 22,
"$s7": 23,
"$t8": 24,
"$t9": 25,
"$k0": 26,
"$k1": 27,
"$gp": 28,
"$sp": 29,
"$fp": 30,
"$ra": 31
}

const INSTRUCTIONS_INITIAL_ADDRESS = parseInt("0x00400000");

const twosComplement = (value, bitsNumber) => {
  const bitsString = value.toString(2);
  const bits = Array.from(bitsString);
  if(bits[0] !== '-') {
    return bitsString.padStart(bitsNumber, '0');
  } else {
    bits.shift();
    let flip = false;
    for(let i = bits.length - 1; i >= 0; i--) {
      if(flip) {
        bits[i] = bits[i] === '1' ? '0' : '1';
      } else {
        if(bits[i] === '1') {
          flip = true
        }
      }
    }
    return ('1' + bits.join("")).padStart(bitsNumber, '1');
  }
}

const DATA_INSTRUCTION_PORT = 'Dato/Instrucción';
const ADDRESSS_PORT = 'Dirección';
const DATA_TO_WRITE_PORT = 'Dato a escribir';
const READ_MEM_PORT = 'LeerMem';
const WRITE_MEM_PORT = 'EscrMem';

class MemoryBankModel extends ElementNode {
  constructor(name = "Memoria") {
    super({name, type: 'memoryBank'});
    this.memory = [];
    this.addOutPort(DATA_INSTRUCTION_PORT, true, 32);
    this.addInPort(ADDRESSS_PORT);
    this.addInPort(DATA_TO_WRITE_PORT);
    this.addInPort(READ_MEM_PORT);
    this.addInPort(WRITE_MEM_PORT);
    this.out = undefined;
  }

  loadProgram(program) {
    this.memory = [];
    const instructions = program.segments?.['.text']?.instructions;
    if(instructions?.length > 0) {
      let nextAddress = INSTRUCTIONS_INITIAL_ADDRESS;
      instructions.forEach((instruction, index) => {
        const instDef = this.instructions?.get(instruction.opcode);
        if(instDef) {
          const formatDef = this.formats.get(instDef.format);
          //Optimizar esto, solo calcularlo una vez, el resto hacer gets
          const bitSizes = new Map();
          formatDef.fields.forEach(field => {
            const size = (parseInt(field.bits.start) + 1) - parseInt(field.bits.end);
            bitSizes.set(field.name, size);
          });
          const parameters = [...instDef.parameters];
          const operands = [...instruction.operands];
          const result = {};
          while(parameters.length > 0) {
            const parameter = parameters.shift();
            if(parameter.type === 'Const') {
              result[parameter.field] = parameter.value;
            } else {
              const operand = operands.shift();
              if(parameter.type === 'Registry') {
                const size = bitSizes.get(parameter.field);
                result[parameter.field] = REGISTERS[operand.value].toString(2).padStart(size, '0');
              }
              if(parameter.type === 'Address') {
                const offsetSize = bitSizes.get(parameter.offset);
                const registrySize = bitSizes.get(parameter.registry);
                result[parameter.offset] = operand.offset.type === 'Number' ? twosComplement(operand.offset.value, offsetSize) : twosComplement(-operand.offset.value.value, offsetSize);
                result[parameter.registry] = REGISTERS[operand.base.value].toString(2).padStart(registrySize, 0);
              }
              if(parameter.type === 'Immediate') {
                const size = bitSizes.get(parameter.field);
                result[parameter.field] = operand.type === 'Number' ? twosComplement(operand.value, size) : twosComplement(-operand.value.value, size);
              }
              if(parameter.type === 'Label') {
                const size = bitSizes.get(parameter.field);
                const labelIndex = program.labels[operand.value].address;
                const bitAddress = (INSTRUCTIONS_INITIAL_ADDRESS + (labelIndex * 4)).toString(2)
                result[parameter.field] = bitAddress.substring(0, bitAddress.length - 2).padStart(size, '0');
              }
              if(parameter.type === 'AddressOffset') {
                const size = bitSizes.get(parameter.field);
                const labelIndex = program.labels[operand.value].address;
                const delta = labelIndex - (index + 1);
                result[parameter.field] = twosComplement(delta, size);
              }
            }
          }
          let binaryInst = '';
          formatDef.fields.forEach(field => {
            const size = (parseInt(field.bits.start) + 1) - parseInt(field.bits.end);
            binaryInst += result[field.name] ? result[field.name].padStart(size, '0') : ''.padStart(size, '0');
          });
          const bytes = binaryInst.match(/([0-1]{8})([0-1]{8})([0-1]{8})([0-1]{8})/);
          for(let i = 1; i < 5; i++) {
            const cellContent = bytes[i];
            this.memory[nextAddress] = cellContent;
            nextAddress += 1
          }
        }
      });
    } else {
      console.log("No instructions");
    }
  }

  loadInstructionsFormats({formats, instructions}) {
    this.formats = formats;
    this.instructions = instructions;
  }

  processState() {
    const writeSignal = this.getPort(WRITE_MEM_PORT).getSignal();
    const address = this.getPort(ADDRESSS_PORT).getSignal();
    if(writeSignal === '1') {
      this.colorLinks(ADDRESSS_PORT);
      const data = this.getPort(DATA_TO_WRITE_PORT).getSignal();
      this.colorLinks(DATA_TO_WRITE_PORT);
      const bytes = data.match(/([0-1]{8})([0-1]{8})([0-1]{8})([0-1]{8})/);
      const index = parseInt(address, 2);
      for(let i = 0; i < 4; i++) {
        this.memory[index + i] = bytes[i + 1];
      }
    } 
    const readSignal = this.getPort(READ_MEM_PORT).getSignal();
    if(readSignal === '1') {
      this.colorLinks(ADDRESSS_PORT);
      const index = parseInt(address, 2);
      let result = '';
      for(let i = 0; i < 4; i++) {
        let memory = this.memory[index + i] || "00000000";
        result = result + memory;
      }
      this.out = result;
      this.getPort(DATA_INSTRUCTION_PORT).putSignal(this.out);
    }
    this.stageProcessed = true;
  }

  getConfigForm(engine) {
    return <>
    <label>
      Out1: {this.out}
      <button onClick={() => {
        this.processState();
      }}>Next state</button>
    </label>
    {this.memory.map((data, index) => {
      return <div key={index}>
        {data}
      </div>
    })}
    </>
  }
}

export default MemoryBankModel;

